import mongoose, { Schema } from "mongoose";
import { IUSer, USerModel } from "./Users.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import slugify from "slugify";

// Define the Mongoose schema
const UserSchema = new Schema<IUSer>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, require: false },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

UserSchema.pre<IUSer>("save", async function (next) {
  // hashing user password

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

// Create the model using the schema
export const User = mongoose.model<IUSer, USerModel>("User", UserSchema);
