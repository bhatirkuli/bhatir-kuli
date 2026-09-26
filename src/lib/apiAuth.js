import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiError } from "@/lib/apiResponse";

/**
 * Returns the currently signed-in user (from the session), or null.
 * Safe to call from any Route Handler or Server Component.
 */
export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}

/**
 * Authorization guard for API Route Handlers.
 *
 * This is the authoritative server-side check — middleware also blocks
 * unauthorized requests before they reach a route, but every sensitive
 * route handler calls this too, so authorization never depends solely on
 * middleware being correctly configured for a given path.
 *
 * Usage:
 *   const auth = await requireRole([ROLES.ADMIN]);
 *   if (!auth.authorized) return auth.response;
 *   // auth.user is now available and guaranteed to have an allowed role
 *
 * @param {string[]} allowedRoles - roles permitted to proceed; empty array means "any authenticated user"
 */
export async function requireRole(allowedRoles = []) {
  const user = await getSessionUser();

  if (!user) {
    return {
      authorized: false,
      response: apiError("Authentication required", 401),
    };
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return {
      authorized: false,
      response: apiError("You do not have permission to perform this action", 403),
    };
  }

  return { authorized: true, user };
}