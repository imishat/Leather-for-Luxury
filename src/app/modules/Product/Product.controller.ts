import { catchAsync } from "../../shared/catchAsync";

import httpStatus from "http-status";
import { ProductService } from "./Product.service";

import sendResponse from "../../shared/sendResponse ";
import { Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import pick from "../../shared/pick";
import { paginationFields } from "../../constants/pagination";
import { ProductFilterableFields } from "./Product.constants";
import { IProduct } from "./Product.interface";

const createProduct = catchAsync(
  async (req: { body: any }, res: Response<any, Record<string, any>>) => {
    const product = req.body;

    const result = await ProductService.createProduct(product);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product is created successfully",
      data: result,
    });
  }
);

const getSingleProductBySlug = catchAsync(
  async (req: Request, res: Response) => {
    const { slug } = req.params; // Destructure 'slug' from req.params

    // Log slug for debugging
    console.log("Slug:", slug);

    // Validate that slug exists
    if (!slug) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Slug parameter is required");
    }

    // Fetch the category by slug
    const result = await ProductService.getSingleBySlug(slug);

    // Handle the case where the category does not exist
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    // Send the successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product  retrieved successfully",
      data: result,
    });
  }
);
const getSingleProductById = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id);
  const id = req.params.id;

  const result = await ProductService.getSingleById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product  is retrieved successfully",
    data: result,
  });
});

export const updateProductById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body

    // Perform the update operation
    const updatedCategory = await ProductService.updateProductId(
      id,
      updateData
    );

    // Handle case where the category is not found
    if (!updatedCategory) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product  not found");
    }

    // Send a successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product  updated successfully",
      data: updatedCategory,
    });
  }
);

const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ProductFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductService.getAll(filters, paginationOptions);
  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product  updated successfully",
    meta: result.meta,
    data: result.data,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product  is deleted successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getSingleProductBySlug,
  getSingleProductById,
  updateProductById,
  getAll,

  deleteProduct,
};
