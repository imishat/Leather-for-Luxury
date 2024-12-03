import httpStatus from "http-status";
import { User } from "../Users/Users.model";
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  TLoginUser,
} from "./Auth.interface";
import ApiError from "../../errors/ApiError";
import { createToken, verifyToken } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: TLoginUser): Promise<ILoginUserResponse> => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted

  // const isDeleted = user?.isDeleted;

  // if (isDeleted) {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'This user is deleted !');
  // }

  // checking if the user is blocked

  // const userStatus = user?.status;

  // if (userStatus === 'blocked') {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  // }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new ApiError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: "user",
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_access_secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { email } = verifiedToken;

  const isUserExist = await User.isUserExistsByEmail(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = createToken(
    {
      email: isUserExist.id,
      role: "user",
    },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
  // changePassword,
  // forgotPass,
  // resetPassword
};
