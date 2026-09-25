import Link from "next/link";
import Image from "next/image";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Container from "@/components/ui/Container";
import { FOOTER_LINKS, SITE_DESCRIPTION, SITE_NAME } from "@/constants/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-base-300 bg-base-200">
      <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-3 flex items-center gap-2">
            <Image
              src="/logo.png"
              alt={`${SITE_NAME} logo`}
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-base font-bold">{SITE_NAME}</span>
          </div>
          <p className="text-sm text-base-content/70">{SITE_DESCRIPTION}</p>
        </div>

        {/* Company */}
        <FooterColumn title="Company" links={FOOTER_LINKS.company} />

        {/* Shop */}
        <FooterColumn title="Shop" links={FOOTER_LINKS.shop} />

        {/* Contact */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/60">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-base-content/70">
            <li className="flex items-center gap-2">
              <FiMapPin className="shrink-0" /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="shrink-0" /> +880 1XXX-XXXXXX
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="shrink-0" /> support@bhatirkuli.com
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-base-300">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-base-content/60 sm:flex-row">
          <p>© {year} {SITE_NAME}. All rights reserved.</p>
          <p>Built for industrial &amp; B2B supply.</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/60">
        {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-base-content/70 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}