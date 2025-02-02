"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingZODSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.RatingZODSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z
            .string({
            required_error: "ProductId is required",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), {
            message: "Invalid parent category ID",
        }), // Mongoose ObjectId validator
        userEmail: zod_1.z.string({
            required_error: "UserId is required",
        }),
        userName: zod_1.z.string({
            required_error: "UserId is required",
        }),
        // Ensures it's a string
        reviewText: zod_1.z.string({
            required_error: "give some text review",
        }), // Ensures it's a string
        ratingStar: zod_1.z.number().int().min(1).max(5),
    }), // Ensures it's an integer between 1 and 5
});
