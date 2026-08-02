"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from "@/actions/auth/login-action"
import type { LoginState } from "@/types/auth/login-state"

const initialState: LoginState = {}

export function LoginForm() {
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [state, formAction, pending] = useActionState(
        loginAction,
        initialState
    )

    return (
        <form action={formAction} className="space-y-5">
            <div className="flex flex-col gap-2">
                <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        placeholder="nome@empresa.com"
                        maxLength={128}
                        disabled={pending}
                        aria-invalid={Boolean(state.error?.fieldErrors?.email)}
                    />

                    {state.error?.fieldErrors?.email && (<p className="text-sm text-destructive">{state.error.fieldErrors.email}</p>)}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>

                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={visible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            maxLength={72}
                            disabled={pending}
                            aria-invalid={Boolean(state.error?.fieldErrors?.password)}
                            className="pr-11"
                        />

                        <button
                            type="button"
                            onClick={() => setVisible((value) => !value)}
                            disabled={pending}
                            className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:pointer-events-none disabled:opacity-50">
                            <span className="sr-only">{visible ? "Ocultar" : "Mostrar"} senha</span>
                            {visible ? (<EyeOff className="size-4" />) : (<Eye className="size-4" />)}
                        </button>
                    </div>

                    {state.error?.fieldErrors?.password && (<p className="text-sm text-destructive">{state.error.fieldErrors.password}</p>)}
                </div>
            </div>

            {state.error && (
                <div
                    role="alert"
                    aria-live="polite"
                    className="rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
                >
                    {state.error.message}
                </div>
            )}

            <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={pending}
            >
                {pending ? (<LoaderCircle className="animate-spin" />) : (<LogIn />)}

                {pending ? "Entrando..." : "Entrar"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Ainda não possui conta?{" "}
                <Link href="/register" className="font-semibold text-primary hover:underline">Cadastre-se</Link>
            </p>
        </form>
    )
}