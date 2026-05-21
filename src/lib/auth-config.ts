import type { AdminRole } from "@/lib/auth-model";

export type FutureAuthProvider =
  | "none"
  | "next-auth"
  | "clerk"
  | "supabase-auth"
  | "custom";

export type FutureAuthProviderOption = {
  provider: Exclude<FutureAuthProvider, "none">;
  label: string;
  recommendedFor: string;
  requiredEnv: string[];
  notes: string;
};

export type AdminAuthConfig = {
  enabled: false;
  provider: FutureAuthProvider;
  protectedRoutes: string[];
  publicAdminRoutes: string[];
  defaultRole: AdminRole;
  allowedEmailDomains: string[];
  adminEmails: string[];
};

export const adminAuthConfig: AdminAuthConfig = {
  enabled: false,
  provider: "none",
  protectedRoutes: ["/admin/:path*"],
  publicAdminRoutes: [],
  defaultRole: "viewer",
  allowedEmailDomains: [],
  adminEmails: parseAdminEmails(process.env.ADMIN_EMAILS),
};

export const futureAuthProviders: FutureAuthProviderOption[] = [
  {
    provider: "next-auth",
    label: "NextAuth / Auth.js",
    recommendedFor: "Self-hosted or Vercel deployments that need flexible provider choice.",
    requiredEnv: ["AUTH_SECRET", "NEXTAUTH_URL", "NEXTAUTH_SECRET"],
    notes:
      "Good default when the team wants control over providers and session strategy.",
  },
  {
    provider: "clerk",
    label: "Clerk",
    recommendedFor: "Fast hosted auth, admin invitations and session UI.",
    requiredEnv: ["CLERK_SECRET_KEY", "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"],
    notes:
      "Useful for rapid rollout, but review billing, data processing and role mapping.",
  },
  {
    provider: "supabase-auth",
    label: "Supabase Auth",
    recommendedFor: "Supabase storage with auth and row-level security.",
    requiredEnv: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
    notes:
      "Pair with row-level security and server-side checks before storing leads.",
  },
  {
    provider: "custom",
    label: "Custom auth",
    recommendedFor: "Existing internal identity systems or custom SSO.",
    requiredEnv: ["AUTH_SECRET", "ADMIN_EMAILS"],
    notes:
      "Only recommended if the team has security ownership and audit requirements defined.",
  },
];

export function isAdminAuthEnabled() {
  return adminAuthConfig.enabled;
}

function parseAdminEmails(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}
