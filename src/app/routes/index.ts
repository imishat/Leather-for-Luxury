import express from "express";

import { ParentCategoryRoutes } from "../modules/ParentCategorie/ParentCategory.routes";
import { CategoryRoutes } from "../modules/Category/Category.routes";
import { ProductRoutes } from "./../modules/Product/Product.routes";
import { USerRoutes } from "../modules/Users/Users.routes";

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
