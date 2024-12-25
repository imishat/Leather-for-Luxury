"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const ProductSchema = new mongoose_1.Schema({
    barcode: { type: String, required: true },
    slug: { type: String, required: false },
    name: { type: String, required: true },
    color: [
        {
            colorName: { type: String, required: true },
            hex: { type: String, required: true },
            availableQuantity: { type: Number, required: true },
        },
    ],
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    onSale: { type: Boolean, required: true },
    categoryId: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    imageDefault: { type: String, required: true },
    imageHover: { type: String, required: true },
    additionalDetails: [
        {
            color: { type: String, required: true },
            hex: { type: String, required: true },
            quantity: { type: Number, required: true },
            images: [{ type: String, required: true }],
        },
    ],
    productDetails: {
        additionalProductDetails: { type: mongoose_1.Schema.Types.Mixed, required: true },
        size: [{ type: Map, of: String, required: true }],
        warranty: { type: String, required: true },
    },
}, { timestamps: true });
// Pre-save middleware to set the `id` field
ProductSchema.pre("save", function (next) {
    if (!this.id) {
        this.id = this._id.toString();
    }
    next();
});
ProductSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        delete ret._id;
    },
});
ProductSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("name") || this.isNew) {
            // Generate base slug
            const baseSlug = (0, slugify_1.default)(this.name, {
                lower: true, // Convert to lowercase
                strict: true, // Remove special characters
                replacement: "-", // Replace spaces with hyphens
            });
            let uniqueSlug = baseSlug;
            let counter = 0;
            // Check for slug uniqueness
            while (yield exports.Product.findOne({ slug: uniqueSlug }) // Correct model name
            ) {
                counter += 1;
                uniqueSlug = `${baseSlug}-${counter}`; // Append counter if duplicate
            }
            this.slug = uniqueSlug; // Set the unique slug
        }
        next();
    });
});
// Transform output to include `id` and remove `_id` and `__v`
ProductSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        delete ret._id;
    },
});
exports.Product = mongoose_1.default.model("Product", ProductSchema);
