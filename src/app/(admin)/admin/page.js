import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Container from "@/components/ui/Container";
import { ROLES } from "@/constants/roles";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }
  if (session.user.role !== ROLES.ADMIN) {
    redirect("/unauthorized");
  }

  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold text-base-content">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-base-content/60">
        Signed in as {session.user.name} — full administrative access.
      </p>
      <div className="mt-8 rounded-box border border-base-300 bg-base-100 p-6 text-sm text-base-content/70">
        Product, order, and user management panels will be added in later modules.
      </div>
    </Container>
  );
}