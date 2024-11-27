import httpStatus from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse ";
import { Request, Response } from "express";
import { UserService } from "./Users.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.createUSer(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "rating Created successfully",
    data: result,
  });
});

export const USerController = {
  createUser,
};
