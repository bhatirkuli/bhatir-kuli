import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { requireRole } from "@/lib/apiAuth";
import { apiSuccess, apiError } from "@/lib/apiResponse";
import { apiErrorFromException } from "@/lib/handleApiError";
import { createCategorySchema } from "@/lib/validators/categoryValidators";
import { STAFF_ROLES } from "@/constants/roles";

/**
 * GET /api/categories
 * Public — anyone browsing the storefront needs to see the category list.
 */
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 });
    return apiSuccess(categories, "Categories fetched successfully");
  } catch (error) {
    return apiErrorFromException(error, "Failed to fetch categories");
  }
}

/**
 * POST /api/categories
 * Admin + Moderator — category management is part of catalog management,
 * which the permission spec grants to both roles. User/admin/settings
 * management (admin-only) are unaffected by this.
 */
export async function POST(request) {
  const auth = await requireRole(STAFF_ROLES);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const parsed = createCategorySchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message || "Invalid input", 400);
    }

    await connectDB();
    const category = await Category.create(parsed.data);

    return apiSuccess(category, "Category created successfully", 201);
  } catch (error) {
    return apiErrorFromException(error, "Failed to create category");
  }
}