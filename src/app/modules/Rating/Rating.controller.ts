import httpStatus from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse ";
import { RatingService } from "./Rating.service";

const createRating = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await RatingService.createRating(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "rating Created successfully",
    data: result,
  });
});

export const RatingController = {
  createRating,
};
