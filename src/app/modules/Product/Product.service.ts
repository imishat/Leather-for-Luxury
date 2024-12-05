import mongoose, { SortOrder } from "mongoose";
import { IProduct, IProductFilters } from "./Product.interface";
import { Product } from "./Product.model";
import { IPaginationOptions } from "../../interface/pagination";
import { IGenericResponse } from "../../interface/common";
import { ProductSearchableFields } from "./Product.constants";
import { paginationHelpers } from "../../helpers/paginationHelper";

const createProduct = async (payload: IProduct): Promise<IProduct | null> => {
  const result = await Product.create(payload);

  // if (!createdUser) {
  //   throw new ApiError(400, "Failed to create");
  // }
  return result;
};

const getSingleBySlug = async (slug: string): Promise<IProduct | null> => {
  const result = await Product.findOne({ slug }).populate("categoryId"); // Query by the 'slug' field
  return result;
};
const getSingleById = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

export const updateProductId = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  // Find and update the parent category
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true, // Return the updated document
    runValidators: true, // Enforce schema validations
  });

  return result;
};

const getAll = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: ProductSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: "i",
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Product.find(whereConditions)
    .populate("academicFaculty")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const ProductService = {
  createProduct,
  getSingleBySlug,
  getSingleById,
  updateProductId,
  getAll,
  deleteProductFromDB,
};
