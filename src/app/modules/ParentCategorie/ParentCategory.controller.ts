import { catchAsync } from "../../shared/catchAsync";

import { IParentCategory } from "./ParentCategorie.interface";
import httpStatus from "http-status";
import { ParentCategoryService } from "./ParentCategory.service";
import { NextFunction, RequestHandler } from "express-serve-static-core";
import sendResponse from "../../shared/sendResponse ";
import { Response } from "express";
import ApiError from "../../errors/ApiError";

const createParentCategory = catchAsync(
  async (req: { body: any }, res: Response<any, Record<string, any>>) => {
    const parentCategory = req.body;

    const result = await ParentCategoryService.createParentCategory(
      parentCategory
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "parent-category is created successfully",
      data: result,
    });
  }
);

const getSingleParentCategoryBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params; // Destructure 'slug' from req.params

  // Log slug for debugging
  console.log("Slug:", slug);

  // Validate that slug exists
  if (!slug) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Slug parameter is required");
  }

  // Fetch the category by slug
  const result = await ParentCategoryService.getSingleBySlug(slug);

  // Handle the case where the category does not exist
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Parent category not found");
  }

  // Send the successful response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Parent category retrieved successfully",
    data: result,
  });
});
const getSingleParentCategoryById = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;

  const result = await ParentCategoryService.getSingleById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "parent-category is retrieved successfully",
    data: result,
  });
});

export const updateParentCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body

    // Perform the update operation
    const updatedCategory = await ParentCategoryService.updateParentCategoryId(
      id,
      updateData
    );

    // Handle case where the category is not found
    if (!updatedCategory) {
      throw new ApiError(httpStatus.NOT_FOUND, "Parent category not found");
    }

    // Send a successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Parent category updated successfully",
      data: updatedCategory,
    });
  }
);

const getAll = catchAsync(async (req, res) => {
  const result = await ParentCategoryService.getAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Parent category updated successfully",
    data: result,
  });
});

export const ParentCategoryController = {
  createParentCategory,
  getSingleParentCategoryBySlug,
  getSingleParentCategoryById,
  updateParentCategoryById,
  getAll,
};
