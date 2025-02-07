import mongoose from "mongoose";
import { IUSer } from "./Users.interface";
import { User } from "./Users.model";
import { sendVerificationUser } from "../../middlewares/email";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const createUSer = async (payload: IUSer): Promise<IUSer | null> => {
  if (!payload.location) {
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    payload = { ...payload, verificationToken };
  }

  const result = await User.create(payload);

  // If location exists, send a verification email
  if (!payload.location && result?.email && payload.verificationToken) {
    await sendVerificationUser(result.email, payload.verificationToken);
  }

  return result;
};

const verifyEmailService = async (code: string): Promise<IUSer | null> => {
  console.log("Received code:", code);
  // Find the user with a matching token that hasn't expired
  const user = await User.findOne({
    verificationToken: code,
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Update the user's verification status and clear token fields
  user.isVerified = true;
  user.verificationToken = undefined;

  await user.save();

  return user;
};

export const updateUSerProfile = async (
  id: string,
  payload: Partial<IUSer>
): Promise<IUSer | null> => {
  // Validate the ID format
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   throw new Error("Invalid ID format");
  // }

  // Find and update the parent category
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true, // Return the updated document
    runValidators: true, // Enforce schema validations
  });

  return result;
};

export const UserService = {
  createUSer,
  updateUSerProfile,
  verifyEmailService,
};
