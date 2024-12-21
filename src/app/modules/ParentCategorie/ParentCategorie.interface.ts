import { Model } from "mongoose";

export type IParentCategory = {
  id?: string;

  name: string;
  image: string;
  slug?: string;
};

export type ParentCategoryModel = Model<
  IParentCategory,
  Record<string, unknown>
>;
