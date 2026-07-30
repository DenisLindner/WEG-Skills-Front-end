"use client"

import { useState } from "react"
import { Check, Copy, LoaderCircle, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiFetch, friendlyError } from "@/lib/client-api"
import type { InstructorCreated } from "@/types/domain"

export function CreateInstructorForm() {
  const [result, setResult] = useState<InstructorCreated | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError(""); setResult(null)
    const form = event.currentTarget; const data = new FormData(form)
    try { setResult(await apiFetch<InstructorCreated>("/api/users/instructors", { method: "POST", body: JSON.stringify({ name: data.get("name"), email: data.get("email") }) })); form.reset() } catch (reason) { setError(friendlyError(reason)) } finally { setPending(false) }
  }
  async function copy() { if (!result) return; await navigator.clipboard.writeText(`E-mail: ${result.email}\nSenha temporária: ${result.temporaryPassword}`); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }

  return <div><form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="instructor-name">Nome</Label><Input id="instructor-name" name="name" required minLength={3} maxLength={128} /></div><div className="space-y-2"><Label htmlFor="instructor-email">E-mail</Label><Input id="instructor-email" name="email" type="email" required maxLength={128} /></div><div className="sm:col-span-2"><Button type="submit" disabled={pending}>{pending ? <LoaderCircle className="animate-spin" /> : <UserPlus />}Criar instrutor</Button></div></form>{error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}{result && <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><p className="font-semibold">Instrutor criado. Copie a senha agora; ela não será exibida novamente.</p><dl className="mt-3 grid gap-2"><div><dt className="text-xs font-bold uppercase">E-mail</dt><dd>{result.email}</dd></div><div><dt className="text-xs font-bold uppercase">Senha temporária</dt><dd className="font-mono text-base">{result.temporaryPassword}</dd></div></dl><Button type="button" variant="outline" size="sm" className="mt-3" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? "Copiado" : "Copiar credenciais"}</Button></div>}</div>
}

