import { Model } from "mongoose";

export type IUSer = {
  id: String;
  name: string;
  email: string;
  location: string;
  password: string;
  slug?: string; // Optional slug field

  // Mongoose-specific methods
  isModified(path: string): boolean;
};

export type USerModel = Model<IUSer, Record<string, unknown>>;
