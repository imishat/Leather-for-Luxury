import { catchAsync } from "../../shared/catchAsync";

import { IParentCategory } from "./ParentCategorie.interface";
import httpStatus from "http-status";
import { ParentCategoryService } from "./ParentCategory.service";
import { NextFunction, RequestHandler } from "express-serve-static-core";
import sendResponse from "../../shared/sendResponse ";
import { Response } from "express";

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

export const ParentCategoryController = {
  createParentCategory,
};
