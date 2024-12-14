import { IRating } from "./Rating.interface";
import { Rating } from "./Rating.model";

const createRating = async (payload: IRating): Promise<IRating | null> => {
  const result = await Rating.create(payload);

  return result;
};

const getRatingByProduct = async (id: string) => {
  const result = await Rating.find({ productId: id });
  return result;
};
export const RatingService = {
  createRating,
  getRatingByProduct,
};
