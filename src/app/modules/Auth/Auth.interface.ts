import { IUSer } from "../Users/Users.interface";

export type TLoginUser = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  user: IUSer;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
