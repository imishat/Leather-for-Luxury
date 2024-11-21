import express from "express";

import { ParentCategoryRoutes } from "../modules/ParentCategorie/ParentCategory.routes";
import { CategoryRoutes } from "../modules/Category/Category.routes";
import { ProductRoutes } from "./../modules/Product/Product.routes";

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
