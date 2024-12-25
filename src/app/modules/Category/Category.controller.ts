import { catchAsync } from "../../shared/catchAsync";

import httpStatus from "http-status";
import { CategoryService } from "./Category.service";

import sendResponse from "../../shared/sendResponse ";
import { Request, Response } from "express";
import ApiError from "../../errors/ApiError";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const Category = req.body;

  const result = await CategoryService.createCategory(Category);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is created successfully",
    data: result,
  });
});

const getSingleCategoryBySlug = catchAsync(
  async (req: Request, res: Response) => {
    const { slug } = req.params; // Destructure 'slug' from req.params

    // Log slug for debugging

    // Validate that slug exists
    if (!slug) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Slug parameter is required");
    }

    // Fetch the category by slug
    const result = await CategoryService.getSingleBySlug(slug);

    // Handle the case where the category does not exist
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, " Category not found");
    }

    // Send the successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " Category retrieved successfully",
      data: result,
    });
  }
);
const getSingleCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.params.id);
    const id = req.params.id;

    const result = await CategoryService.getSingleById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category is retrieved successfully",
      data: result,
    });
  }
);
const getParent = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id);
  const id = req.params.id;

  const result = await CategoryService.getParent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "  All Parent Category is retrieved successfully",
    data: result,
  });
});

export const updateCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body

    // Perform the update operation
    const updatedCategory = await CategoryService.updateCategoryId(
      id,
      updateData
    );

    // Handle case where the category is not found
    if (!updatedCategory) {
      throw new ApiError(httpStatus.NOT_FOUND, " Category not found");
    }

    // Send a successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " Category updated successfully",
      data: updatedCategory,
    });
  }
);

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category retrieved  successfully",
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.deleteCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is deleted successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getSingleCategoryBySlug,
  getSingleCategoryById,
  updateCategoryById,
  getAll,
  deleteCategory,
  getParent,
};
