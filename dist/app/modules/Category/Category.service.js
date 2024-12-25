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
exports.CategoryService = exports.updateCategoryId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Category_model_1 = require("./Category.model");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const ParentCategory_model_1 = require("../ParentCategorie/ParentCategory.model");
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { parentCategoryId } = payload;
    const ParentId = yield ParentCategory_model_1.ParentCategory.findById(parentCategoryId);
    if (!ParentId) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, " ParentCategory-Id not found");
    }
    const result = yield Category_model_1.Category.create(payload);
    // if (!createdUser) {
    //   throw new ApiError(400, "Failed to create");
    // }
    return result;
});
const getSingleBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Category_model_1.Category.findOne({ slug }); // Query by the 'slug' field
    return result;
});
const getSingleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Category_model_1.Category.findById(id);
    return result;
});
const getParent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Category_model_1.Category.find({ parentCategoryId: id });
    return result;
});
const updateCategoryId = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the ID format
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    // Find and update the parent category
    const result = yield Category_model_1.Category.findByIdAndUpdate(id, payload, {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validations
    });
    return result;
});
exports.updateCategoryId = updateCategoryId;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Category_model_1.Category.find().sort({ createdAt: -1 });
    return result;
});
const deleteCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_model_1.Category.findById(id);
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category not found");
    }
    const result = yield Category_model_1.Category.findByIdAndDelete({ _id: id });
    return result;
});
exports.CategoryService = {
    createCategory,
    getSingleBySlug,
    getSingleById,
    updateCategoryId: exports.updateCategoryId,
    getAll,
    deleteCategoryFromDB,
    getParent,
};
