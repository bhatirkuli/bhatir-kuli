export const ROLES = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  CUSTOMER: "customer",
};

export const ALL_ROLES = Object.values(ROLES);

// Convenience groupings used by middleware/API guards
export const STAFF_ROLES = [ROLES.ADMIN, ROLES.MODERATOR];