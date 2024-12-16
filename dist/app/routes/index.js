"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ParentCategory_routes_1 = require("../modules/ParentCategorie/ParentCategory.routes");
const Category_routes_1 = require("../modules/Category/Category.routes");
const Product_routes_1 = require("./../modules/Product/Product.routes");
const Users_routes_1 = require("../modules/Users/Users.routes");
const Wishlist_routes_1 = require("../modules/Wishlist/Wishlist.routes");
const Auth_routes_1 = require("./../modules/Auth/Auth.routes");
const Oder_routes_1 = require("../modules/Oder/Oder.routes");
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
    {
        path: "/user",
        route: Users_routes_1.USerRoutes,
    },
    {
        path: "/wishlist",
        route: Wishlist_routes_1.WishlistRoutes,
    },
    {
        path: "/auth",
        route: Auth_routes_1.AuthRoutes,
    },
    {
        path: "/order",
        route: Oder_routes_1.OderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
