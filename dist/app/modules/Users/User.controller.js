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
exports.USerController = exports.updateUSerProfile = exports.verifyEmail = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse "));
const Users_service_1 = require("./Users.service");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield Users_service_1.UserService.createUSer(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Created successfully",
        data: result,
    });
}));
exports.verifyEmail = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract user ID from request parameters and update payload from request body
    const { code } = req.body;
    // console.log(code, "code");
    // Update the user profile using the service layer
    const updatedUser = yield Users_service_1.UserService.verifyEmailService(code);
    // If no user is found, throw an error
    if (!updatedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Send a successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User verify successfully",
        data: updatedUser,
    });
}));
exports.updateUSerProfile = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update payload from request body
    // Perform the update operation
    const updatedCategory = yield Users_service_1.UserService.updateUSerProfile(id, updateData);
    // Handle case where the category is not found
    if (!updatedCategory) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Send a successful response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User updated successfully",
        data: updatedCategory,
    });
}));
exports.USerController = {
    createUser,
    updateUSerProfile: exports.updateUSerProfile,
    verifyEmail: exports.verifyEmail,
};
