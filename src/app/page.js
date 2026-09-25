import Hero from "@/components/home/Hero";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import CategoryPreview from "@/components/home/CategoryPreview";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureHighlights />
      <CategoryPreview />
      <CtaBanner />
    </>
  );
}