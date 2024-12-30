import { Model } from "mongoose";

export type IVideoBanner = {
  url: string;
};

export type ITopBanner = {
  header: string;
  image: string[];
  title?: string[];
};

export type VideoBannerModel = Model<IVideoBanner, Record<string, unknown>>;
export type TopBannerModel = Model<ITopBanner, Record<string, unknown>>;
