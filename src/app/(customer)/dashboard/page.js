import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Container from "@/components/ui/Container";

export const metadata = { title: "My Dashboard" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Defense in depth: middleware already blocks this route for anonymous
  // visitors, but the page checks again independently.
  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold text-base-content">Welcome, {session.user.name}</h1>
      <p className="mt-1 text-sm text-base-content/60">
        Signed in as <span className="font-medium">{session.user.email}</span> ·{" "}
        <span className="badge badge-outline badge-sm capitalize">{session.user.role}</span>
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card border border-base-300 bg-base-100 p-6">
          <h2 className="font-semibold text-base-content">My Orders</h2>
          <p className="mt-1 text-sm text-base-content/60">
            Order history will appear here once the Orders module is built.
          </p>
        </div>
        <div className="card border border-base-300 bg-base-100 p-6">
          <h2 className="font-semibold text-base-content">Account Details</h2>
          <p className="mt-1 text-sm text-base-content/60">
            Profile editing is coming in a later module.
          </p>
        </div>
      </div>
    </Container>
  );
}