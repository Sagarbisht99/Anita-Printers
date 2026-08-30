import {
  faqPageJsonLd,
  localBusinessJsonLd,
  webSiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { JsonLdScript } from "./json-ld-script";

export function StoreJsonLd() {
  return (
    <>
      <JsonLdScript data={localBusinessJsonLd()} />
      <JsonLdScript data={webSiteJsonLd()} />
    </>
  );
}

export function HomeJsonLd() {
  return <JsonLdScript data={faqPageJsonLd()} />;
}
