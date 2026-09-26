import { requireRole } from "@/lib/apiAuth";
import { apiSuccess } from "@/lib/apiResponse";
import { STAFF_ROLES } from "@/constants/roles";

/**
 * GET /api/moderator/ping
 * Infra/test route for Module 3 — proves server-level RBAC works for
 * staff (admin + moderator) access. Not a business feature.
 */
export async function GET() {
  const auth = await requireRole(STAFF_ROLES);
  if (!auth.authorized) return auth.response;

  return apiSuccess(
    { role: auth.user.role },
    `Hello ${auth.user.name} — you have moderator-level access.`
  );
}