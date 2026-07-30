"use client"

import { useState } from "react"
import { LoaderCircle, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { apiFetch, friendlyError } from "@/lib/client-api"

export function ReviewForm({ courseId }: { courseId: number }) {
  const [rate, setRate] = useState(10)
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setPending(true); setMessage("")
    try {
      await apiFetch("/api/reviews", { method: "POST", body: JSON.stringify({ courseId, rate }) })
      setMessage("Avaliação registrada."); router.refresh()
    } catch (error) { setMessage(friendlyError(error)) } finally { setPending(false) }
  }

  return <form onSubmit={submit} className="rounded-2xl border border-border bg-secondary/40 p-5"><div className="flex flex-wrap items-center gap-4"><div><p className="font-semibold">Avalie este curso</p><p className="text-sm text-muted-foreground">Escolha uma nota de 0 a 10.</p></div><label className="ml-auto flex items-center gap-2"><Star className="size-5 fill-amber-400 text-amber-400" /><span className="sr-only">Nota</span><select value={rate} onChange={(event) => setRate(Number(event.target.value))} className="h-10 rounded-lg border border-input bg-white px-3 text-sm">{Array.from({ length: 11 }, (_, value) => <option key={value} value={value}>{value}/10</option>)}</select></label><Button type="submit" size="sm" disabled={pending}>{pending && <LoaderCircle className="animate-spin" />}Enviar</Button></div>{message && <p className="mt-3 text-sm" role="status">{message}</p>}</form>
}

