import { Model } from "mongoose";

export type IParentCategory = {
  name: string;
  image: string;
  slug?: string;
};

export type ParentCategoryModel = Model<
  IParentCategory,
  Record<string, unknown>
>;
