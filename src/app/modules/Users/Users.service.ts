import mongoose from "mongoose";
import { IUSer } from "./Users.interface";
import { User } from "./Users.model";

const createUSer = async (payload: IUSer): Promise<IUSer | null> => {
  const result = await User.create(payload);

  return result;
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
};
