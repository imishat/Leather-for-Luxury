import express from "express";

import { WishlistController } from "./Wishlist.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/users";

const router = express.Router();

router.post(
  "/user/create-wishlist",
  // auth(ENUM_USER_ROLE.USER),
  WishlistController.createWishlist
);
router.get("/user-wishlist/:id", WishlistController.getSingleUserWishlist);
router.delete(
  "/user-wishlist/single-wishlist/:id",
  WishlistController.getSingleUserWishlist
);

export const WishlistRoutes = router;
