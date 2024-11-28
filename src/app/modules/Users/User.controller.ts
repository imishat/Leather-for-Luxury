import httpStatus from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse ";
import { Request, Response } from "express";
import { UserService } from "./Users.service";
import ApiError from "../../errors/ApiError";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.createUSer(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created successfully",
    data: result,
  });
});

export const updateUSerProfile = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body

    // Perform the update operation
    const updatedCategory = await UserService.updateUSerProfile(id, updateData);

    // Handle case where the category is not found
    if (!updatedCategory) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    // Send a successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully",
      data: updatedCategory,
    });
  }
);

export const USerController = {
  createUser,
  updateUSerProfile,
};
