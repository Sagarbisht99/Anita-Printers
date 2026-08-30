import {
  faqPageJsonLd,
  jsonLdGraph,
  localBusinessJsonLd,
  webSiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { JsonLdScript } from "./json-ld-script";

export function StoreJsonLd() {
  return (
    <JsonLdScript
      data={jsonLdGraph(localBusinessJsonLd(), webSiteJsonLd())}
    />
  );
}

export function HomeJsonLd() {
  return <JsonLdScript data={faqPageJsonLd()} />;
}
