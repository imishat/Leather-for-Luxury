import { IWishlist } from "./Wishlist.interface";
import { Wishlist } from "./Wishlist.model";

const createWishlist = async (
  payload: IWishlist
): Promise<IWishlist | null> => {
  const result = await Wishlist.create(payload);

  return result;
};

const getSingleUserWishlist = async (id: string) => {
  const result = await Wishlist.find({ user: id })
    .populate("product")
    .sort({ createdAt: -1 });
  return result;
};
const deleteWishlistFromDB = async (id: string) => {
  const result = await Wishlist.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};
export const WishlistService = {
  createWishlist,
  getSingleUserWishlist,
  deleteWishlistFromDB,
};
