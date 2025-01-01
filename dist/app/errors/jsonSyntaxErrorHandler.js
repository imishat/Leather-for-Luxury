"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonSyntaxErrorHandler = (error, req, res, next) => {
    if (error instanceof SyntaxError && "body" in error) {
        // Build the error message using `IGenericErrorMessage`
        const errorMessages = [
            {
                path: "body",
                message: "The JSON provided in the request body is malformed",
            },
        ];
        // Send the error response
        res.status(599).json({
            success: false,
            message: "Invalid JSON payload",
            errorMessages,
        });
        return;
    }
    next(error);
};
exports.default = jsonSyntaxErrorHandler;
