import express from "express";
import { OderController } from "./Oder.controller";
import validateRequest from "./../../middlewares/validateRequest";
import { OrderValidation } from "./Oder.validation";
const router = express.Router();

router.post(
  "/create-oder",
  validateRequest(OrderValidation.OrderZodSchema),
  OderController.createOder
);

router.get("/ById/:id", OderController.getSingleOrderById);
router.get("/User/:id", OderController.getOrderByUser);
router.patch(
  "/update/:id",
  validateRequest(OrderValidation.UpdateOrderZodSchema),
  OderController.updateOderById
);
router.delete(
  "/delete/:id",
  // auth(ENUM_USER_ROLE.ADMIN),
  OderController.deleteOrder
);
export const OderRoutes = router;
