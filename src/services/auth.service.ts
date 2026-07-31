import {LoginInput} from "@/types/auth/login-input";
import {backendFetch} from "@/services/backend.service";
import {RegisterInput} from "@/types/auth/register-input";
import {AuthResponse} from "@/types/auth/auth-response";

export const authService = {
    login: (input: LoginInput) => {
        return backendFetch<AuthResponse>('auth/login', {
            method: 'POST',
            body: JSON.stringify(input),
            auth: false,
        });
    },
    register: (input: RegisterInput) => {
        return backendFetch<AuthResponse>('auth/register', {
            method: 'POST',
            body: JSON.stringify(input),
            auth: false,
        });
    }
}