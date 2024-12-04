import express from "express";

import { CategoryController } from "./Category.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/users";

const router = express.Router();

router.post(
  "/create-category",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  CategoryController.createCategory
);
router.get("/:slug", CategoryController.getSingleCategoryBySlug);
router.get("/", CategoryController.getAll);
router.get("/ById/:id", CategoryController.getSingleCategoryById);
router.patch("/update/:id", CategoryController.updateCategoryById);
router.delete("/delete/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;
