import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { requireRole } from "@/lib/apiAuth";
import { apiSuccess, apiError } from "@/lib/apiResponse";
import { apiErrorFromException } from "@/lib/handleApiError";
import { updateCategorySchema } from "@/lib/validators/categoryValidators";
import { STAFF_ROLES } from "@/constants/roles";

/**
 * GET /api/categories/:id — public.
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const category = await Category.findById(id);
    if (!category) return apiError("Category not found", 404);

    return apiSuccess(category);
  } catch (error) {
    return apiErrorFromException(error, "Failed to fetch category");
  }
}

/**
 * PATCH /api/categories/:id — Admin + Moderator.
 */
export async function PATCH(request, { params }) {
  const auth = await requireRole(STAFF_ROLES);
  if (!auth.authorized) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = updateCategorySchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message || "Invalid input", 400);
    }

    await connectDB();
    const category = await Category.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    if (!category) return apiError("Category not found", 404);

    return apiSuccess(category, "Category updated successfully");
  } catch (error) {
    return apiErrorFromException(error, "Failed to update category");
  }
}

/**
 * DELETE /api/categories/:id — Admin + Moderator.
 * Refuses to delete a category that still has products assigned to it,
 * to avoid leaving products with a dangling category reference.
 */
export async function DELETE(request, { params }) {
  const auth = await requireRole(STAFF_ROLES);
  if (!auth.authorized) return auth.response;

  try {
    const { id } = await params;
    await connectDB();

    const productCount = await Product.countDocuments({ category: id });
    if (productCount > 0) {
      return apiError(
        `Cannot delete: ${productCount} product(s) still belong to this category`,
        409
      );
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) return apiError("Category not found", 404);

    return apiSuccess(null, "Category deleted successfully");
  } catch (error) {
    return apiErrorFromException(error, "Failed to delete category");
  }
}