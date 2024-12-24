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
        })),
        shippingAddress1: zod_1.z.string().min(1, "Shipping address is required"),
        shippingAddress2: zod_1.z.string().optional(),
        city: zod_1.z.string().min(1, "City is required"),
        zip: zod_1.z.string().min(1, "ZIP code is required"),
        country: zod_1.z.string().min(1, "Country is required"),
        phone: zod_1.z.string().min(1, "Phone number is required"),
        status: zod_1.z.string().default("Pending"),
        totalPrice: zod_1.z.number().optional(),
        user: zod_1.z.string().refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), {
            message: "Invalid parent category ID",
        }),
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
        }))
            .optional(),
        shippingAddress1: zod_1.z.string().optional(),
        shippingAddress2: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        zip: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        totalPrice: zod_1.z.number().optional(),
        user: zod_1.z
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), {
            message: "Invalid parent category ID",
        })
            .optional(),
        dateOrdered: zod_1.z.date().optional(),
    })
        .optional(),
});
exports.OrderValidation = {
    OrderZodSchema: exports.OrderZodSchema,
    UpdateOrderZodSchema: exports.UpdateOrderZodSchema,
};
