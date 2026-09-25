import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="bg-neutral text-neutral-content">
      <Container className="grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="badge badge-accent badge-outline mb-4">
            Trusted by 500+ businesses
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Industrial Equipment &amp; Supplies, Delivered Reliably
          </h1>
          <p className="mt-4 max-w-lg text-base text-neutral-content/80">
            Source machinery parts, tools, and bulk supplies from a catalog
            built for procurement teams — transparent stock, fast quotes, and
            dependable fulfillment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-accent">
              Browse Catalog <FiArrowRight />
            </Link>
            <Link href="/contact" className="btn btn-neutral-content">
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 h-40 rounded-box bg-base-100/10" />
            <div className="h-28 rounded-box bg-base-100/10" />
            <div className="h-28 rounded-box bg-base-100/10" />
          </div>
        </div>
      </Container>
    </section>
  );
}