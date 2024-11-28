import express from "express";

import { WishlistController } from "./Wishlist.controller";

const router = express.Router();

router.post("/user/create-wishlist", WishlistController.createWishlist);
router.get("/user-wishlist/:id", WishlistController.getSingleUserWishlist);
router.delete(
  "/user-wishlist/single-wishlist/:id",
  WishlistController.getSingleUserWishlist
);

export const WishlistRoutes = router;
