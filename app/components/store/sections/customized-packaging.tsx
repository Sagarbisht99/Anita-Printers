import { getCustomPackagingItems } from "@/app/lib/store/custom-packaging";
import { CustomizedPackagingGrid } from "./customized-packaging-grid";

export async function CustomizedPackaging() {
  const items = await getCustomPackagingItems();
  if (items.length === 0) return null;

  return <CustomizedPackagingGrid items={items} />;
}
