"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FiUser, FiLogOut, FiGrid } from "react-icons/fi";

/**
 * Role-aware account menu, rendered inside the Navbar.
 * - Logged out: Login / Register links
 * - Logged in: dropdown with dashboard link (routed by role) + logout
 */
export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span
        className="loading loading-spinner loading-sm text-base-content/50"
        aria-label="Loading session"
      />
    );
  }

  if (!session) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link href="/login" className="btn btn-ghost btn-sm">
          Login
        </Link>
        <Link href="/register" className="btn btn-primary btn-sm">
          Register
        </Link>
      </div>
    );
  }

  const dashboardHref =
    session.user.role === "admin"
      ? "/admin"
      : session.user.role === "moderator"
        ? "/moderator"
        : "/dashboard";

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        aria-label="Account menu"
      >
        <FiUser className="h-5 w-5" />
      </button>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <li className="menu-title flex-row items-center justify-between px-2">
          <span className="truncate">{session.user.name}</span>
          <span className="badge badge-outline badge-sm capitalize">{session.user.role}</span>
        </li>
        <li>
          <Link href={dashboardHref}>
            <FiGrid className="h-4 w-4" /> Dashboard
          </Link>
        </li>
        <li>
          <button type="button" onClick={() => signOut({ callbackUrl: "/" })}>
            <FiLogOut className="h-4 w-4" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}