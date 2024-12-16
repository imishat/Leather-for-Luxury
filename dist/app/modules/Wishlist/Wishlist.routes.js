"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Wishlist_controller_1 = require("./Wishlist.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post("/user/create-wishlist", (0, auth_1.default)(users_1.ENUM_USER_ROLE.USER), Wishlist_controller_1.WishlistController.createWishlist);
router.get("/user-wishlist/:id", Wishlist_controller_1.WishlistController.getSingleUserWishlist);
router.delete("/user-wishlist/single-wishlist/:id", Wishlist_controller_1.WishlistController.getSingleUserWishlist);
exports.WishlistRoutes = router;
