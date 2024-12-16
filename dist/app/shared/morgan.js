"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.successHandler = void 0;
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("../config"));
morgan_1.default.token("message", (_req, res) => res.locals["errorMessage"] || "");
const getIpFormat = () => config_1.default.env === "production" ? ":remote-addr - " : "";
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errroResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
/**
Custom success handler for Morgan middleware
@param {morgan.FormatFn} successResponseFormat - The log format for successful responses
@param {Request} _req - The incoming request object (not used in this function)
@param {Response} res - The outgoing response object
@returns {void}
*/
exports.successHandler = (0, morgan_1.default)(successResponseFormat, {
    skip: (_req, res) => res.statusCode >= 400,
    stream: { write: (message) => console.log(message.trim()) },
});
/**
Custom error handler for Morgan middleware
@param {morgan.FormatFn} errorResponseFormat - The log format for error responses
@param {Request} _req - The incoming request object (not used in this function)
@param {Response} res - The outgoing response object
@returns {void}
*/
exports.errorHandler = (0, morgan_1.default)(errroResponseFormat, {
    skip: (_req, res) => res.statusCode < 400,
    stream: { write: (message) => console.log(message.trim()) },
});
