"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiFetch, friendlyError } from "@/lib/client-api"

export function LoginForm({ nextPath = "/" }: { nextPath?: string }) {
  const [visible, setVisible] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("")
    const data = new FormData(event.currentTarget)
    try {
      await apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email: data.get("email"), password: data.get("password") }) })
      router.push(nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/")
      router.refresh()
    } catch (reason) { setError(friendlyError(reason)) } finally { setPending(false) }
  }

  return <form onSubmit={submit} className="space-y-5"><div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" autoComplete="email" placeholder="nome@empresa.com" required maxLength={128} /></div><div className="space-y-2"><Label htmlFor="password">Senha</Label><div className="relative"><Input id="password" name="password" type={visible ? "text" : "password"} autoComplete="current-password" required maxLength={72} className="pr-11" /><button type="button" onClick={() => setVisible((value) => !value)} className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"><span className="sr-only">{visible ? "Ocultar" : "Mostrar"} senha</span>{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></div>{error && <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive" role="alert">{error}</div>}<Button type="submit" size="lg" className="w-full" disabled={pending}>{pending ? <LoaderCircle className="animate-spin" /> : <LogIn />}{pending ? "Entrando..." : "Entrar"}</Button><p className="text-center text-sm text-muted-foreground">Ainda não possui conta? <Link href="/register" className="font-semibold text-primary hover:underline">Cadastre-se</Link></p></form>
}

