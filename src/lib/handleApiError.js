import { apiError } from "@/lib/apiResponse";

/**
 * Converts common Mongoose/MongoDB exceptions into consistent API error
 * responses. Centralized here so every CRUD route (categories, products,
 * and future modules like orders) handles the same error shapes the same
 * way, instead of re-implementing this switch in every route file.
 */
export function apiErrorFromException(error, fallbackMessage = "Something went wrong") {
  // Mongoose schema validation error (required/min/max/enum failures that
  // slipped past Zod, or were triggered by runValidators on update)
  if (error.name === "ValidationError") {
    const firstField = Object.values(error.errors)[0];
    return apiError(firstField?.message || "Validation failed", 400);
  }

  // Invalid ObjectId passed in a route param (e.g. /api/products/not-an-id)
  if (error.name === "CastError") {
    return apiError(`Invalid ${error.path}`, 400);
  }

  // Duplicate key — unique index violation (e.g. slug or name already exists)
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || "field";
    return apiError(`This ${field} is already in use`, 409);
  }

  console.error("[api] Unhandled error:", error.message);
  return apiError(fallbackMessage, 500);
}