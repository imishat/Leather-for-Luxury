import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { WishlistService } from "./Wishlist.service";
import sendResponse from "../../shared/sendResponse ";
import httpStatus from "http-status";

const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await WishlistService.createWishlist(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Wishlist Created successfully",
    data: result,
  });
});
const getSingleUserWishlist = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await WishlistService.getSingleUserWishlist(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Wishlist retrieved  successfully",
      data: result,
    });
  }
);

const deleteWishlistFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WishlistService.deleteWishlistFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Wishlist is deleted successfully",
    data: result,
  });
});

export const WishlistController = {
  createWishlist,
  getSingleUserWishlist,
  deleteWishlistFromDB,
};
