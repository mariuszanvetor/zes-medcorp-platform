# Admin Authentication Plan

## Current State

`/admin/leads` and `/admin/lead-flow` are internal admin prototypes only.

Current behavior:

- Optional simple password gate controlled by environment variables
- No full user authentication
- No user accounts
- No database
- No real lead storage
- No CRM control from admin; lead email and Sheets modes are controlled separately by server-side environment variables
- Demo/mock data only
- `robots: noindex, nofollow` in route metadata
- Not included in the sitemap
- Not linked from public navigation

The admin dashboard must not be used with real client data until authentication, authorization, storage and privacy controls are implemented.

## Current Simple Password Protection

The platform now includes a lightweight password gate for `/admin/leads` and `/admin/lead-flow`.

Environment variables:

```bash
ADMIN_ACCESS_ENABLED=false
ADMIN_ACCESS_PASSWORD=
ADMIN_ACCESS_TTL_SECONDS=28800
```

Behavior:

- If `ADMIN_ACCESS_ENABLED` is not `true`, admin routes remain in demo-open mode with warning banners.
- If `ADMIN_ACCESS_ENABLED=true`, admin pages require a password before rendering internal tools.
- Password validation happens through `/api/admin/verify-access`.
- The admin password is compared server-side against `ADMIN_ACCESS_PASSWORD`.
- The password is never returned to the browser and should never be logged.
- A successful login sets a temporary HTTP-only cookie scoped to `/admin`.
- `ADMIN_ACCESS_TTL_SECONDS` controls the cookie lifetime. Default is 8 hours and accepted values are between 5 minutes and 24 hours.
- Failed attempts are lightly rate-limited in memory.

Vercel setup:

1. Add `ADMIN_ACCESS_ENABLED=true`.
2. Add a strong `ADMIN_ACCESS_PASSWORD`.
3. Redeploy.
4. Open `/admin/leads` or `/admin/lead-flow`.
5. Confirm the password screen appears.
6. Confirm a wrong password fails.
7. Confirm the correct password unlocks the page.
8. Confirm admin routes remain noindex and absent from sitemap.

Limitations:

- This is a first protection layer, not full enterprise authentication.
- There are no individual users, roles, audit logs, password rotation workflow or session management UI.
- The in-memory rate limit is best-effort and may reset between serverless instances.
- Real stored leads should not be shown in admin until full authentication and authorization are implemented.

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

The current implementation is a temporary protection layer and planning shell:

- `AdminShell` provides admin layout and security notices
- `AdminAccessNotice` explains demo/no-auth/no-storage status
- `AdminAccessGate` blocks admin content when `ADMIN_ACCESS_ENABLED=true`
- `/api/admin/verify-access` validates the password server-side and sets a temporary HTTP-only cookie
- `auth-model` defines roles and permissions
- `auth-config` documents future provider choices

This is not a replacement for full authentication, role-based authorization or audit logs.
