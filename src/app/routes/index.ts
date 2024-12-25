import express from "express";

import { ParentCategoryRoutes } from "../modules/ParentCategorie/ParentCategory.routes";
import { CategoryRoutes } from "../modules/Category/Category.routes";
import { ProductRoutes } from "./../modules/Product/Product.routes";
import { USerRoutes } from "../modules/Users/Users.routes";
import { WishlistRoutes } from "../modules/Wishlist/Wishlist.routes";
import { AuthRoutes } from "./../modules/Auth/Auth.routes";
import { OderRoutes } from "../modules/Oder/Oder.routes";
import { BannerRoutes } from "../modules/Banner/Banner.routes";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/parent-category",
    route: ParentCategoryRoutes,
  },
  {
    path: "/Category",
    route: CategoryRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/user",
    route: USerRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/order",
    route: OderRoutes,
  },
  {
    path: "/banner",
    route: BannerRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
