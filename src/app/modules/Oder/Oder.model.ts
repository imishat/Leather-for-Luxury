import mongoose, { Schema } from "mongoose";
import { IOrder, OderModel } from "./Oder.interface";

const orderSchema = new Schema<IOrder>(
  {
    orderItems: [
      {
        quantity: { type: Number, require: [true, "quantity is required"] },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          require: [true, "Product is required"],
        },
        color: {
          type: String,
          require: true,
        },
      },
    ],
    name: {
      type: String,
      require: [true, "shippingAddress1 is required"],
    },
    shippingAddress: { type: String },
    city: { type: String, require: [true, "city is required"] },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
    totalPrice: { type: Number },
    trackCode: { type: String },

    dateOrdered: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder, OderModel>("Order", orderSchema);
