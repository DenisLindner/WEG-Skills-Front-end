"use client"

import { useState } from "react"
import Link from "next/link"
import { LoaderCircle, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiFetch, friendlyError } from "@/lib/client-api"

export function RegisterForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("")
    const form = new FormData(event.currentTarget)
    const password = String(form.get("password") ?? "")
    if (password !== form.get("confirmation")) { setError("As senhas não coincidem."); return }
    setPending(true)
    try {
      await apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify({ name: form.get("name"), email: form.get("email"), password }) })
      router.push("/courses"); router.refresh()
    } catch (reason) { setError(friendlyError(reason)) } finally { setPending(false) }
  }

  return <form onSubmit={submit} className="space-y-5"><div className="space-y-2"><Label htmlFor="name">Nome completo</Label><Input id="name" name="name" autoComplete="name" required minLength={3} maxLength={128} /></div><div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" autoComplete="email" required maxLength={128} /></div><div className="grid gap-5 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="password">Senha</Label><Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={72} /></div><div className="space-y-2"><Label htmlFor="confirmation">Confirmar senha</Label><Input id="confirmation" name="confirmation" type="password" autoComplete="new-password" required minLength={8} maxLength={72} /></div></div><p className="text-xs leading-relaxed text-muted-foreground">Use ao menos 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.</p>{error && <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive" role="alert">{error}</div>}<Button type="submit" size="lg" className="w-full" disabled={pending}>{pending ? <LoaderCircle className="animate-spin" /> : <UserPlus />}{pending ? "Criando conta..." : "Criar minha conta"}</Button><p className="text-center text-sm text-muted-foreground">Já possui conta? <Link href="/login" className="font-semibold text-primary hover:underline">Entrar</Link></p></form>
}

