"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("./User.controller");
const router = express_1.default.Router();
router.post("/create-user", User_controller_1.USerController.createUser);
router.patch("/updateUSerProfile/:id", User_controller_1.USerController.updateUSerProfile);
exports.USerRoutes = router;
