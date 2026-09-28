import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { requireRole } from "@/lib/apiAuth";
import { apiSuccess, apiError } from "@/lib/apiResponse";
import { apiErrorFromException } from "@/lib/handleApiError";
import { createProductSchema } from "@/lib/validators/productValidators";
import { STAFF_ROLES } from "@/constants/roles";

/**
 * GET /api/products
 * Public — deliberately simple for now: only active products, newest
 * first. Search/filter/sort/pagination are a dedicated later module; this
 * one is scoped to the database layer and basic CRUD only.
 */
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ isActive: true })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    return apiSuccess(products, "Products fetched successfully");
  } catch (error) {
    return apiErrorFromException(error, "Failed to fetch products");
  }
}

/**
 * POST /api/products
 * Admin + Moderator. `createdBy` is taken from the session, never from the
 * request body, so it can't be spoofed.
 */
export async function POST(request) {
  const auth = await requireRole(STAFF_ROLES);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const parsed = createProductSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message || "Invalid input", 400);
    }

    await connectDB();

    const categoryExists = await Category.exists({ _id: parsed.data.category });
    if (!categoryExists) {
      return apiError("Selected category does not exist", 400);
    }

    const product = await Product.create({
      ...parsed.data,
      createdBy: auth.user.id,
    });

    return apiSuccess(product, "Product created successfully", 201);
  } catch (error) {
    return apiErrorFromException(error, "Failed to create product");
  }
}