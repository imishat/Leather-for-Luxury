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
exports.OrderService = exports.updateOrderId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Oder_model_1 = require("./Oder.model");
const paginationHelper_1 = require("../../helpers/paginationHelper");
const Oder_constants_1 = require("./Oder.constants");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const email_1 = require("../../middlewares/email");
const Product_model_1 = require("../Product/Product.model");
const createOder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the products by their IDs
    const productIds = payload.orderItems.map((item) => item.product);
    const products = yield Product_model_1.Product.find({ _id: { $in: productIds } });
    // console.log(products, "product");
    // Ensure all products are found
    if (products.length !== productIds.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "One or more products not found");
    }
    // Structure the orderItems with product details
    const structuredOrderItems = payload.orderItems.map((item) => {
        const product = products.find((p) => p._id.equals(item.product));
        if (!product) {
            throw new Error("Product not found");
        }
        return Object.assign(Object.assign({}, item), { product: product._id });
    });
    // Create the order
    const result = yield Oder_model_1.Order.create(Object.assign(Object.assign({}, payload), { orderItems: structuredOrderItems }));
    // Send the order email
    yield (0, email_1.sendOrderEmail)(payload.email, products, result);
    return result;
});
const getSingleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Oder_model_1.Order.findById(id).populate({
        path: "orderItems",
        populate: {
            path: "product",
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    return result;
});
const getOderByUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Oder_model_1.Order.find({ email: email }).populate({
        path: "orderItems",
        populate: {
            path: "product",
            select: `
      barcode
      slug
      name
      originalPrice
      discountedPrice
      inStock
      onSale
      imageDefault
      imageHover
    `.trim(),
        },
    });
    return result;
});
const updateOrderId = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { trackCode } = payload;
    // Validate the ID format
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    // Find and update the parent category
    const result = yield Oder_model_1.Order.findByIdAndUpdate(id, payload, {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validations
    });
    if (result && trackCode) {
        const idData = result.email;
        yield (0, email_1.sendVerificationEmail)(idData, trackCode);
        // Ensure it's a string
    }
    return result;
});
exports.updateOrderId = updateOrderId;
const getAll = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    // Extract searchTerm to implement search query
    const { startDate, endDate, searchTerm } = filters, filtersData = __rest(filters, ["startDate", "endDate", "searchTerm"]);
    const andConditions = [];
    let start = startDate ? new Date(startDate) : null;
    let end = endDate ? new Date(endDate) : null;
    // Validate and handle date range
    if (start && end) {
        if (start > end) {
            // Swap dates if startDate is after endDate
            [start, end] = [end, start];
        }
        start.setHours(0, 0, 0, 0); // Start of the day
        end.setHours(23, 59, 59, 999); // End of the day
        andConditions.push({
            dateOrdered: {
                $gte: start,
                $lte: end,
            },
        });
    }
    else if (start) {
        // If only startDate is provided, get all data from startDate onwards
        start.setHours(0, 0, 0, 0);
        andConditions.push({
            dateOrdered: {
                $gte: start,
            },
        });
    }
    else if (end) {
        // If only endDate is provided, get all data up to endDate
        end.setHours(23, 59, 59, 999);
        andConditions.push({
            dateOrdered: {
                $lte: end,
            },
        });
    }
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: Oder_constants_1.OrderSearchableFields.map((field) => {
                if (field === "Product" || "User") {
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
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    // console.log("Query Conditions:", whereConditions);
    const result = yield Oder_model_1.Order.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield Oder_model_1.Order.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const deleteOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Oder_model_1.Order.findById(id);
    if (!order) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    const result = yield Oder_model_1.Order.findByIdAndDelete({ _id: id });
    return result;
});
exports.OrderService = {
    createOder,
    getOderByUser,
    getSingleById,
    updateOrderId: exports.updateOrderId,
    getAll,
    deleteOrderFromDB,
};
