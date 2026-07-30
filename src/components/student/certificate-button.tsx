"use client"

import { useState } from "react"
import { Award, Check, Copy, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { apiFetch, friendlyError } from "@/lib/client-api"
import type { Certificate } from "@/types/domain"

export function CertificateButton({ courseId, enabled }: { courseId: number; enabled: boolean }) {
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [pending, setPending] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  async function issue() {
    setPending(true); setError("")
    try { setCertificate(await apiFetch<Certificate>(`/api/courses/${courseId}/certificate`, { method: "PUT", body: "{}" })) } catch (reason) { setError(friendlyError(reason)) } finally { setPending(false) }
  }
  async function copy() {
    if (!certificate) return
    await navigator.clipboard.writeText(`${window.location.origin}/certificate?code=${certificate.code}`)
    setCopied(true); window.setTimeout(() => setCopied(false), 1800)
  }

  return <div><Button type="button" onClick={issue} disabled={!enabled || pending}>{pending ? <LoaderCircle className="animate-spin" /> : <Award />}{certificate ? "Certificado emitido" : "Emitir certificado"}</Button>{!enabled && <p className="mt-2 text-xs text-muted-foreground">Disponível ao concluir todas as aulas.</p>}{error && <p className="mt-2 text-sm text-destructive" role="alert">{error}</p>}{certificate && <div className="mt-4 rounded-xl border border-primary/20 bg-secondary/60 p-4"><p className="text-sm font-semibold">Certificado disponível</p><p className="mt-1 break-all font-mono text-xs text-muted-foreground">{certificate.code}</p><Button type="button" variant="ghost" size="sm" className="mt-2" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? "Copiado" : "Copiar link de validação"}</Button></div>}</div>
}

