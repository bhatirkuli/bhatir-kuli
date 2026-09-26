import { requireRole } from "@/lib/apiAuth";
import { apiSuccess } from "@/lib/apiResponse";
import { ROLES } from "@/constants/roles";

/**
 * GET /api/admin/ping
 * Infra/test route for Module 3 — proves server-level RBAC works for
 * admin-only access. Not a business feature.
 */
export async function GET() {
  const auth = await requireRole([ROLES.ADMIN]);
  if (!auth.authorized) return auth.response;

  return apiSuccess(
    { role: auth.user.role },
    `Hello Admin ${auth.user.name} — you have full access.`
  );
}