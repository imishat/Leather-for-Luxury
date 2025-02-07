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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const slugify_1 = __importDefault(require("slugify"));
// Define the Mongoose schema
const UserSchema = new mongoose_1.Schema({
    id: { type: String, required: false },
    name: { type: String, required: true },
    slug: { type: String, require: false },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
    location: { type: String },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: false, select: 0 },
    shippingAddress: { type: String, required: false, select: 0 },
    verificationToken: { type: String },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing user password
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bycrypt_salt_rounds));
        next();
    });
});
// find user by email
UserSchema.statics.isUserExistsByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email }).select("+password");
    });
};
// check password  meth
UserSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
UserSchema.pre("save", function (next) {
    if (!this.id) {
        this.id = this._id.toString();
    }
    next();
});
UserSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        delete ret._id;
    },
});
UserSchema.pre("save", function (next) {
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
            while (yield exports.User.findOne({ slug: uniqueSlug }) // Correct model name
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
UserSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        delete ret._id;
    },
});
// Create the model using the schema
exports.User = mongoose_1.default.model("User", UserSchema);
