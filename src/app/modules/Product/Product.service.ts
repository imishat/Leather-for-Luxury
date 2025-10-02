import mongoose, { SortOrder } from "mongoose";
import { IProduct, IProductFilters } from "./Product.interface";
import { Product } from "./Product.model";
import { IPaginationOptions } from "../../interface/pagination";
import { IGenericResponse } from "../../interface/common";
import { ProductSearchableFields } from "./Product.constants";
import { paginationHelpers } from "../../helpers/paginationHelper";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const createProduct = async (payload: IProduct): Promise<IProduct | null> => {
  const result = await Product.create(payload);

  return result;
};

const getSingleBySlug = async (slug: string): Promise<IProduct | null> => {
  const result = await Product.findOne({ slug }).populate("categoryId"); // Query by the 'slug' field
  return result;
};
const getSingleById = async (id: string) => {
  const result = await Product.findById(id);
  // console.log(result);
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
  // console.log(filters, "flitter");
  // Extract searchTerm to implement search query
  const {
    category,
    searchTerm,
    colorName,
    startPrice,
    endPrice,
    inStock,
    onSale,
    ...filtersData
  } = filters;

  const andConditions = [];

  // Convert inStock & onSale to boolean

  const isInStock = String(inStock) === "true";
  const isOnSale = String(onSale) === "true";
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: ProductSearchableFields.map((field) => {
        if (field === "categoryId" || "parentCategoryId") {
          return {
            $expr: {
              $regexMatch: {
                input: { $toString: `$${field}` },
                regex: searchTerm,
                options: "i",
              },
            },
          };
        }
        return {
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        };
      }),
    });
  }
  // Filter by multiple colorNames
  if (colorName) {
    let colorArray: string[] = [];

    if (typeof colorName === "string") {
      colorArray = colorName.split(",").map((color) => color.trim());
    } else if (Array.isArray(colorName)) {
      colorArray = colorName;
    }

    andConditions.push({
      "color.colorName": {
        $in: colorArray.map((color) => new RegExp(`^${color}$`, "i")),
      },
    });
  }
  // Filters needs $and to fullfil all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Price range filter
  if (startPrice && endPrice) {
    andConditions.push({
      discountedPrice: {
        $gte: startPrice, // Greater than or equal to startPrice
        $lte: endPrice, // Less than or equal to endPrice
      },
    });
  }
  // Dynamically filter products if either inStock or onSale is true
  if (isInStock || isOnSale) {
    const stockSaleFilter: any[] = [];
    if (isInStock) stockSaleFilter.push({ inStock: true });
    if (isOnSale) stockSaleFilter.push({ onSale: true });
    andConditions.push({ $or: stockSaleFilter });
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

    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select({
      name: 1,
      imageDefault: 1,
      imageHover: 1,
      slug: 1,
      originalPrice: 1,
      discountedPrice: 1,
      inStock: 1,
      onSale: 1,
    });

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
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "product not found");
  }
  const result = await Product.findByIdAndDelete({ _id: id });

  return result;
};

const getAllUniqueColors = async () => {
  const uniqueColors = await Product.aggregate([
    { $unwind: "$color" },
    {
      $group: {
        _id: "$color.colorName",
        firstHex: { $first: "$color.hex" },
        productCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return uniqueColors.map((color) => ({
    colorName: color._id,
    Hex: color.firstHex,
    productCount: color.productCount,
  }));
};

export const ProductService = {
  createProduct,
  getSingleBySlug,
  getSingleById,
  updateProductId,
  getAll,
  deleteProductFromDB,
  getAllUniqueColors,
};
