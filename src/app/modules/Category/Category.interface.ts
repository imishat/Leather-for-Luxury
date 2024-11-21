import mongoose, { Model } from "mongoose";

export type ICategory = {
  id: string;
  name: string; // Required: Name of the category
  description: string; // Optional: Description of the category
  parentCategoryId?: mongoose.Types.ObjectId; // Optional: ID of the parent category (foreign key)
  image: string;
  slug?: string;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
