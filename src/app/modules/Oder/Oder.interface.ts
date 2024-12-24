import mongoose, { Model, Types } from "mongoose";

export type IOrder = {
  orderItems: {
    quantity: number;
    product: mongoose.Types.ObjectId;
  }[];
  shippingAddress1: string;
  shippingAddress2?: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status?: string;
  totalPrice?: number;
  user?: mongoose.Types.ObjectId; //
  dateOrdered?: Date;
};

export type IOrderFilters = {
  searchTerm?: string;
  user?: Types.ObjectId;
  status?: string;
  dateOrdered?: string;
};
export type OderModel = Model<IOrder, Record<string, unknown>>;
