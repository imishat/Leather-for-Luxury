"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const Wishlist_model_1 = require("./Wishlist.model");
const createWishlist = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Wishlist_model_1.Wishlist.create(payload);
    return result;
});
const getSingleUserWishlist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Wishlist_model_1.Wishlist.find({ user: id })
        .populate("product")
        .sort({ createdAt: -1 });
    return result;
});
const deleteWishlistFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Wishlist_model_1.Wishlist.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
exports.WishlistService = {
    createWishlist,
    getSingleUserWishlist,
    deleteWishlistFromDB,
};
