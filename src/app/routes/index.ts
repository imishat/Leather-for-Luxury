import express from "express";

import { ParentCategoryRoutes } from "../modules/ParentCategorie/ParentCategory.routes";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/parent-category",
    route: ParentCategoryRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
