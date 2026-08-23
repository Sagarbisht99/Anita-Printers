export type AdminRole = "super_admin";

export type SessionPayload = {
  userId: string;
  username: string;
  role: AdminRole;
  sessionVersion: number;
  expiresAt: string;
};

export type LoginFormState =
  | {
      error?: string;
    }
  | undefined;
