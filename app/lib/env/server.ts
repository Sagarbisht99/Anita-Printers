import "server-only";

function trim(value: string | undefined): string | undefined {
  const next = value?.trim().replace(/^["']|["']$/g, "");
  return next || undefined;
}

/** Server-only secrets — never import from client components. */
export const serverEnv = {
  databaseUrl: trim(process.env.DATABASE_URL),
  sessionSecret: trim(process.env.SESSION_SECRET),
  adminUsername: trim(process.env.ADMIN_USERNAME),
  adminPassword: trim(process.env.ADMIN_PASSWORD),
  imagekitPrivateKey: trim(process.env.IMAGEKIT_PRIVATE_KEY),
  resendApiKey: trim(process.env.RESEND_API_KEY),
  resendFromEmail: trim(process.env.RESEND_FROM_EMAIL),
  adminEmail: trim(process.env.ADMIN_EMAIL),
  googleSiteVerification: trim(process.env.GOOGLE_SITE_VERIFICATION),
} as const;
