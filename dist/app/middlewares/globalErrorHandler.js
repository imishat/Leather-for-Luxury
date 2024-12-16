"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const zodErrorHandler_1 = __importDefault(require("../errors/zodErrorHandler"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const globalErrorHandler = (error, req, res, next) => {
    console.log(error, "golobal");
    //
    config_1.default.env === "development"
        ? console.log("globalErrorHandler", error)
        : console.log("globalErrorHandler", error);
    let statusCode = 500;
    let message = "Something went wrong";
    let errorMessages = [];
    // validation error message
    if (error.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        (statusCode = simplifiedError.statusCode),
            (message = simplifiedError.message);
        errorMessages = simplifiedError.errorMessages;
    }
    // zod error handel
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodErrorHandler_1.default)(error);
        (statusCode = simplifiedError.statusCode),
            (message = simplifiedError.message);
        errorMessages = simplifiedError.errorMessages;
    }
    //Cast error
    else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    // api error message
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    // common error message
    else if (error instanceof mongoose_1.Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== "production" ? error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
