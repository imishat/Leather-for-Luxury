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
exports.ParentCategoryController = exports.updateParentCategoryById = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const ParentCategory_service_1 = require("./ParentCategory.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse "));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createParentCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parentCategory = req.body;
    const result = yield ParentCategory_service_1.ParentCategoryService.createParentCategory(parentCategory);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "parent-category is created successfully",
        data: result,
    });
}));
const getSingleParentCategoryBySlug = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params; // Destructure 'slug' from req.params
    // Log slug for debugging
    console.log("Slug:", slug);
    // Validate that slug exists
    if (!slug) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Slug parameter is required");
    }
    // Fetch the category by slug
    const result = yield ParentCategory_service_1.ParentCategoryService.getSingleBySlug(slug);
    // Handle the case where the category does not exist
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Parent category not found");
    }
    // Send the successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Parent category retrieved successfully",
        data: result,
    });
}));
const getSingleParentCategoryById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const id = req.params.id;
    const result = yield ParentCategory_service_1.ParentCategoryService.getSingleById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "parent-category is retrieved successfully",
        data: result,
    });
}));
exports.updateParentCategoryById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body
    // Perform the update operation
    const updatedCategory = yield ParentCategory_service_1.ParentCategoryService.updateParentCategoryId(id, updateData);
    // Handle case where the category is not found
    if (!updatedCategory) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Parent category not found");
    }
    // Send a successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Parent category updated successfully",
        data: updatedCategory,
    });
}));
const getAll = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ParentCategory_service_1.ParentCategoryService.getAll();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Parent category updated successfully",
        data: result,
    });
}));
const deleteParentCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield ParentCategory_service_1.ParentCategoryService.deleteParentCategoryFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Parent-Category is deleted successfully",
        data: result,
    });
}));
exports.ParentCategoryController = {
    createParentCategory,
    getSingleParentCategoryBySlug,
    getSingleParentCategoryById,
    updateParentCategoryById: exports.updateParentCategoryById,
    getAll,
    deleteParentCategory,
};
