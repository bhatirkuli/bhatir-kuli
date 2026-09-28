import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().trim().max(1000).optional().default(""),
  image: z
    .object({
      url: z.string().trim().min(1, "Image URL is required"),
      publicId: z.string().trim().optional(),
    })
    .optional(),
});

// Same shape, every field optional — used by PATCH.
export const updateCategorySchema = createCategorySchema.partial();