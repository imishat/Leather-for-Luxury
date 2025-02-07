"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Product_controller_1 = require("./Product.controller");
const Rating_controller_1 = require("../Rating/Rating.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Rating_validation_1 = require("../Rating/Rating.validation");
const router = express_1.default.Router();
router.post("/create-product", Product_controller_1.ProductController.createProduct);
router.get("/:slug", Product_controller_1.ProductController.getSingleProductBySlug);
router.get("/", Product_controller_1.ProductController.getAll);
router.get("/ById/:id", Product_controller_1.ProductController.getSingleProductById);
router.get("/product/:id", Rating_controller_1.RatingController.getRatingByProduct);
router.patch("/update/:id", 
// auth(ENUM_USER_ROLE.ADMIN),
Product_controller_1.ProductController.updateProductById);
router.delete("/delete/:id", 
// auth(ENUM_USER_ROLE.ADMIN),
Product_controller_1.ProductController.deleteProduct);
router.post("/rating", (0, validateRequest_1.default)(Rating_validation_1.RatingZODSchema), 
// auth(ENUM_USER_ROLE.USER),
Rating_controller_1.RatingController.createRating);
router.get("/all/colors", Product_controller_1.ProductController.getAllUniqueColor);
exports.ProductRoutes = router;
