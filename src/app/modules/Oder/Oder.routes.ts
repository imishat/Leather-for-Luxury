import express from "express";
import validateRequest from "./../../middlewares/validateRequest";
import { OderController } from "./Oder.controller";
import { OrderValidation } from "./Oder.validation";
const router = express.Router();

router.post(
  "/create-order",
  validateRequest(OrderValidation.OrderZodSchema),
  OderController.createOder
);

router.get("/User/:id", OderController.getOrderByUser);
router.get("/ById/:id", OderController.getSingleOrderById);
router.get("/all-order", OderController.getAll);
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
