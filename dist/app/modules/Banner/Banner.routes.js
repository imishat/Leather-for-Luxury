"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Banner_controller_1 = require("./Banner.controller");
const router = express_1.default.Router();
router.post("/create-videoBanner", Banner_controller_1.BannerController.createVideo);
router.post("/create-TopBanner", Banner_controller_1.BannerController.createTopBanner);
router.get("/Video-Banner/:id", Banner_controller_1.BannerController.getSingleVideoBannerById);
router.get("/Top-Banner/:id", Banner_controller_1.BannerController.getSingleTopBannerById);
router.patch("/Update-Video-Banner/:id", Banner_controller_1.BannerController.updateVideoBannerById);
router.patch("/Update-Top-Banner/:id", Banner_controller_1.BannerController.updateTopBannerById);
router.get("/all-TopBanner", Banner_controller_1.BannerController.getAllTopBanner);
router.get("/all-VideoBanner", Banner_controller_1.BannerController.getAllVideoBanner);
exports.BannerRoutes = router;
