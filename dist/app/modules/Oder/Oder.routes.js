"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Oder_controller_1 = require("./Oder.controller");
const validateRequest_1 = __importDefault(require("./../../middlewares/validateRequest"));
const Oder_validation_1 = require("./Oder.validation");
const router = express_1.default.Router();
router.post("/create-order", (0, validateRequest_1.default)(Oder_validation_1.OrderValidation.OrderZodSchema), Oder_controller_1.OderController.createOder);
router.get("/User/:id", Oder_controller_1.OderController.getOrderByUser);
router.get("/all-order", Oder_controller_1.OderController.getAll);
router.patch("/update/:id", (0, validateRequest_1.default)(Oder_validation_1.OrderValidation.UpdateOrderZodSchema), Oder_controller_1.OderController.updateOderById);
router.delete("/delete/:id", 
// auth(ENUM_USER_ROLE.ADMIN),
Oder_controller_1.OderController.deleteOrder);
exports.OderRoutes = router;
