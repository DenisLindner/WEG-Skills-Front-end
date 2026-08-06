"use server"

import {authService} from "@/services/auth.service";
import {cookies} from "next/headers";
import {ApiError} from "@/services/api-error";
import {redirect} from "next/navigation";
import {COOKIE_NAME, cookieOptions} from "@/lib/session-config";
import {RegisterState} from "@/types/auth/register-state";

export async function registerAction(
    _previousState: RegisterState,
    formData: FormData,
): Promise<RegisterState> {
    const rawName = formData.get("name");
    const rawEmail = formData.get("email");
    const rawPassword = formData.get("password");
    const rawConfirmation = formData.get("confirmation");

    const name = typeof rawName === "string" ? rawName.trim() : "";
    const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
    const password = typeof rawPassword === "string" ? rawPassword : "";
    const confirmation = typeof rawConfirmation === "string" ? rawConfirmation : "";

    const fieldErrors: Record<string, string> = {};

    if (!name) {
        fieldErrors.name = "Informe seu nome.";
    }

    if (!email) {
        fieldErrors.email = "Informe seu e-mail.";
    }

    if (!password) {
        fieldErrors.password = "Informe uma senha.";
    } else if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
        fieldErrors.password = "A senha deve ter pelo menos: 8 caracteres, 1 letra maiuscula, 1 letra minuscula, 1 numero e 1 caractere especial.";
    }

    if (password !== confirmation) {
        fieldErrors.confirmation = "As senhas não coincidem.";
    }

    if (Object.keys(fieldErrors).length > 0) {
        return {
            error: {
                code: "invalid-register",
                message: "Preencha os campos obrigatórios.",
                fieldErrors,
            },
        };
    }

    try {
        const auth = await authService.register({
            name,
            email,
            password,
        });

        (await cookies()).set(COOKIE_NAME, auth.accessToken, {
            ...cookieOptions,
            expires: new Date(auth.expiresAt),
        });
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 400) {
                return { error: {...error.publicBody(), message: "Verifique os dados informados."} };
            }
            if (error.status === 409) {
                return { error: {...error.publicBody(), fieldErrors: { email: "O e-mail informado já está em uso." }, message: "Dados inválidos."} };
            }
            return {
                error: error.publicBody(),
            };
        }

        return {
            error: {
                code: 'internal-error',
                message: 'Ocorreu um erro inesperado.',
            },
        };
    }

    redirect('/');
}
