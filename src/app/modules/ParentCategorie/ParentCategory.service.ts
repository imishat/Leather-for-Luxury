import { assert } from "console";
import { IParentCategory } from "./ParentCategorie.interface";
import { ParentCategory } from "./ParentCategory.model";
import mongoose from "mongoose";

const createParentCategory = async (
  payload: IParentCategory
): Promise<IParentCategory | null> => {
  const result = await ParentCategory.create(payload);

  // if (!createdUser) {
  //   throw new ApiError(400, "Failed to create");
  // }
  return result;
};

const getSingleBySlug = async (
  slug: string
): Promise<IParentCategory | null> => {
  const result = await ParentCategory.findOne({ slug }); // Query by the 'slug' field
  return result;
};
const getSingleById = async (id: string) => {
  const result = await ParentCategory.findById(id);
  return result;
};

export const updateParentCategoryId = async (
  id: string,
  payload: Partial<IParentCategory>
): Promise<IParentCategory | null> => {
  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  // Find and update the parent category
  const result = await ParentCategory.findByIdAndUpdate(id, payload, {
    new: true, // Return the updated document
    runValidators: true, // Enforce schema validations
  });

  return result;
};

const getAll = async () => {
  const result = await ParentCategory.find().sort({ createdAt: -1 });
  return result;
};

export const ParentCategoryService = {
  createParentCategory,
  getSingleBySlug,
  getSingleById,
  updateParentCategoryId,
  getAll,
};
