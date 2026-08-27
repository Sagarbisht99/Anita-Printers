"use client";

import { ImageKitProvider } from "@imagekit/next";

export function ImageKitAppProvider({
  children,
  urlEndpoint,
}: {
  children: React.ReactNode;
  urlEndpoint: string;
}) {
  if (!urlEndpoint) {
    return children;
  }

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>{children}</ImageKitProvider>
  );
}
