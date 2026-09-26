import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { registerSchema } from "@/lib/validators/authValidators";
import { apiSuccess, apiError } from "@/lib/apiResponse";
import { ROLES } from "@/constants/roles";

/**
 * POST /api/auth/register
 *
 * Public self-registration. SECURITY: role is never read from the request
 * body — every account created here is hard-coded to "customer". There is
 * no public path to becoming an admin or moderator; those accounts are
 * created via scripts/seedAdmin.mjs (bootstrap) or, in a later module, by
 * an existing admin through the admin panel.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return apiError(firstIssue?.message || "Invalid input", 400);
    }

    const { name, email, password } = parsed.data;

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return apiError("An account with this email already exists", 409);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: ROLES.CUSTOMER,
    });

    return apiSuccess(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      "Account created successfully",
      201
    );
  } catch (error) {
    console.error("[api/auth/register] error:", error.message);
    return apiError("Failed to create account", 500);
  }
}