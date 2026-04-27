# Basic Auth Password Protection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add simple password protection so only interviewers who know the password can access the deployed site.

**Architecture:** Use Next.js 14 `middleware.ts` to enforce HTTP Basic Auth for most requests, with explicit exceptions for `/_next/*` and a few public assets. Secrets come from environment variables and are never committed.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Vercel env vars

---

## File structure changes

**Create**
- `middleware.ts` — Basic Auth enforcement
- `.env.local.example` — local env var template (safe to commit)

**Modify**
- (None required)

---

### Task 1: Add `middleware.ts` for Basic Auth

**Files:**
- Create: `middleware.ts`

- [ ] **Step 1: Create `middleware.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

function isAuthEnabled(req: NextRequest) {
  const flag = process.env.BASIC_AUTH_ENABLED;
  if (flag === "false" || flag === "0") return false;
  // Default: enabled in production, disabled in dev unless explicitly enabled
  if (process.env.NODE_ENV !== "production") return flag === "true" || flag === "1";
  return true;
}

function isPublicPath(pathname: string) {
  if (pathname.startsWith("/_next/")) return true;
  if (pathname === "/favicon.ico") return true;
  return false;
}

export function middleware(req: NextRequest) {
  if (!isAuthEnabled(req)) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (isPublicPath(pathname)) return NextResponse.next();

  const user = process.env.BASIC_AUTH_USER ?? "";
  const pass = process.env.BASIC_AUTH_PASS ?? "";
  if (!user || !pass) return unauthorized();

  const header = req.headers.get("authorization") || "";
  const [scheme, encoded] = header.split(" ");
  if (scheme !== "Basic" || !encoded) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(encoded);
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(":");
  const inputUser = sep >= 0 ? decoded.slice(0, sep) : "";
  const inputPass = sep >= 0 ? decoded.slice(sep + 1) : "";

  if (inputUser !== user || inputPass !== pass) return unauthorized();

  return NextResponse.next();
}

export const config = {
  // Run for all paths; we still whitelist /_next and favicon above.
  matcher: ["/:path*"],
};
```

- [ ] **Step 2: Run typecheck/lint**

Run:
- `npm run lint`

Expected:
- no new lint errors

- [ ] **Step 3: Manual local verification (dev mode does NOT block by default)**

Run:
- `npm run dev`

Expected:
- site loads without auth prompt

- [ ] **Step 4: Manual local verification (force enable in dev)**

Create a local file `.env.local` (do not commit) with:

```bash
BASIC_AUTH_ENABLED=true
BASIC_AUTH_USER=interviewer
BASIC_AUTH_PASS=yourpassword
```

Restart dev server, then open `http://localhost:3000`.

Expected:
- browser prompts for credentials
- wrong credentials keep prompting / 401
- correct credentials loads the site

- [ ] **Step 5: Commit**

```bash
git add middleware.ts
git commit -m "$(cat <<'EOF'
feat: add Basic Auth middleware protection

EOF
)"
```

---

### Task 2: Add `.env.local.example` for safe local setup

**Files:**
- Create: `.env.local.example`

- [ ] **Step 1: Create `.env.local.example`**

```bash
# Optional: enable auth in non-production (dev)
BASIC_AUTH_ENABLED=true

# Required in production (and when enabled)
BASIC_AUTH_USER=interviewer
BASIC_AUTH_PASS=change-me
```

- [ ] **Step 2: Ensure `.env.local` is ignored**

Run:
- `git status -sb`

Expected:
- `.env.local` is not shown as untracked (Next.js default tooling typically ignores it, but repo `.gitignore` should as well)

If it appears, add to `.gitignore`:
- `.env.local`

- [ ] **Step 3: Commit**

```bash
git add .env.local.example .gitignore
git commit -m "$(cat <<'EOF'
docs: add env template for Basic Auth

EOF
)"
```

---

### Task 3: Configure Vercel env vars + verify production behavior

**Files:**
- (No repo file changes)

- [ ] **Step 1: Set env vars in Vercel Project Settings**

Set (Production, Preview as you prefer):
- `BASIC_AUTH_USER` = `interviewer` (or any username you choose)
- `BASIC_AUTH_PASS` = your shared password
- `BASIC_AUTH_ENABLED` = `true` (optional in production; leaving it unset still enables)

- [ ] **Step 2: Redeploy**

Trigger a deployment by pushing commits or using Vercel "Redeploy".

- [ ] **Step 3: Verify**

Open:
- `https://personal-profile-websiite.vercel.app/`

Expected:
- auth prompt appears
- only correct credentials allow access

---

## Self-review checklist (run after writing code)

- `/_next/*` loads correctly after auth (no broken styling/scripts)
- Env vars are not committed
- Auth is enabled in production by default

