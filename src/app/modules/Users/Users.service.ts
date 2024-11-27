import { IUSer } from "./Users.interface";
import { User } from "./Users.model";

const createUSer = async (payload: IUSer): Promise<IUSer | null> => {
  const result = await User.create(payload);

  return result;
};

export const UserService = {
  createUSer,
};
