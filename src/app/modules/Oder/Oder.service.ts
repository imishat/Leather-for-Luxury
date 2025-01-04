import mongoose, { SortOrder } from "mongoose";
import { IOrder, IOrderFilters } from "./Oder.interface";
import { Order } from "./Oder.model";
import { IProductFilters } from "../Product/Product.interface";
import { IGenericResponse } from "../../interface/common";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { OrderSearchableFields } from "./Oder.constants";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { sendOrderEmail, sendVerificationEmail } from "../../middlewares/email";
import { Product } from "../Product/Product.model";

const createOder = async (payload: IOrder): Promise<IOrder | null> => {
  // Fetch the products by their IDs
  const productIds = payload.orderItems.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });
  console.log(products, "product");
  // Ensure all products are found
  if (products.length !== productIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "One or more products not found");
  }

  // Structure the orderItems with product details
  const structuredOrderItems = payload.orderItems.map((item) => {
    const product = products.find((p) => p._id.equals(item.product));
    if (!product) {
      throw new Error("Product not found");
    }
    return {
      ...item,
      product: product._id, // or any additional details you want to add
    };
  });

  // Create the order
  const result = await Order.create({
    ...payload,
    orderItems: structuredOrderItems,
  });

  // Send the order email
  await sendOrderEmail(payload.email, products, result);

  return result;
};

const getSingleById = async (id: string) => {
  const result = await Order.findById(id).populate({
    path: "orderItems",
    populate: {
      path: "product",
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  return result;
};
const getOderByUser = async (email: string) => {
  const result = await Order.find({ email: email }).populate({
    path: "orderItems",
    populate: {
      path: "product",
      select: `
      barcode
      slug
      name
      originalPrice
      discountedPrice
      inStock
      onSale
      imageDefault
      imageHover
    `.trim(),
    },
  });
  return result;
};

export const updateOrderId = async (
  id: string,
  payload: Partial<IOrder>
): Promise<IOrder | null> => {
  const { trackCode } = payload;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  // Find and update the parent category
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true, // Return the updated document
    runValidators: true, // Enforce schema validations
  });

  if (result && trackCode) {
    const idData = result.email;
    await sendVerificationEmail(idData, trackCode);
    // Ensure it's a string
  }

  return result;
};

const getAll = async (
  filters: IOrderFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrder[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: OrderSearchableFields.map((field) => {
        if (field === "Product" || "User") {
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

  const result = await Order.find(whereConditions)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const deleteOrderFromDB = async (id: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  const result = await Order.findByIdAndDelete({ _id: id });

  return result;
};

export const OrderService = {
  createOder,
  getOderByUser,
  getSingleById,
  updateOrderId,
  getAll,
  deleteOrderFromDB,
};
