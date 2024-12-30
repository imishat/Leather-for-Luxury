import mongoose, { Model, Types } from "mongoose";

export type IOrder = {
  orderItems: {
    quantity: number;
    product: mongoose.Types.ObjectId;
    color: string;
  }[];
  name: string;
  shippingAddress?: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  status?: string;
  totalPrice?: number;
  trackCode?: string;
  dateOrdered?: Date;
};

export type IOrderFilters = {
  searchTerm?: string;
  user?: Types.ObjectId;
  status?: string;
  dateOrdered?: string;
};
export type OderModel = Model<IOrder, Record<string, unknown>>;
