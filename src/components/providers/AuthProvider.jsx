"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Wraps the app so useSession() works in any client component.
 * Must be a client component itself — SessionProvider uses React context.
 */
export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}