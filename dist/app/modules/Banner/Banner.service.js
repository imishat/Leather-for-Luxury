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
exports.BannerService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const VideoBanner_model_1 = require("./VideoBanner.model");
const createVideoBanner = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield VideoBanner_model_1.VideoBanner.create(payload);
    return result;
});
const createTopBanner = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield VideoBanner_model_1.TopBanner.create(payload);
    return result;
});
const getSingleVideoBannerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield VideoBanner_model_1.VideoBanner.findById(id);
    return result;
});
const getSingleTopBannerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield VideoBanner_model_1.TopBanner.findById(id);
    return result;
});
const updateVideoBannerById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the ID format
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    // Find and update the parent category
    const result = yield VideoBanner_model_1.VideoBanner.findByIdAndUpdate(id, payload, {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validations
    });
    return result;
});
const updateTopBannerById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the ID format
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    // Find and update the parent category
    const result = yield VideoBanner_model_1.TopBanner.findByIdAndUpdate(id, payload, {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validations
    });
    return result;
});
const getAllTopBanner = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield VideoBanner_model_1.TopBanner.find().sort({ createdAt: -1 });
    return result;
});
const getAllVideoBanner = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield VideoBanner_model_1.VideoBanner.find({}).sort({ createdAt: -1 });
    return result;
});
exports.BannerService = {
    createVideoBanner,
    createTopBanner,
    getSingleVideoBannerById,
    getSingleTopBannerById,
    updateVideoBannerById,
    updateTopBannerById,
    getAllTopBanner,
    getAllVideoBanner,
};
