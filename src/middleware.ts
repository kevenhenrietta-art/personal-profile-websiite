import { NextRequest, NextResponse } from "next/server";

const MAX_BASIC_TOKEN_LENGTH = 8 * 1024;

function parseBooleanEnv(value: string | undefined): boolean | undefined {
  if (value == null) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "1" || normalized === "true") return true;
  if (normalized === "0" || normalized === "false") return false;
  return undefined;
}

function isAuthEnabled(): boolean {
  const explicit = parseBooleanEnv(process.env.BASIC_AUTH_ENABLED);
  if (explicit === false) return false;
  if (explicit === true) return true;
  return process.env.NODE_ENV === "production";
}

function unauthorizedResponse(): NextResponse {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

function isAuthorized(req: NextRequest): boolean {
  const header = req.headers.get("authorization") ?? "";
  if (header.length > 16 * 1024) return false;

  const prefix = "basic ";
  if (header.length < prefix.length) return false;
  if (header.slice(0, prefix.length).toLowerCase() !== prefix) return false;
  const encoded = header.slice(prefix.length).trim();
  if (!encoded || encoded.includes(" ")) return false;
  if (encoded.length > MAX_BASIC_TOKEN_LENGTH) return false;

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return false;
  }

  const colonIndex = decoded.indexOf(":");
  if (colonIndex < 0) return false;

  const user = decoded.slice(0, colonIndex);
  const pass = decoded.slice(colonIndex + 1);

  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASS;
  if (expectedUser == null || expectedPass == null) return false;

  return user === expectedUser && pass === expectedPass;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/_next/") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  if (!isAuthEnabled()) {
    return NextResponse.next();
  }

  if (isAuthorized(req)) {
    return NextResponse.next();
  }

  return unauthorizedResponse();
}

export const config = {
  matcher: ["/:path*"],
};

