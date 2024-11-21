import express from "express";

import { CategoryController } from "./Category.controller";

const router = express.Router();

router.post("/create-category", CategoryController.createCategory);
router.get("/:slug", CategoryController.getSingleCategoryBySlug);
router.get("/", CategoryController.getAll);
router.get("/ById/:id", CategoryController.getSingleCategoryById);
router.patch("/update/:id", CategoryController.updateCategoryById);
router.delete("/delete/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;
