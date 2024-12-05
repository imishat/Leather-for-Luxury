import mongoose from "mongoose";
import { z } from "zod";

export const RatingZODSchema = z.object({
  productId: z
    .string({
      required_error: "ProductId is required",
    })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid parent category ID",
    }), // Mongoose ObjectId validator
  userId: z
    .string({
      required_error: "UserId is required",
    })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid parent category ID",
    }), // Ensures it's a string
  reviewText: z.string({
    required_error: "give some text review",
  }), // Ensures it's a string
  ratingStar: z.number().int().min(1).max(5), // Ensures it's an integer between 1 and 5
});
