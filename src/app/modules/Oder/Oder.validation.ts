import mongoose from "mongoose";
import { z } from "zod";

export const OrderZodSchema = z.object({
  body: z.object({
    orderItems: z.array(
      z.object({
        quantity: z.number().min(1, "Quantity must be at least 1"),
        product: z
          .string()
          .refine((id) => mongoose.Types.ObjectId.isValid(id), {
            message: "Invalid Product ID",
          }),
      })
    ),
    shippingAddress1: z.string().min(1, "Shipping address is required"),
    shippingAddress2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
    phone: z.string().min(1, "Phone number is required"),
    status: z.string().default("Pending"),
    totalPrice: z.number().optional(),
    user: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid parent category ID",
    }),

    dateOrdered: z.date().optional(),
  }),
});
export const UpdateOrderZodSchema = z.object({
  body: z
    .object({
      orderItems: z
        .array(
          z.object({
            quantity: z.number().optional(),
            product: z.string().optional(),
          })
        )
        .optional(),
      shippingAddress1: z.string().optional(),
      shippingAddress2: z.string().optional(),
      city: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().optional(),
      phone: z.string().optional(),
      status: z.string().optional(),
      totalPrice: z.number().optional(),
      user: z
        .string()
        .refine((id) => mongoose.Types.ObjectId.isValid(id), {
          message: "Invalid parent category ID",
        })
        .optional(),

      dateOrdered: z.date().optional(),
    })
    .optional(),
});

export const OrderValidation = {
  OrderZodSchema,
  UpdateOrderZodSchema,
};
