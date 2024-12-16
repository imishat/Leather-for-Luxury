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
exports.CategoryController = exports.updateCategoryById = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const Category_service_1 = require("./Category.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse "));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Category = req.body;
    console.log(req.user);
    const result = yield Category_service_1.CategoryService.createCategory(Category);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category is created successfully",
        data: result,
    });
}));
const getSingleCategoryBySlug = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params; // Destructure 'slug' from req.params
    // Log slug for debugging
    console.log("Slug:", slug);
    // Validate that slug exists
    if (!slug) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Slug parameter is required");
    }
    // Fetch the category by slug
    const result = yield Category_service_1.CategoryService.getSingleBySlug(slug);
    // Handle the case where the category does not exist
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, " Category not found");
    }
    // Send the successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " Category retrieved successfully",
        data: result,
    });
}));
const getSingleCategoryById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const id = req.params.id;
    const result = yield Category_service_1.CategoryService.getSingleById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category is retrieved successfully",
        data: result,
    });
}));
const getParent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const id = req.params.id;
    const result = yield Category_service_1.CategoryService.getSingleById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "  All Parent Category is retrieved successfully",
        data: result,
    });
}));
exports.updateCategoryById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body
    // Perform the update operation
    const updatedCategory = yield Category_service_1.CategoryService.updateCategoryId(id, updateData);
    // Handle case where the category is not found
    if (!updatedCategory) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, " Category not found");
    }
    // Send a successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " Category updated successfully",
        data: updatedCategory,
    });
}));
const getAll = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Category_service_1.CategoryService.getAll();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category updated successfully",
        data: result,
    });
}));
const deleteCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Category_service_1.CategoryService.deleteCategoryFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category is deleted successfully",
        data: result,
    });
}));
exports.CategoryController = {
    createCategory,
    getSingleCategoryBySlug,
    getSingleCategoryById,
    updateCategoryById: exports.updateCategoryById,
    getAll,
    deleteCategory,
    getParent,
};
