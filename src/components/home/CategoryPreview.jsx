import Container from "@/components/ui/Container";

// Static placeholder data — replaced with real categories from MongoDB
// once the Category Management module (Module 4) is built.
const PLACEHOLDER_CATEGORIES = [
  "Organic Foods",
  "Power Tools",
  "Safety Equipment",
  "Fasteners & Hardware",
  "Electrical Supplies",
  "Machinery Parts",
  "Welding Equipment",
];

export default function CategoryPreview() {
  return (
    <section className="py-14">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-base-content">Shop by Category</h2>
            <p className="mt-1 text-sm text-base-content/60">
              Browse our core industrial categories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PLACEHOLDER_CATEGORIES.map((name) => (
            <div
              key={name}
              className="card border border-base-300 bg-base-100 transition-shadow hover:shadow-md"
            >
              <div className="card-body items-center p-4 text-center">
                <div className="h-12 w-12 rounded-full bg-base-300" />
                <p className="mt-2 text-sm font-medium text-base-content">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}