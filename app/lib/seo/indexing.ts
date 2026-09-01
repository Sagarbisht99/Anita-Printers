import type { Metadata } from "next";

/**
 * Global search indexing switch.
 *
 * OFF now (staging / vercel.app):  ALLOW_SEARCH_INDEXING=false
 * ON when anitaprinters.in is live: ALLOW_SEARCH_INDEXING=true
 */
export function isSearchIndexingEnabled(): boolean {
  return process.env.ALLOW_SEARCH_INDEXING === "true";
}

const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

const indexRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

/** Respects global switch + per-page noIndex (search, quote, admin products, etc.). */
export function resolvePageRobots(pageNoIndex = false): Metadata["robots"] {
  if (!isSearchIndexingEnabled() || pageNoIndex) {
    return noIndexRobots;
  }
  return indexRobots;
}
