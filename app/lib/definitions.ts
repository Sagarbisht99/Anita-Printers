export type AdminRole = "super_admin";

export type SessionPayload = {
  userId: string;
  username: string;
  role: AdminRole;
  /** SHA-256 of env password — rotates when ADMIN_PASSWORD changes. */
  credentialStamp: string;
  expiresAt: string;
};

export type LoginFormState =
  | {
      error?: string;
    }
  | undefined;
