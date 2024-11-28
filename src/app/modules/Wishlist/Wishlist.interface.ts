import mongoose, { Model } from "mongoose";

export type IWishlist = {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
};

export type WishlistModel = Model<IWishlist, Record<string, unknown>>;
