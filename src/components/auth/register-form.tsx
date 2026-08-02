"use client"

import {useActionState, useState} from "react"
import Link from "next/link"
import { LoaderCircle, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerAction } from "@/actions/auth/register-action"
import type { RegisterState } from "@/types/auth/register-state"

const initialState: RegisterState = {}

export function RegisterForm() {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmation, setConfirmation] = useState<string>("");

    const [state, formAction, pending] = useActionState(
        registerAction,
        initialState
    )

    return (
        <form action={formAction} className="space-y-4">
            <div className="flex flex-col gap-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>

                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        minLength={3}
                        maxLength={128}
                        disabled={pending}
                        aria-invalid={Boolean(state.error?.fieldErrors?.name)}
                        aria-describedby={state.error?.fieldErrors?.name ? "name-error" : undefined}
                    />

                    {state.error?.fieldErrors?.name && (
                        <p id="name-error" className="text-sm text-destructive">{state.error.fieldErrors.name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        maxLength={128}
                        disabled={pending}
                        aria-invalid={Boolean(state.error?.fieldErrors?.email)}
                        aria-describedby={state.error?.fieldErrors?.email ? "email-error" : undefined}
                    />

                    {state.error?.fieldErrors?.email && (
                        <p id="email-error" className="text-sm text-destructive">{state.error.fieldErrors.email}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        maxLength={72}
                        disabled={pending}
                        aria-invalid={Boolean(state.error?.fieldErrors?.password)}
                        aria-describedby={state.error?.fieldErrors?.password ? "password-error" : undefined}
                    />

                    {state.error?.fieldErrors?.password && (
                        <p id="password-error" className="text-sm text-destructive">{state.error.fieldErrors.password}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmation">Confirmar senha</Label>

                    <Input
                        id="confirmation"
                        name="confirmation"
                        type="password"
                        value={confirmation}
                        onChange={(e) => setConfirmation(e.target.value)}
                        autoComplete="new-password"
                        maxLength={72}
                        disabled={pending}
                        aria-invalid={Boolean(state.error?.fieldErrors?.confirmation)}
                        aria-describedby={state.error?.fieldErrors?.confirmation ? "confirmation-error" : undefined}
                    />

                    {state.error?.fieldErrors?.confirmation && (
                        <p id="confirmation-error" className="text-sm text-destructive">{state.error.fieldErrors.confirmation}</p>
                    )}
                </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground space-y-5">Use ao menos 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.</p>

            {state.error && (
                <div role="alert" aria-live="polite" className="rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">{state.error.message}</div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={pending}>
                {pending ? (
                    <LoaderCircle className="animate-spin" />
                ) : (
                    <UserPlus />
                )}

                {pending ? "Criando conta..." : "Criar minha conta"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Já possui conta?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">Entrar</Link>
            </p>
        </form>
    )
}