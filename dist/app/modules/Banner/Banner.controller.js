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
exports.BannerController = exports.updateTopBannerById = exports.updateVideoBannerById = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse "));
const Banner_service_1 = require("./Banner.service");
const createVideo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.body;
    const result = yield Banner_service_1.BannerService.createVideoBanner(url);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "VideoBanner is created successfully",
        data: result,
    });
}));
const createTopBanner = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Banner = req.body;
    const result = yield Banner_service_1.BannerService.createTopBanner(Banner);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "TopBanner is created successfully",
        data: result,
    });
}));
const getSingleVideoBannerById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield Banner_service_1.BannerService.getSingleVideoBannerById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "VideoBanner  is retrieved successfully",
        data: result,
    });
}));
const getSingleTopBannerById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield Banner_service_1.BannerService.getSingleTopBannerById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "TopBanner  is retrieved successfully",
        data: result,
    });
}));
exports.updateVideoBannerById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body
    const updatedVideoBanner = yield Banner_service_1.BannerService.updateVideoBannerById(id, updateData);
    // Handle case where the category is not found
    if (!updatedVideoBanner) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, " Video not found");
    }
    // Send a successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " VideoBanner updated successfully",
        data: updatedVideoBanner,
    });
}));
exports.updateTopBannerById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body
    const updatedTopBanner = yield Banner_service_1.BannerService.updateTopBannerById(id, updateData);
    // Handle case where the category is not found
    if (!updatedTopBanner) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, " Top banner not found");
    }
    // Send a successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " TopBanner updated successfully",
        data: updatedTopBanner,
    });
}));
const getAllTopBanner = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Banner_service_1.BannerService.getAllTopBanner();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "TopBanner retrieved successfully",
        data: result,
    });
}));
const getAllVideoBanner = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Banner_service_1.BannerService.getAllVideoBanner();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "VideoBanner retrieved successfully",
        data: result,
    });
}));
exports.BannerController = {
    createVideo,
    createTopBanner,
    getSingleVideoBannerById,
    getSingleTopBannerById,
    updateVideoBannerById: exports.updateVideoBannerById,
    updateTopBannerById: exports.updateTopBannerById,
    getAllTopBanner,
    getAllVideoBanner,
};
