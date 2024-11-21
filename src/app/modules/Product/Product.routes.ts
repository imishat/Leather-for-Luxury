import express from "express";
import { ProductController } from "./Product.controller";
import { RatingController } from "../Rating/Rating.controller";

const router = express.Router();

router.post("/create-product", ProductController.createProduct);
router.get("/:slug", ProductController.getSingleProductBySlug);
router.get("/", ProductController.getAll);
router.get("/ById/:id", ProductController.getSingleProductById);
router.patch("/update/:id", ProductController.updateProductById);
router.delete("/delete/:id", ProductController.deleteProduct);
router.post("/rating", RatingController.createRating);

export const ProductRoutes = router;
