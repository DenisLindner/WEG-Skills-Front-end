import {RegisterInput} from "@/types/auth/register-input";
import {authService} from "@/services/auth.service";
import {cookies} from "next/headers";
import {COOKIE_NAME, cookieOptions} from "@/lib/session";
import {NextResponse} from "next/server";
import {apiErrorResponse} from "@/lib/response";

export async function registerRoute(input: RegisterInput) {
    try {
        const auth = await authService.register(input);

        (await cookies()).set(COOKIE_NAME, auth.accessToken, {
            ...cookieOptions,
            expires: new Date(auth.expiresAt)
        });

        const response = NextResponse.json({ authenticated: true, expiresAt: auth.expiresAt });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        return apiErrorResponse(error);
    }
}