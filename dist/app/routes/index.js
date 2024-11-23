"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ParentCategory_routes_1 = require("../modules/ParentCategorie/ParentCategory.routes");
const Category_routes_1 = require("../modules/Category/Category.routes");
const Product_routes_1 = require("./../modules/Product/Product.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/parent-category",
        route: ParentCategory_routes_1.ParentCategoryRoutes,
    },
    {
        path: "/Category",
        route: Category_routes_1.CategoryRoutes,
    },
    {
        path: "/product",
        route: Product_routes_1.ProductRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
