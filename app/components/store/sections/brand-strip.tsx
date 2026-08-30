import { getPartnerBrands } from "@/app/lib/store/partner-brands";
import { BrandStripSlider } from "./brand-strip-slider";

export async function BrandStrip() {
  const partnerBrands = await getPartnerBrands();

  return <BrandStripSlider brands={partnerBrands} />;
}
