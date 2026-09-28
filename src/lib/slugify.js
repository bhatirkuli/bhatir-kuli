/**
 * Converts a string into a URL-safe slug.
 * "5 HP Water Pump (Steel)" -> "5-hp-water-pump-steel"
 */
export function slugify(text = "") {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}