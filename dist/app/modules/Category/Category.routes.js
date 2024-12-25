"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Category_controller_1 = require("./Category.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Category_validation_1 = require("./Category.validation");
const router = express_1.default.Router();
router.post("/create-category", (0, validateRequest_1.default)(Category_validation_1.CategoryValidation.CategoryZodSchema), 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
Category_controller_1.CategoryController.createCategory);
router.get("/:slug", Category_controller_1.CategoryController.getSingleCategoryBySlug);
router.get("/", Category_controller_1.CategoryController.getAll);
router.get("/ById/:id", Category_controller_1.CategoryController.getSingleCategoryById);
router.get("/Parent/:id", Category_controller_1.CategoryController.getParent);
router.patch("/update/:id", (0, validateRequest_1.default)(Category_validation_1.CategoryValidation.CategoryUpdateZodSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
Category_controller_1.CategoryController.updateCategoryById);
router.delete("/delete/:id", 
// auth(ENUM_USER_ROLE.ADMIN),
Category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
