import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category id");

const specificationSchema = z.object({
  key: z.string().trim().min(1, "Specification key is required").max(100),
  value: z.string().trim().min(1, "Specification value is required").max(300),
});

const imageSchema = z.object({
  url: z.string().trim().min(1, "Image URL is required"),
  publicId: z.string().trim().optional(),
  alt: z.string().trim().max(150).optional(),
});

export const createProductSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(200),
  category: objectIdSchema,
  description: z.string().trim().max(5000).optional().default(""),
  // Flexible key-value pairs, e.g. [{ key: "Power", value: "5 HP" }, ...]
  specifications: z.array(specificationSchema).optional().default([]),
  price: z.number().nonnegative("Price cannot be negative"),
  stock: z.number().int("Stock must be a whole number").nonnegative("Stock cannot be negative"),
  images: z.array(imageSchema).optional().default([]),
});

// Same shape, every field optional — used by PATCH.
export const updateProductSchema = createProductSchema.partial();