# Password protection (Basic Auth) for interview-only access

## Goal

Protect the deployed portfolio website so **only interviewers with the password** can view it.

## Non-goals

- This is **not** strong identity security (no per-user accounts, no MFA).
- This does **not** prevent someone who knows the password from sharing screenshots/content.

## Approach (recommended)

Use **Next.js middleware** to enforce **HTTP Basic Authentication** at the edge/server for all requests.

- The browser will show a built-in username/password prompt.
- Credentials are validated in middleware against **Vercel environment variables**.
- No secrets are committed to the repo.

## Request flow

1. Request hits `middleware.ts`
2. If the path is allowed (health checks or internal Next assets), pass through
3. Otherwise, check `Authorization: Basic <base64(user:pass)>`
4. If invalid/missing, return `401` with `WWW-Authenticate: Basic realm="Protected"`
5. If valid, allow request to proceed

## Configuration

Environment variables (set in Vercel and optional local `.env.local`):

- `BASIC_AUTH_USER`
- `BASIC_AUTH_PASS`
- `BASIC_AUTH_ENABLED` (optional; `true` to enable, default enabled in production)

## Protected scope

- **All pages**
- **All API routes**
- **Static assets**

Path exceptions (not password-protected):

- `/_next/*` (Next.js build assets required for rendering)
- `/favicon.ico`

## Local development

Two supported behaviors:

- Default: do not block during `next dev` (so development is convenient)
- Optional: enable locally by setting `BASIC_AUTH_ENABLED=true`

## Deployment

1. Add env vars in Vercel Project Settings
2. Redeploy (or push to trigger)
3. Verify visiting the site triggers a login prompt

## Rollback

- Set `BASIC_AUTH_ENABLED=false` in Vercel and redeploy, or
- Remove `middleware.ts`

