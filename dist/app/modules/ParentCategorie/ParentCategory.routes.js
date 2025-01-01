"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ParentCategory_controller_1 = require("./ParentCategory.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const ParentCategory_validation_1 = require("./ParentCategory.validation");
const router = express_1.default.Router();
router.post("/create-parent", (0, validateRequest_1.default)(ParentCategory_validation_1.ParentCategoryValidation.ParentCategoryZodSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
ParentCategory_controller_1.ParentCategoryController.createParentCategory);
router.get("/:slug", ParentCategory_controller_1.ParentCategoryController.getSingleParentCategoryBySlug);
router.get("/", ParentCategory_controller_1.ParentCategoryController.getAll);
router.get("/ById/:id", ParentCategory_controller_1.ParentCategoryController.getSingleParentCategoryById);
router.patch("/update/:id", (0, validateRequest_1.default)(ParentCategory_validation_1.ParentCategoryValidation.UpdateParentCategoryZodSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
ParentCategory_controller_1.ParentCategoryController.updateParentCategoryById);
router.delete("/delete/:id", 
// auth(ENUM_USER_ROLE.ADMIN),
ParentCategory_controller_1.ParentCategoryController.deleteParentCategory);
exports.ParentCategoryRoutes = router;
