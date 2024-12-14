import httpStatus from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse ";
import { RatingService } from "./Rating.service";
import { Request, Response } from "express";
const createRating = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await RatingService.createRating(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "rating Created successfully",
    data: result,
  });
});

const getRatingByProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await RatingService.getRatingByProduct(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Product Rating is retrieved successfully",
    data: result,
  });
});

export const RatingController = {
  createRating,
  getRatingByProduct,
};
