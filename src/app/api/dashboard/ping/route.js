import { requireRole } from "@/lib/apiAuth";
import { apiSuccess } from "@/lib/apiResponse";
import { ALL_ROLES } from "@/constants/roles";

/**
 * GET /api/dashboard/ping
 * Infra/test route for Module 3 — proves any authenticated user (any role)
 * can reach customer-level routes, and unauthenticated requests cannot.
 */
export async function GET() {
  const auth = await requireRole(ALL_ROLES);
  if (!auth.authorized) return auth.response;

  return apiSuccess(
    { role: auth.user.role },
    `Hello ${auth.user.name} — you're signed in.`
  );
}