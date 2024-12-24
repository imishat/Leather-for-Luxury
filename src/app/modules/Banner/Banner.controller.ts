import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse ";
import { BannerService } from "./Banner.service";

const createVideo = catchAsync(async (req: Request, res: Response) => {
  const url = req.body;

  const result = await BannerService.createVideoBanner(url);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "VideoBanner is created successfully",
    data: result,
  });
});
const createTopBanner = catchAsync(async (req: Request, res: Response) => {
  const Banner = req.body;

  const result = await BannerService.createTopBanner(Banner);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TopBanner is created successfully",
    data: result,
  });
});

const getSingleVideoBannerById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BannerService.getSingleVideoBannerById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "VideoBanner  is retrieved successfully",
      data: result,
    });
  }
);

const getSingleTopBannerById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BannerService.getSingleTopBannerById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "TopBanner  is retrieved successfully",
      data: result,
    });
  }
);

export const updateVideoBannerById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body

    const updatedVideoBanner = await BannerService.updateVideoBannerById(
      id,
      updateData
    );

    // Handle case where the category is not found
    if (!updatedVideoBanner) {
      throw new ApiError(httpStatus.NOT_FOUND, " Video not found");
    }

    // Send a successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " VideoBanner updated successfully",
      data: updatedVideoBanner,
    });
  }
);

export const updateTopBannerById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body

    const updatedTopBanner = await BannerService.updateTopBannerById(
      id,
      updateData
    );

    // Handle case where the category is not found
    if (!updatedTopBanner) {
      throw new ApiError(httpStatus.NOT_FOUND, " Video not found");
    }

    // Send a successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " TopBanner updated successfully",
      data: updatedTopBanner,
    });
  }
);

export const BannerController = {
  createVideo,
  createTopBanner,
  getSingleVideoBannerById,
  getSingleTopBannerById,
  updateVideoBannerById,
  updateTopBannerById,
};
