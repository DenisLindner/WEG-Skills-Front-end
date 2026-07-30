"use client"

import { useState } from "react"
import { Award, CheckCircle2, LoaderCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { apiFetch, friendlyError } from "@/lib/client-api"
import type { Certificate } from "@/types/domain"

export function CertificateValidator() {
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError(""); setCertificate(null)
    const code = String(new FormData(event.currentTarget).get("code") ?? "").trim()
    try { setCertificate(await apiFetch<Certificate>(`/api/certificates/validate/${encodeURIComponent(code)}`)) } catch (reason) { setError(friendlyError(reason)) } finally { setPending(false) }
  }

  return <div className="mx-auto max-w-3xl"><form onSubmit={submit} className="flex gap-2"><Input name="code" required maxLength={128} placeholder="Digite o código do certificado" className="h-12" /><Button type="submit" size="lg" disabled={pending}>{pending ? <LoaderCircle className="animate-spin" /> : <Search />}Validar</Button></form>{error && <div className="mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive" role="alert">{error}</div>}{certificate && <Card className="relative mt-8 overflow-hidden border-primary/20 p-8 shadow-lg"><div className="absolute -right-12 -top-12 size-44 rounded-full bg-secondary" /><Award className="relative size-12 text-primary" /><div className="relative mt-6"><div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700"><CheckCircle2 className="size-4" />Certificado válido</div><h2 className="text-3xl font-bold">{certificate.studentName}</h2><p className="mt-3 text-muted-foreground">Concluiu o curso <strong className="text-foreground">{certificate.courseTitle}</strong>, composto por {certificate.totalLessons} aulas.</p><dl className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-2"><div><dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Código</dt><dd className="mt-1 break-all font-mono text-sm">{certificate.code}</dd></div><div><dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Conclusão</dt><dd className="mt-1 text-sm">{new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(certificate.endDate))}</dd></div></dl></div></Card>}</div>
}

