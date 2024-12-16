"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OderController = exports.updateOderById = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse "));
const http_status_1 = __importDefault(require("http-status"));
const Oder_service_1 = require("./Oder.service");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createOder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oder = req.body;
    const result = yield Oder_service_1.OrderService.createOder(oder);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Oder is created successfully",
        data: result,
    });
}));
const getSingleOrderById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const id = req.params.id;
    const result = yield Oder_service_1.OrderService.getSingleById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "order is retrieved successfully",
        data: result,
    });
}));
const getOrderByUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const id = req.params.id;
    const result = yield Oder_service_1.OrderService.getOderByUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " UserOrder is retrieved successfully",
        data: result,
    });
}));
exports.updateOderById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body
    // Perform the update operation
    const updatedOrder = yield Oder_service_1.OrderService.updateOrderId(id, updateData);
    // Handle case where the category is not found
    if (!updatedOrder) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Oder  not found");
    }
    // Send a successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order  updated successfully",
        data: updatedOrder,
    });
}));
const deleteOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield Oder_service_1.OrderService.deleteOrderFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order  is deleted successfully",
        data: result,
    });
}));
exports.OderController = {
    createOder,
    getSingleOrderById,
    getOrderByUser,
    updateOderById: exports.updateOderById,
    deleteOrder,
};
