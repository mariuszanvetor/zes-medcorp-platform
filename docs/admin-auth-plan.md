# Admin Authentication Plan

## Current State

`/admin/leads` is an internal prototype only.

Current behavior:

- No real authentication
- No user accounts
- No database
- No real lead storage
- No CRM or email activation
- Demo/mock data only
- `robots: noindex, nofollow` in route metadata
- Not included in the sitemap
- Not linked from public navigation

The admin dashboard must not be used with real client data until authentication, authorization, storage and privacy controls are implemented.

## Why Admin Must Remain Noindex

Admin pages are operational surfaces, not public content.

They should remain:

- `noindex`
- `nofollow`
- absent from sitemap
- absent from public navigation
- protected by authentication before real data exists

When real auth is added, noindex should remain as a defense-in-depth measure.

## Future Authentication Options

Possible providers prepared in `src/lib/auth-config.ts`:

- NextAuth / Auth.js
- Clerk
- Supabase Auth
- Custom auth / SSO

No provider is installed or connected yet.

## Recommended First Implementation

Recommended first secure path:

1. Choose one auth provider
2. Add route protection for `/admin/:path*`
3. Add role mapping for internal users
4. Add server-side permission checks for data access
5. Add audit logging for lead views and edits
6. Only then connect real lead storage

For a Next.js deployment, Auth.js or Clerk are practical first options. If Supabase is selected for lead storage, Supabase Auth can be considered, but row-level security and server-side authorization still need review.

## Required Environment Variables Later

Generic:

```bash
AUTH_PROVIDER=
AUTH_SECRET=
ADMIN_EMAILS=
```

Auth.js / NextAuth:

```bash
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

Clerk:

```bash
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

Do not commit real values. Use deployment environment variables and local `.env.local`.

## Role And Permission Model

Prepared in `src/lib/auth-model.ts`.

Roles:

- `owner`
- `admin`
- `sales`
- `technical`
- `service`
- `viewer`

Permissions:

- `viewLeads`
- `updateLeadStatus`
- `addLeadNotes`
- `exportLeads`
- `viewAnalytics`
- `manageContent`
- `manageSettings`

Helper functions:

- `getDefaultPermissionsForRole(role)`
- `canRole(role, permission)`

These are static planning helpers. They do not enforce access yet.

## Future Middleware Notes

A future middleware or route handler should:

- Match `/admin/:path*`
- Check active session
- Redirect unauthenticated users to login
- Validate user role
- Deny unauthorized roles
- Keep all lead data server-side
- Avoid exposing PII to analytics or client logs

Example future matcher:

```ts
export const config = {
  matcher: ["/admin/:path*"],
};
```

Do not add middleware until a real auth provider is selected.

## Security Notes

Before real admin usage:

- Require authentication
- Require role-based authorization
- Add audit logs
- Add session timeout
- Use HTTPS
- Protect server-side environment variables
- Avoid logging full lead payloads
- Avoid exporting personal data without access control
- Keep admin routes out of sitemap and public nav

## Privacy Notes

Lead data can include names, email addresses, phone numbers, company names and project context.

Rules:

- Do not send PII to analytics
- Do not collect patient data
- Do not expose emails/phones publicly
- Add data retention policy before real storage
- Add deletion/export process before real production use
- Limit access to authorized staff only

## Deployment Notes

Before enabling auth in production:

1. Configure provider env variables in hosting UI
2. Confirm `/admin/leads` redirects when logged out
3. Confirm allowed users can access admin
4. Confirm unauthorized users are denied
5. Confirm no admin route appears in sitemap
6. Confirm metadata remains `noindex, nofollow`
7. Confirm lead storage remains disabled until auth is verified

## Current Safe Boundary

The current implementation is only a shell:

- `AdminShell` provides admin layout and security notices
- `AdminAccessNotice` explains demo/no-auth/no-storage status
- `auth-model` defines roles and permissions
- `auth-config` documents future provider choices

No real access control is active yet.
