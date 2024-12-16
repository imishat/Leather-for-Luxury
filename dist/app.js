"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const sendResponse_1 = __importDefault(require("./app/shared/sendResponse "));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Welcome to the API Of Leather-for-Luxury",
        data: null, // No data to send
    });
});
// route
app.use("/api/v1", routes_1.default);
//global error handler
app.use(globalErrorHandler_1.default);
//Testing
exports.default = app;
