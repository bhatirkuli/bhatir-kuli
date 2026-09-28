import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { requireRole } from "@/lib/apiAuth";
import { apiSuccess, apiError } from "@/lib/apiResponse";
import { apiErrorFromException } from "@/lib/handleApiError";
import { updateProductSchema } from "@/lib/validators/productValidators";
import { STAFF_ROLES } from "@/constants/roles";

/**
 * GET /api/products/:id — public.
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id).populate("category", "name slug");
    if (!product) return apiError("Product not found", 404);

    return apiSuccess(product);
  } catch (error) {
    return apiErrorFromException(error, "Failed to fetch product");
  }
}

/**
 * PATCH /api/products/:id — Admin + Moderator.
 */
export async function PATCH(request, { params }) {
  const auth = await requireRole(STAFF_ROLES);
  if (!auth.authorized) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = updateProductSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message || "Invalid input", 400);
    }

    await connectDB();

    if (parsed.data.category) {
      const categoryExists = await Category.exists({ _id: parsed.data.category });
      if (!categoryExists) {
        return apiError("Selected category does not exist", 400);
      }
    }

    const product = await Product.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    }).populate("category", "name slug");

    if (!product) return apiError("Product not found", 404);

    return apiSuccess(product, "Product updated successfully");
  } catch (error) {
    return apiErrorFromException(error, "Failed to update product");
  }
}

/**
 * DELETE /api/products/:id — Admin + Moderator.
 */
export async function DELETE(request, { params }) {
  const auth = await requireRole(STAFF_ROLES);
  if (!auth.authorized) return auth.response;

  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findByIdAndDelete(id);
    if (!product) return apiError("Product not found", 404);

    return apiSuccess(null, "Product deleted successfully");
  } catch (error) {
    return apiErrorFromException(error, "Failed to delete product");
  }
}