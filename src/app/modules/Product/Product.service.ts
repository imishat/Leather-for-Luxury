import mongoose from "mongoose";
import { IProduct } from "./Product.interface";
import { Product } from "./Product.model";

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

const getAll = async () => {
  const result = await Product.find().sort({ createdAt: -1 });
  return result;
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
