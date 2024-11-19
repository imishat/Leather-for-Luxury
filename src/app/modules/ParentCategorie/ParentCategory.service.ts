import { IParentCategory } from "./ParentCategorie.interface";
import { ParentCategory } from "./ParentCategory.model";

const createParentCategory = async (
  payload: IParentCategory
): Promise<IParentCategory | null> => {
  const result = await ParentCategory.create(payload);

  // if (!createdUser) {
  //   throw new ApiError(400, "Failed to create");
  // }
  return result;
};

export const ParentCategoryService = {
  createParentCategory,
};
