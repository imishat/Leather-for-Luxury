import mongoose, { Model } from "mongoose";

export type IRating = {
  productId: mongoose.Types.ObjectId;
  userId: string; // ID of the user submitting the review
  reviewText: string; // Text of the review
  ratingStar: number;
};

export type RatingModel = Model<IRating, Record<string, unknown>>;
