"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = exports.UpdateOrderZodSchema = exports.OrderZodSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.OrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderItems: zod_1.z.array(zod_1.z.object({
            quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
            product: zod_1.z
                .string()
                .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), {
                message: "Invalid Product ID",
            }),
            color: zod_1.z.string().min(1, "color is  required"),
        })),
        name: zod_1.z.string().min(1, "name is required"),
        shippingAddress: zod_1.z.string().optional(),
        city: zod_1.z.string().min(1, "City is required"),
        zip: zod_1.z.string().min(1, "ZIP code is required"),
        country: zod_1.z.string().min(1, "Country is required"),
        phone: zod_1.z.string().min(1, "Phone number is required"),
        email: zod_1.z.string().min(1, "Email number is required"),
        status: zod_1.z.string().default("Pending"),
        totalPrice: zod_1.z.number().optional(),
        trackCode: zod_1.z.string().optional(),
        dateOrdered: zod_1.z.date().optional(),
    }),
});
exports.UpdateOrderZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        orderItems: zod_1.z
            .array(zod_1.z.object({
            quantity: zod_1.z.number().optional(),
            product: zod_1.z.string().optional(),
            color: zod_1.z.string().optional(),
        }))
            .optional(),
        name: zod_1.z.string().optional(),
        shippingAddress2: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        zip: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        totalPrice: zod_1.z.number().optional(),
        trackCode: zod_1.z.string().optional(),
        dateOrdered: zod_1.z.date().optional(),
    })
        .optional(),
});
exports.OrderValidation = {
    OrderZodSchema: exports.OrderZodSchema,
    UpdateOrderZodSchema: exports.UpdateOrderZodSchema,
};
