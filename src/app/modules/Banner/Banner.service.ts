import mongoose from "mongoose";
import { ITopBanner, IVideoBanner } from "./Banner.interface";
import { TopBanner, VideoBanner } from "./VideoBanner.model";

const createVideoBanner = async (
  payload: IVideoBanner
): Promise<IVideoBanner | null> => {
  const result = await VideoBanner.create(payload);

  return result;
};
const createTopBanner = async (
  payload: ITopBanner
): Promise<ITopBanner | null> => {
  const result = await TopBanner.create(payload);

  return result;
};

const getSingleVideoBannerById = async (id: string) => {
  const result = await VideoBanner.findById(id);
  return result;
};
const getSingleTopBannerById = async (id: string) => {
  const result = await TopBanner.findById(id);
  return result;
};

const updateVideoBannerById = async (
  id: string,
  payload: Partial<IVideoBanner>
): Promise<IVideoBanner | null> => {
  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  // Find and update the parent category
  const result = await VideoBanner.findByIdAndUpdate(id, payload, {
    new: true, // Return the updated document
    runValidators: true, // Enforce schema validations
  });

  return result;
};
const updateTopBannerById = async (
  id: string,
  payload: Partial<ITopBanner>
): Promise<ITopBanner | null> => {
  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  // Find and update the parent category
  const result = await TopBanner.findByIdAndUpdate(id, payload, {
    new: true, // Return the updated document
    runValidators: true, // Enforce schema validations
  });

  return result;
};

export const BannerService = {
  createVideoBanner,
  createTopBanner,
  getSingleVideoBannerById,
  getSingleTopBannerById,
  updateVideoBannerById,
  updateTopBannerById,
};
