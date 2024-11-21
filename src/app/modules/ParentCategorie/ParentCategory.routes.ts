import express from "express";

import { ParentCategoryController } from "./ParentCategory.controller";

const router = express.Router();

router.post("/create-parent", ParentCategoryController.createParentCategory);
router.get("/:slug", ParentCategoryController.getSingleParentCategoryBySlug);
router.get("/", ParentCategoryController.getAll);
router.get("/ById/:id", ParentCategoryController.getSingleParentCategoryById);
router.patch("/update/:id", ParentCategoryController.updateParentCategoryById);
router.delete("/delete/:id", ParentCategoryController.deleteParentCategory);

export const ParentCategoryRoutes = router;
