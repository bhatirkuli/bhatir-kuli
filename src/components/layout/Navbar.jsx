import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import Container from "@/components/ui/Container";
import { NAV_LINKS, SITE_NAME } from "@/constants/site";

/**
 * Site header. Cart count / auth state are static placeholders here —
 * they will be wired up in the Cart (Module 8) and Auth (Module 3) modules.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      {/* Top utility bar */}
      <div className="hidden bg-neutral text-neutral-content sm:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <span>প্রয়োজনে পাশে, সমাধানে কাছে।</span>
          <span>Need help? +880 1568177153</span>
        </Container>
      </div>

      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt={`${SITE_NAME} logo`}
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="text-lg font-bold tracking-tight text-base-content">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-base-content/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search (desktop) */}
        <div className="hidden flex-1 max-w-md md:flex">
          <label className="input input-bordered flex w-full items-center gap-2">
            <FiSearch className="text-base-content/50" />
            <input
              type="search"
              placeholder="Search products, SKUs, categories..."
              className="grow bg-transparent text-sm outline-none"
              disabled
              title="Search will be enabled in the Product Catalog module"
            />
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="btn btn-ghost btn-circle"
            aria-label="Account"
            title="Authentication coming in Module 3"
          >
            <FiUser className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-circle"
            aria-label="Cart"
            title="Cart coming in Module 8"
          >
            <div className="indicator">
              <FiShoppingCart className="h-5 w-5" />
              <span className="badge badge-primary badge-xs indicator-item">0</span>
            </div>
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-circle lg:hidden"
            aria-label="Open menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </header>
  );
}