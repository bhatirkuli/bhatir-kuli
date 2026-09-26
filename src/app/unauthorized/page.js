import Link from "next/link";
import Container from "@/components/ui/Container";

export const metadata = { title: "Access Denied" };

export default function UnauthorizedPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
      <span className="badge badge-error badge-outline mb-4">403</span>
      <h1 className="text-2xl font-bold text-base-content">Access Denied</h1>
      <p className="mt-2 max-w-md text-sm text-base-content/60">
        You don&apos;t have permission to view this page. If you believe this is a
        mistake, contact an administrator.
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </Container>
  );
}