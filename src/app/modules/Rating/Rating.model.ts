import mongoose, { Schema } from "mongoose";
import { IRating, RatingModel } from "./Rating.interface";

const RatingSchema = new Schema<IRating>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userEmail: { type: String, required: true }, // ID of the user submitting the review
  userName: { type: String, required: true }, // ID of the user submitting the review
  reviewText: { type: String, required: true }, // Text of the review
  ratingStar: { type: Number, required: true },
});

export const Rating = mongoose.model<IRating, RatingModel>(
  "Rating",
  RatingSchema
);
