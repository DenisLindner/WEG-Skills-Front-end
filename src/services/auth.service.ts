import "server-only"

import type { AuthResponse, LoginInput, RegisterInput } from "@/types/auth"
import { backendFetch } from "./backend.service"

export const authService = {
  login: (input: LoginInput) =>
    backendFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
      auth: false,
    }),

  register: (input: RegisterInput) =>
    backendFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
      auth: false,
    }),
}

