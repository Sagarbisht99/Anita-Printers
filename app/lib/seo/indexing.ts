import type { Metadata } from "next";

const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

/** Keep page-level robots tags aligned with the global robots.txt block. */
export function resolvePageRobots(): Metadata["robots"] {
  return noIndexRobots;
}
