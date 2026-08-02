"use server"

import {authService} from "@/services/auth.service";
import {cookies} from "next/headers";
import {LoginState} from "@/types/auth/login-state";
import {ApiError} from "@/services/api-error";
import {redirect} from "next/navigation";
import {COOKIE_NAME, cookieOptions} from "@/lib/session-config";

export async function loginAction(_previousState: LoginState, formData: FormData): Promise<LoginState> {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
        return {
            error: {
                code: 'invalid-login',
                message: 'Informe e-mail e senha'
            }
        };
    }

    try {
        const auth = await authService.login({email, password});

        (await cookies()).set(COOKIE_NAME, auth.accessToken, {
            ...cookieOptions,
            expires: new Date(auth.expiresAt)
        });
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                return { error: {...error.publicBody(), message: "Credenciais inválidas."} };
            }
            if (error.status === 429) {
                return { error: {...error.publicBody(), message: "Muitas tentativas de login. Tente novamente mais tarde."} };
            }
            return { error: error.publicBody() };
        }

        return {
            error: {
                code: 'internal-error',
                message: 'Ocorreu um erro inesperado'
            }
        };
    }

    redirect('/');
}