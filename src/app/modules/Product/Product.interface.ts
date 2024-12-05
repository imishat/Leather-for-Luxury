import mongoose, { Model, Types } from "mongoose";

type Color = {
  colorName: string;
  hex: string;
  availableQuantity: number;
};
type AdditionalDetails = {
  color: string;
  hex: string;
  quantity: number;
  images: string[];
};
type Size = {
  [key: string]: string; // For dynamic size keys like "XL", "L", etc.
};

type ProductDetails = {
  additionalProductDetails: Record<string, any>; // For key-value pairs
  size: Size;
  warranty: string;
};
export type IProduct = {
  barcode: string;
  slug?: string;
  name: string;
  color: Color;
  originalPrice: number;
  discountedPrice: number;
  inStock: boolean;
  onSale: boolean;
  categoryId: mongoose.Types.ObjectId;
  imageDefault: string;
  imageHover: string;
  additionalDetails: AdditionalDetails;
  productDetails: ProductDetails;
};

export type IProductFilters = {
  searchTerm?: string;
  categoryId?: Types.ObjectId;
};
export type ProductModel = Model<IProduct, Record<string, unknown>>;
