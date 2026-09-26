import Container from "@/components/ui/Container";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-base-200 py-12">
      <Container className="flex justify-center">
        <div className="w-full max-w-md">{children}</div>
      </Container>
    </div>
  );
}