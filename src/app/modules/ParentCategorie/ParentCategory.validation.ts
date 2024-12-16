import { z } from "zod";

const ParentCategoryZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string({
      required_error: "name is required",
    }),
    image: z.string({
      required_error: "image is required",
    }),
    slug: z.string().optional(),
  }),
});
const UpdateParentCategoryZodSchema = z.object({
  body: z.object({
    id: z.string(),
    name: z.string().optional(),
    image: z.string().optional(),
    slug: z.string().optional(),
  }),
});

export const ParentCategoryValidation = {
  ParentCategoryZodSchema,
  UpdateParentCategoryZodSchema,
};
