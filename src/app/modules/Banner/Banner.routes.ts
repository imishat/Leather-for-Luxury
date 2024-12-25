import express from "express";
import { BannerController } from "./Banner.controller";

const router = express.Router();

router.post(
  "/create-videoBanner",

  BannerController.createVideo
);
router.post(
  "/create-TopBanner",

  BannerController.createTopBanner
);

router.get("/Video-Banner/:id", BannerController.getSingleVideoBannerById);
router.get("/Top-Banner/:id", BannerController.getSingleTopBannerById);
router.patch(
  "/Update-Video-Banner/:id",

  BannerController.updateVideoBannerById
);
router.patch(
  "/Update-Top-Banner/:id",

  BannerController.updateTopBannerById
);

router.get("/all-TopBanner", BannerController.getAllTopBanner);
router.get("/all-VideoBanner", BannerController.getAllVideoBanner);

export const BannerRoutes = router;
