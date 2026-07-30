"use client"

import { useState } from "react"
import { ImagePlus, LoaderCircle, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { apiFetch, friendlyError } from "@/lib/client-api"
import { imageTypes, maxImageSize, uploadDirectly } from "@/lib/upload"
import type { Course, UploadTicket } from "@/types/domain"

export function CourseCreateForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("")
    const data = new FormData(event.currentTarget)
    const file = data.get("image") as File
    try {
      const course = await apiFetch<Course>("/api/courses", { method: "POST", body: JSON.stringify({ title: data.get("title"), description: data.get("description") }) })
      if (file?.size) {
        if (!imageTypes.includes(file.type) || file.size > maxImageSize) throw new Error("Escolha uma imagem JPEG, PNG ou WebP de até 5 MB.")
        const ticket = await apiFetch<UploadTicket>(`/api/courses/${course.id}/image-upload`, { method: "POST", body: JSON.stringify({ fileName: file.name, contentType: file.type, size: file.size }) })
        await uploadDirectly(ticket, file)
        await apiFetch(`/api/media/${ticket.mediaId}/complete`, { method: "POST", body: JSON.stringify({ target: "course", targetId: course.id }) })
      }
      router.push(`/instructor/courses/${course.id}`); router.refresh()
    } catch (reason) { setError(reason instanceof Error && !("status" in reason) ? reason.message : friendlyError(reason)) } finally { setPending(false) }
  }

  return <Card className="mx-auto max-w-3xl"><CardHeader><CardTitle>Informações iniciais</CardTitle></CardHeader><CardContent><form onSubmit={submit} className="space-y-6"><div className="space-y-2"><Label htmlFor="title">Título do curso</Label><Input id="title" name="title" required minLength={3} maxLength={128} placeholder="Ex.: Fundamentos de automação industrial" /></div><div className="space-y-2"><Label htmlFor="description">Descrição</Label><Textarea id="description" name="description" minLength={3} maxLength={255} placeholder="Explique de forma objetiva o que será aprendido." /></div><div className="space-y-2"><Label htmlFor="image">Capa do curso</Label><label htmlFor="image" className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-primary/30 bg-secondary/40 p-5 text-sm text-muted-foreground hover:bg-secondary"><ImagePlus className="size-6 text-primary" /><span>JPEG, PNG ou WebP, até 5 MB</span></label><input id="image" name="image" type="file" accept={imageTypes.join(",")} className="sr-only" /></div>{error && <p className="rounded-xl bg-destructive/5 p-3 text-sm text-destructive" role="alert">{error}</p>}<Button type="submit" size="lg" disabled={pending}>{pending ? <LoaderCircle className="animate-spin" /> : <PlusCircle />}{pending ? "Criando..." : "Criar e configurar conteúdo"}</Button></form></CardContent></Card>
}

