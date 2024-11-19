import express from "express";

import { ParentCategoryController } from "./ParentCategory.controller";

const router = express.Router();

router.post("/create-parent", ParentCategoryController.createParentCategory);

export const ParentCategoryRoutes = router;
