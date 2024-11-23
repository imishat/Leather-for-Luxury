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
exports.ProductController = exports.updateProductById = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const Product_service_1 = require("./Product.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse "));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const result = yield Product_service_1.ProductService.createProduct(product);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product is created successfully",
        data: result,
    });
}));
const getSingleProductBySlug = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params; // Destructure 'slug' from req.params
    // Log slug for debugging
    console.log("Slug:", slug);
    // Validate that slug exists
    if (!slug) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Slug parameter is required");
    }
    // Fetch the category by slug
    const result = yield Product_service_1.ProductService.getSingleBySlug(slug);
    // Handle the case where the category does not exist
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    // Send the successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product  retrieved successfully",
        data: result,
    });
}));
const getSingleProductById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const id = req.params.id;
    const result = yield Product_service_1.ProductService.getSingleById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product  is retrieved successfully",
        data: result,
    });
}));
exports.updateProductById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body
    // Perform the update operation
    const updatedCategory = yield Product_service_1.ProductService.updateProductId(id, updateData);
    // Handle case where the category is not found
    if (!updatedCategory) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product  not found");
    }
    // Send a successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product  updated successfully",
        data: updatedCategory,
    });
}));
const getAll = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_service_1.ProductService.getAll();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product  updated successfully",
        data: result,
    });
}));
const deleteProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Product_service_1.ProductService.deleteProductFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product  is deleted successfully",
        data: result,
    });
}));
exports.ProductController = {
    createProduct,
    getSingleProductBySlug,
    getSingleProductById,
    updateProductById: exports.updateProductById,
    getAll,
    deleteProduct,
};
