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
exports.ParentCategoryService = exports.updateParentCategoryId = void 0;
const ParentCategory_model_1 = require("./ParentCategory.model");
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createParentCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ParentCategory_model_1.ParentCategory.create(payload);
    // if (!createdUser) {
    //   throw new ApiError(400, "Failed to create");
    // }
    return result;
});
const getSingleBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ParentCategory_model_1.ParentCategory.findOne({ slug }); // Query by the 'slug' field
    return result;
});
const getSingleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ParentCategory_model_1.ParentCategory.findById(id);
    return result;
});
const updateParentCategoryId = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the ID format
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    // Find and update the parent category
    const result = yield ParentCategory_model_1.ParentCategory.findByIdAndUpdate(id, payload, {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validations
    });
    return result;
});
exports.updateParentCategoryId = updateParentCategoryId;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ParentCategory_model_1.ParentCategory.find().sort({ createdAt: -1 });
    return result;
});
const deleteParentCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const parentCategory = yield ParentCategory_model_1.ParentCategory.findById(id);
    if (!parentCategory) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "parentCategory not found");
    }
    const result = yield ParentCategory_model_1.ParentCategory.findByIdAndDelete({ _id: id });
    return result;
});
exports.ParentCategoryService = {
    createParentCategory,
    getSingleBySlug,
    getSingleById,
    updateParentCategoryId: exports.updateParentCategoryId,
    getAll,
    deleteParentCategoryFromDB,
};
