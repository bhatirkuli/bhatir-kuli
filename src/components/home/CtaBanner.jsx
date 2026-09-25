import Link from "next/link";
import Container from "@/components/ui/Container";

export default function CtaBanner() {
  return (
    <section className="bg-primary py-14 text-primary-content">
      <Container className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-2xl font-bold">Need bulk pricing for a project?</h2>
          <p className="mt-1 text-sm text-primary-content/80">
            Our team responds to procurement requests within one business day.
          </p>
        </div>
        <Link href="/contact" className="btn btn-accent shrink-0 text-black">
          Request a Quote
        </Link>
      </Container>
    </section>
  );
}