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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = exports.updateProductId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Product_model_1 = require("./Product.model");
const Product_constants_1 = require("./Product.constants");
const paginationHelper_1 = require("../../helpers/paginationHelper");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_model_1.Product.create(payload);
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
const getAll = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    console.log(filters, "flitter");
    // Extract searchTerm to implement search query
    const { category, searchTerm, colorName, startPrice, endPrice } = filters, filtersData = __rest(filters, ["category", "searchTerm", "colorName", "startPrice", "endPrice"]);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: Product_constants_1.ProductSearchableFields.map((field) => {
                if (field === "categoryId" || "parentCategoryId") {
                    return {
                        $expr: {
                            $regexMatch: {
                                input: { $toString: `$${field}` },
                                regex: searchTerm,
                                options: "i",
                            },
                        },
                    };
                }
                return {
                    [field]: {
                        $regex: searchTerm,
                        $options: "i",
                    },
                };
            }),
        });
    }
    // Filter by multiple colorNames
    if (colorName) {
        let colorArray = [];
        if (typeof colorName === "string") {
            colorArray = colorName.split(",").map((color) => color.trim());
        }
        else if (Array.isArray(colorName)) {
            colorArray = colorName;
        }
        andConditions.push({
            "color.colorName": {
                $in: colorArray.map((color) => new RegExp(`^${color}$`, "i")),
            },
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Price range filter
    if (startPrice && endPrice) {
        andConditions.push({
            originalPrice: {
                $gte: startPrice, // Greater than or equal to startPrice
                $lte: endPrice, // Less than or equal to endPrice
            },
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield Product_model_1.Product.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({
        name: 1,
        imageDefault: 1,
        imageHover: 1,
        slug: 1,
        originalPrice: 1,
        discountedPrice: 1,
        inStock: 1,
        onSale: 1,
        color: 1,
    });
    const total = yield Product_model_1.Product.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_model_1.Product.findById(id);
    if (!product) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "product not found");
    }
    const result = yield Product_model_1.Product.findByIdAndDelete({ _id: id });
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
