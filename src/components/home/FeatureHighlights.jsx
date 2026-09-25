import { FiBox, FiShield, FiTruck, FiHeadphones } from "react-icons/fi";
import Container from "@/components/ui/Container";

const FEATURES = [
  {
    icon: FiBox,
    title: "Real-Time Stock",
    description: "Accurate inventory counts so you never order what's unavailable.",
  },
  {
    icon: FiTruck,
    title: "Reliable Fulfillment",
    description: "Nationwide delivery with order tracking from dispatch to doorstep.",
  },
  {
    icon: FiShield,
    title: "Verified Suppliers",
    description: "Every listed product is vetted for quality and specification accuracy.",
  },
  {
    icon: FiHeadphones,
    title: "Dedicated Support",
    description: "A procurement team ready to help with bulk orders and quotes.",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="border-b border-base-300 bg-base-100 py-14">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-box bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-base-content">{title}</h3>
              <p className="text-sm text-base-content/70">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}