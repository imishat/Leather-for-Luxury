"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const users_1 = require("../../../enums/users");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Auth_controller_1 = require("./Auth.controller");
const Auth_validation_1 = require("./Auth.validation");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/login", (0, validateRequest_1.default)(Auth_validation_1.AuthValidation.loginZodSchema), Auth_controller_1.AuthController.loginUser);
router.post("/refresh-token", (0, validateRequest_1.default)(Auth_validation_1.AuthValidation.refreshTokenZodSchema), Auth_controller_1.AuthController.refreshToken);
router.post("/change-password", (0, auth_1.default)(users_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(Auth_validation_1.AuthValidation.ChangePasswordZodSchema), Auth_controller_1.AuthController.changePassword);
exports.AuthRoutes = router;
