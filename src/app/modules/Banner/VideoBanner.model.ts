import mongoose, { Schema } from "mongoose";
import {
  ITopBanner,
  IVideoBanner,
  TopBannerModel,
  VideoBannerModel,
} from "./Banner.interface";

const VideoBannerSchema = new Schema<IVideoBanner>({
  url: { type: String, required: true },
});

export const VideoBanner = mongoose.model<IVideoBanner, VideoBannerModel>(
  "VideoBanner",
  VideoBannerSchema
);

const TopBannerSchema = new Schema<ITopBanner>({
  header: { type: String, required: true },
  image: { type: [String], required: true },
});
export const TopBanner = mongoose.model<ITopBanner, TopBannerModel>(
  "TopBanner",
  TopBannerSchema
);
