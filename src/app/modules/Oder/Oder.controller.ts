import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse ";
import httpStatus from "http-status";
import { OrderService } from "./Oder.service";
import ApiError from "../../errors/ApiError";

const createOder = catchAsync(
  async (req: { body: any }, res: Response<any, Record<string, any>>) => {
    const oder = req.body;

    const result = await OrderService.createOder(oder);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Oder is created successfully",
      data: result,
    });
  }
);

const getSingleOrderById = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id);
  const id = req.params.id;

  const result = await OrderService.getSingleById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "order is retrieved successfully",
    data: result,
  });
});
const getOrderByUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id);
  const id = req.params.id;

  const result = await OrderService.getOderByUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " UserOrder is retrieved successfully",
    data: result,
  });
});
export const updateOderById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body

    // Perform the update operation
    const updatedOrder = await OrderService.updateOrderId(id, updateData);

    // Handle case where the category is not found
    if (!updatedOrder) {
      throw new ApiError(httpStatus.NOT_FOUND, "Oder  not found");
    }

    // Send a successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order  updated successfully",
      data: updatedOrder,
    });
  }
);
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await OrderService.deleteOrderFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order  is deleted successfully",
    data: result,
  });
});

export const OderController = {
  createOder,
  getSingleOrderById,
  getOrderByUser,
  updateOderById,
  deleteOrder,
};
