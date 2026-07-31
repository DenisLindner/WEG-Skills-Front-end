import "server-only"

import { cookies } from "next/headers"
import { UserRole } from "@/types/user/user-role"
import { Session, SessionResponse } from "@/types/auth/session"

const production = process.env.NODE_ENV === "production"

export const COOKIE_NAME = production
  ? "__Host-weg_access_token"
  : "weg_access_token"

export const cookieOptions = {
  httpOnly: true,
  secure: production,
  sameSite: "lax" as const,
  path: "/",
}

type JwtClaims = {
  sub?: unknown
  exp?: unknown
  userId?: unknown
  roles?: unknown
}

function isRole(value: unknown): value is UserRole {
  return value === "STUDENT" || value === "INSTRUCTOR" || value === "ADMIN"
}

function decodeClaims(token: string): JwtClaims | null {
  try {
    const payload = token.split(".")[1]
    if (!payload) return null
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as JwtClaims
  } catch {
    return null
  }
}

export async function getAccessToken() {
  return (await cookies()).get(COOKIE_NAME)?.value ?? null
}

export async function getSession(): Promise<SessionResponse> {
  const token = await getAccessToken()
  if (!token) return { authenticated: false }

  const claims = decodeClaims(token)
  const userId = typeof claims?.userId === "number" ? claims.userId : null
  const email = typeof claims?.sub === "string" ? claims.sub : null
  const expiration = typeof claims?.exp === "number" ? claims.exp : null
  const roles = Array.isArray(claims?.roles) ? claims.roles.filter(isRole) : []

  if (!userId || !email || !expiration || expiration * 1000 <= Date.now()) {
    return { authenticated: false }
  }

  return {
    authenticated: true,
    userId,
    email,
    roles,
    expiresAt: new Date(expiration * 1000).toISOString(),
  } satisfies Session
}

export function hasRole(session: SessionResponse, ...roles: UserRole[]) {
  return session.authenticated && roles.some((role) => session.roles.includes(role))
}

