import { ENUM_USER_ROLE } from "../../../enums/users";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./Auth.controller";
import { AuthValidation } from "./Auth.validation";
import express from "express";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
router.post(
  "/change-password",
  auth(ENUM_USER_ROLE.USER),
  validateRequest(AuthValidation.ChangePasswordZodSchema),
  AuthController.changePassword
);
export const AuthRoutes = router;
