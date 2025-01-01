"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentCategoryValidation = void 0;
const zod_1 = require("zod");
const ParentCategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required",
        }),
        image: zod_1.z.string({
            required_error: "image is required",
        }),
        slug: zod_1.z.string().optional(),
    }),
});
const UpdateParentCategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
    }),
});
exports.ParentCategoryValidation = {
    ParentCategoryZodSchema,
    UpdateParentCategoryZodSchema,
};
