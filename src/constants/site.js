export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Bhatir Kuli";

export const SITE_DESCRIPTION =
  "Industrial-grade tools, equipment, and supplies for businesses that build things.";

// Primary navigation — expanded in later modules once category routes exist
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Categories", href: "/categories" },
  ],
  account: [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "My Dashboard", href: "/dashboard" },
  ],
};