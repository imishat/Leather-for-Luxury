"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Category_controller_1 = require("./Category.controller");
const router = express_1.default.Router();
router.post("/create-category", Category_controller_1.CategoryController.createCategory);
router.get("/:slug", Category_controller_1.CategoryController.getSingleCategoryBySlug);
router.get("/", Category_controller_1.CategoryController.getAll);
router.get("/ById/:id", Category_controller_1.CategoryController.getSingleCategoryById);
router.patch("/update/:id", Category_controller_1.CategoryController.updateCategoryById);
router.delete("/delete/:id", Category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
