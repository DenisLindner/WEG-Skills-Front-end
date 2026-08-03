import "server-only";

import {UserRole} from "@/types/user/user-role";
import {cookies} from "next/headers";
import {SessionResponse} from "@/types/auth/session";
import {COOKIE_NAME} from "@/lib/session-config";

type JwtClaimOptions = {
    sub?: unknown
    exp?: unknown
    userId?: unknown
    roles?: unknown
};

function isRole(value: unknown): value is UserRole {
    return value === 'STUDENT' || value === 'INSTRUCTOR' || value === 'ADMIN';
}

function decodeClaimOptions(token: string) {
    try {
        const payload = token.split(".")[1];

        if (!payload) {
            return null;
        }

        return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as JwtClaimOptions;
    } catch {
        return null;
    }
}

export async function getAccessToken() {
    return (await cookies()).get(COOKIE_NAME)?.value ?? null;
}

export async function getSession(): Promise<SessionResponse> {
    const token = await getAccessToken();
    if (!token) {
        return {authenticated: false};
    }

    const claims = decodeClaimOptions(token);
    const userId = typeof claims?.userId === 'number' ? claims?.userId : '';
    const email = typeof claims?.sub === 'string' ? claims?.sub : '';
    const expiration = typeof claims?.exp === 'number' ? claims?.exp : '';
    const roles = Array.isArray(claims?.roles) ? claims.roles.filter(isRole) : [];

    if (!userId || !email || !expiration || expiration * 1000 <= Date.now()) {
        return {authenticated: false}
    }

    return {
        authenticated: true,
        userId,
        email,
        roles,
        expiresAt: new Date(expiration * 1000).toISOString()
    };
}
