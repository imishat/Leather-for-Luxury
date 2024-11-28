import mongoose, { Schema } from "mongoose";
import { IWishlist, WishlistModel } from "./Wishlist.interface";

const WishlistSchema = new Schema<IWishlist>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to set the `id` field
WishlistSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  next();
});

WishlistSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

// Transform output to include `id` and remove `_id` and `__v`
WishlistSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

// Create and export the model
export const Wishlist = mongoose.model<IWishlist, WishlistModel>(
  "Wishlist",
  WishlistSchema
);
