"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateFieldError = void 0;
const handleDuplicateFieldError = (error) => {
    // Extract the duplicate field
    const duplicateField = Object.keys(error.keyValue)[0];
    const duplicateValue = error.keyValue[duplicateField];
    // Construct error message
    const errorMessages = [
        {
            path: duplicateField,
            message: `The value "${duplicateValue}" for ${duplicateField} must be unique.`,
        },
    ];
    const statusCode = 409;
    return {
        statusCode, // HTTP status for Conflict
        message: "Duplicate key error",
        errorMessages,
    };
};
exports.handleDuplicateFieldError = handleDuplicateFieldError;
