import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Container from "@/components/ui/Container";
import { STAFF_ROLES } from "@/constants/roles";

export const metadata = { title: "Moderator Dashboard" };

export default async function ModeratorPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/moderator");
  }
  if (!STAFF_ROLES.includes(session.user.role)) {
    redirect("/unauthorized");
  }

  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold text-base-content">Moderator Dashboard</h1>
      <p className="mt-1 text-sm text-base-content/60">
        Signed in as {session.user.name} — product &amp; permitted order management access.
      </p>
      <div className="mt-8 rounded-box border border-base-300 bg-base-100 p-6 text-sm text-base-content/70">
        Product and order management panels will be added in later modules. User and
        admin-settings management are intentionally not available here.
      </div>
    </Container>
  );
}