import {LoginInput} from "@/types/auth/login-input";
import {backendFetch} from "@/services/backend.service";
import {RegisterInput} from "@/types/auth/register-input";

export const authService = {
    login: (input: LoginInput) =>
        backendFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify(input),
            auth: false,
        }),

    register: (input: RegisterInput) =>
        backendFetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(input),
            auth: false,
        })
}