"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const CategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        name: zod_1.z.string({
            required_error: "category name is required",
        }),
        description: zod_1.z.string().optional(),
        parentCategoryId: zod_1.z
            .string({
            required_error: "parentCategoryId is required",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), {
            message: "Invalid parent category ID",
        }),
        image: zod_1.z.string({
            required_error: "image link  is required",
        }),
        slug: zod_1.z.string().optional(),
    }),
});
const CategoryUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        parentCategoryId: zod_1.z
            .string({
            required_error: "parentCategoryId is required",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), {
            message: "Invalid parent category ID",
        }),
        image: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
    }),
});
exports.CategoryValidation = {
    CategoryZodSchema,
    CategoryUpdateZodSchema,
};
