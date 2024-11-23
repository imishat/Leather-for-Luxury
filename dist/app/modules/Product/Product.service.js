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
exports.ProductService = exports.updateProductId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Product_model_1 = require("./Product.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_model_1.Product.create(payload);
    // if (!createdUser) {
    //   throw new ApiError(400, "Failed to create");
    // }
    return result;
});
const getSingleBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_model_1.Product.findOne({ slug }).populate("categoryId"); // Query by the 'slug' field
    return result;
});
const getSingleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_model_1.Product.findById(id);
    return result;
});
const updateProductId = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the ID format
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    // Find and update the parent category
    const result = yield Product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validations
    });
    return result;
});
exports.updateProductId = updateProductId;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_model_1.Product.find().sort({ createdAt: -1 });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_model_1.Product.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
exports.ProductService = {
    createProduct,
    getSingleBySlug,
    getSingleById,
    updateProductId: exports.updateProductId,
    getAll,
    deleteProductFromDB,
};
