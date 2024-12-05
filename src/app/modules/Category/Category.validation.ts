import { optional, z } from "zod";
import mongoose from "mongoose";

const CategoryZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string({
      required_error: "category name is required",
    }),
    description: z.string().optional(),
    parentCategoryId: z
      .string({
        required_error: "parentCategoryId is required",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid parent category ID",
      }),

    image: z.string({
      required_error: "image link  is required",
    }),
    slug: z.string().optional(),
  }),
});

const CategoryUpdateZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    parentCategoryId: z
      .string({
        required_error: "parentCategoryId is required",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid parent category ID",
      }),

    image: z.string().optional(),
    slug: z.string().optional(),
  }),
});
export const CategoryValidation = {
  CategoryZodSchema,
  CategoryUpdateZodSchema,
};
