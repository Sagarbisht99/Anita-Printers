"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { assertSuperAdmin, isUnauthorizedError } from "@/app/lib/admin/guard";
import { prisma } from "@/app/lib/db";

export type ActionState = {
  ok?: boolean;
  error?: string;
};

export type OfferBannerSettings = {
  enabled: boolean;
  imageUrl: string | null;
};

const SITE_ID = "site";

async function ensureSiteSetting() {
  return prisma.siteSetting.upsert({
    where: { id: SITE_ID },
    create: {
      id: SITE_ID,
      offerPopupEnabled: false,
      offerPopupImage: null,
    },
    update: {},
  });
}

/** Public — used by storefront offer popup */
export async function getOfferBannerSettings(): Promise<OfferBannerSettings> {
  const row = await prisma.siteSetting.findUnique({ where: { id: SITE_ID } });
  return {
    enabled: Boolean(row?.offerPopupEnabled && row.offerPopupImage),
    imageUrl: row?.offerPopupImage ?? null,
  };
}

export async function fetchAdminOfferBanner(): Promise<OfferBannerSettings> {
  await assertSuperAdmin();
  const row = await ensureSiteSetting();
  return {
    enabled: row.offerPopupEnabled,
    imageUrl: row.offerPopupImage,
  };
}

const updateSchema = z.object({
  enabled: z.boolean(),
  imageUrl: z.string().url().nullable().or(z.literal("")),
});

export async function updateOfferBannerSettings(input: {
  enabled: boolean;
  imageUrl: string | null;
}): Promise<ActionState> {
  try {
    await assertSuperAdmin();

    const parsed = updateSchema.safeParse({
      enabled: input.enabled,
      imageUrl: input.imageUrl ?? "",
    });

    if (!parsed.success) {
      return { error: "Invalid banner settings." };
    }

    const imageUrl =
      !parsed.data.imageUrl || parsed.data.imageUrl === ""
        ? null
        : parsed.data.imageUrl;

    if (parsed.data.enabled && !imageUrl) {
      return { error: "Upload a banner image before enabling the popup." };
    }

    await prisma.siteSetting.upsert({
      where: { id: SITE_ID },
      create: {
        id: SITE_ID,
        offerPopupEnabled: parsed.data.enabled,
        offerPopupImage: imageUrl,
      },
      update: {
        offerPopupEnabled: parsed.data.enabled,
        offerPopupImage: imageUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/offer-banner");
    return { ok: true };
  } catch (error) {
    if (isUnauthorizedError(error)) {
      return { error: "Unauthorized" };
    }
    console.error("[offer-banner] update failed:", error);
    return { error: "Could not save offer banner settings." };
  }
}
