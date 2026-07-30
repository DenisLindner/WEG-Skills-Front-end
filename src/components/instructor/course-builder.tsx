"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, CheckCircle2, FileVideo, ImagePlus, Layers3, LoaderCircle, Plus, Save, Send, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { apiFetch, friendlyError } from "@/lib/client-api"
import { imageTypes, maxImageSize, maxVideoSize, uploadDirectly, videoTypes } from "@/lib/upload"
import type { Course, Lesson, Module, UploadTicket } from "@/types/domain"

export type BuilderModule = Module & { lessons: Lesson[] }

export function CourseBuilder({ initialCourse, initialModules }: { initialCourse: Course; initialModules: BuilderModule[] }) {
  const [course, setCourse] = useState(initialCourse)
  const [modules, setModules] = useState(initialModules)
  const [pending, setPending] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  async function run(key: string, action: () => Promise<void>) {
    setPending(key); setMessage("")
    try { await action() } catch (error) { setMessage(friendlyError(error)) } finally { setPending("") }
  }

  async function saveCourse(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget)
    await run("course", async () => { const updated = await apiFetch<Course>(`/api/courses/${course.id}`, { method: "PATCH", body: JSON.stringify({ title: data.get("title"), description: data.get("description") }) }); setCourse(updated); setMessage("Dados do curso salvos.") })
  }

  async function uploadCover(file: File) {
    if (!imageTypes.includes(file.type) || file.size > maxImageSize) { setMessage("Escolha uma imagem JPEG, PNG ou WebP de até 5 MB."); return }
    await run("cover", async () => { const ticket = await apiFetch<UploadTicket>(`/api/courses/${course.id}/image-upload`, { method: "POST", body: JSON.stringify({ fileName: file.name, contentType: file.type, size: file.size }) }); await uploadDirectly(ticket, file); await apiFetch(`/api/media/${ticket.mediaId}/complete`, { method: "POST", body: JSON.stringify({ target: "course", targetId: course.id }) }); setMessage("Capa atualizada."); router.refresh() })
  }

  async function createModule(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form)
    await run("new-module", async () => { const created = await apiFetch<Module>("/api/modules", { method: "POST", body: JSON.stringify({ courseId: course.id, title: data.get("title"), description: data.get("description") }) }); setModules((items) => [...items, { ...created, lessons: [] }]); form.reset(); setCourse((value) => ({ ...value, status: "DRAFT" })) })
  }

  async function createLesson(moduleId: number, event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form)
    await run(`new-lesson-${moduleId}`, async () => { const created = await apiFetch<Lesson>("/api/lessons", { method: "POST", body: JSON.stringify({ moduleId, title: data.get("title"), description: data.get("description") }) }); setModules((items) => items.map((item) => item.id === moduleId ? { ...item, lessons: [...item.lessons, created] } : item)); form.reset(); setCourse((value) => ({ ...value, status: "DRAFT" })) })
  }

  async function uploadModuleImage(moduleId: number, file: File) {
    if (!imageTypes.includes(file.type) || file.size > maxImageSize) { setMessage("Imagem inválida ou maior que 5 MB."); return }
    await run(`module-image-${moduleId}`, async () => { const ticket = await apiFetch<UploadTicket>(`/api/modules/${moduleId}/image-upload`, { method: "POST", body: JSON.stringify({ fileName: file.name, contentType: file.type, size: file.size }) }); await uploadDirectly(ticket, file); await apiFetch(`/api/media/${ticket.mediaId}/complete`, { method: "POST", body: JSON.stringify({ target: "module", targetId: moduleId }) }); setMessage("Imagem do módulo atualizada."); router.refresh() })
  }

  async function uploadVideo(lessonId: number, file: File) {
    if (!videoTypes.includes(file.type) || file.size > maxVideoSize) { setMessage("Escolha um vídeo MP4 de até 2 GiB."); return }
    await run(`video-${lessonId}`, async () => { const ticket = await apiFetch<UploadTicket>(`/api/lessons/${lessonId}/video-upload`, { method: "POST", body: JSON.stringify({ fileName: file.name, contentType: file.type, size: file.size }) }); await uploadDirectly(ticket, file); await apiFetch(`/api/media/${ticket.mediaId}/complete`, { method: "POST", body: JSON.stringify({ target: "lesson", targetId: lessonId }) }); setMessage("Vídeo enviado e confirmado.") })
  }

  async function removeModule(moduleId: number) {
    if (!window.confirm("Excluir este módulo e todas as aulas?")) return
    await run(`module-${moduleId}`, async () => { await apiFetch<void>(`/api/modules/${moduleId}`, { method: "DELETE", body: "{}" }); setModules((items) => items.filter((item) => item.id !== moduleId)); setCourse((value) => ({ ...value, status: "DRAFT" })) })
  }
  async function removeLesson(moduleId: number, lessonId: number) {
    if (!window.confirm("Excluir esta aula?")) return
    await run(`lesson-${lessonId}`, async () => { await apiFetch<void>(`/api/lessons/${lessonId}`, { method: "DELETE", body: "{}" }); setModules((items) => items.map((item) => item.id === moduleId ? { ...item, lessons: item.lessons.filter((lesson) => lesson.id !== lessonId) } : item)); setCourse((value) => ({ ...value, status: "DRAFT" })) })
  }

  async function moveModule(index: number, direction: -1 | 1) {
    const target = index + direction; if (target < 0 || target >= modules.length) return
    const next = [...modules]; [next[index], next[target]] = [next[target], next[index]]
    await run("reorder-modules", async () => { await apiFetch<void>("/api/modules", { method: "PATCH", body: JSON.stringify({ parentId: course.id, orderedIds: next.map((item) => item.id) }) }); setModules(next) })
  }
  async function moveLesson(moduleId: number, index: number, direction: -1 | 1) {
    const owner = modules.find((item) => item.id === moduleId); if (!owner) return
    const target = index + direction; if (target < 0 || target >= owner.lessons.length) return
    const lessons = [...owner.lessons]; [lessons[index], lessons[target]] = [lessons[target], lessons[index]]
    await run(`reorder-lessons-${moduleId}`, async () => { await apiFetch<void>("/api/lessons", { method: "PATCH", body: JSON.stringify({ parentId: moduleId, orderedIds: lessons.map((item) => item.id) }) }); setModules((items) => items.map((item) => item.id === moduleId ? { ...item, lessons } : item)) })
  }
  async function publish() {
    await run("publish", async () => { const updated = await apiFetch<Course>(`/api/courses/${course.id}/publish`, { method: "PATCH", body: "{}" }); setCourse(updated); setMessage("Curso publicado com sucesso.") })
  }

  return <div className="space-y-6">{message && <div className="rounded-xl border border-primary/15 bg-secondary p-4 text-sm" role="status">{message}</div>}<div className="grid gap-6 lg:grid-cols-[1fr_300px]"><Card><CardHeader><CardTitle>Informações do curso</CardTitle></CardHeader><CardContent><form onSubmit={saveCourse} className="space-y-4"><div className="space-y-2"><Label htmlFor="title">Título</Label><Input id="title" name="title" defaultValue={course.title} required minLength={3} maxLength={128} /></div><div className="space-y-2"><Label htmlFor="description">Descrição</Label><Textarea id="description" name="description" defaultValue={course.description ?? ""} maxLength={255} /></div><Button type="submit" disabled={pending === "course"}>{pending === "course" ? <LoaderCircle className="animate-spin" /> : <Save />}Salvar</Button></form></CardContent></Card><Card className="h-fit"><CardHeader><CardTitle>Publicação</CardTitle></CardHeader><CardContent><Badge className={course.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : ""}>{course.status === "PUBLISHED" ? "Publicado" : "Rascunho"}</Badge><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Para publicar, adicione capa, módulo e ao menos uma aula; todas as aulas precisam de vídeo.</p><label className="mt-5 flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary hover:underline"><ImagePlus className="size-4" />Alterar capa<input type="file" accept={imageTypes.join(",")} className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadCover(file); event.target.value = "" }} /></label><Button type="button" className="mt-5 w-full" onClick={publish} disabled={pending === "publish"}>{pending === "publish" ? <LoaderCircle className="animate-spin" /> : course.status === "PUBLISHED" ? <CheckCircle2 /> : <Send />}{course.status === "PUBLISHED" ? "Republicar alterações" : "Publicar curso"}</Button></CardContent></Card></div><div className="flex items-center gap-3"><Layers3 className="size-6 text-primary" /><h2 className="text-2xl font-bold">Módulos e aulas</h2></div>{modules.map((module, moduleIndex) => <Card key={module.id} className="overflow-hidden"><div className="flex flex-wrap items-center gap-3 border-b border-border bg-secondary/45 p-5"><div className="mr-auto"><p className="text-xs font-bold uppercase text-primary">Módulo {moduleIndex + 1}</p><h3 className="font-semibold">{module.title}</h3></div><Button type="button" variant="ghost" size="icon" onClick={() => moveModule(moduleIndex, -1)} disabled={moduleIndex === 0}><ArrowUp /><span className="sr-only">Mover para cima</span></Button><Button type="button" variant="ghost" size="icon" onClick={() => moveModule(moduleIndex, 1)} disabled={moduleIndex === modules.length - 1}><ArrowDown /><span className="sr-only">Mover para baixo</span></Button><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-2 text-xs font-semibold text-primary hover:bg-white"><ImagePlus className="size-4" />Imagem<input type="file" accept={imageTypes.join(",")} className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadModuleImage(module.id, file); event.target.value = "" }} /></label><Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeModule(module.id)}><Trash2 /><span className="sr-only">Excluir módulo</span></Button></div><div className="divide-y divide-border">{module.lessons.map((lesson, lessonIndex) => <div key={lesson.id} className="flex flex-wrap items-center gap-3 p-4 sm:px-5"><span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">{lessonIndex + 1}</span><div className="min-w-40 flex-1"><p className="text-sm font-semibold">{lesson.title}</p><p className="line-clamp-1 text-xs text-muted-foreground">{lesson.description || "Sem descrição"}</p></div><Button type="button" variant="ghost" size="icon" onClick={() => moveLesson(module.id, lessonIndex, -1)} disabled={lessonIndex === 0}><ArrowUp /></Button><Button type="button" variant="ghost" size="icon" onClick={() => moveLesson(module.id, lessonIndex, 1)} disabled={lessonIndex === module.lessons.length - 1}><ArrowDown /></Button><label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-border bg-white px-3 text-xs font-semibold text-primary hover:bg-secondary"><FileVideo className="size-4" />{pending === `video-${lesson.id}` ? "Enviando..." : "Enviar MP4"}<input type="file" accept="video/mp4" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadVideo(lesson.id, file); event.target.value = "" }} /></label><Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeLesson(module.id, lesson.id)}><Trash2 /></Button></div>)}<form onSubmit={(event) => createLesson(module.id, event)} className="grid gap-3 bg-muted/40 p-5 sm:grid-cols-[1fr_1.4fr_auto]"><Input name="title" placeholder="Título da nova aula" required minLength={3} maxLength={128} /><Input name="description" placeholder="Descrição (opcional)" maxLength={255} /><Button type="submit" variant="outline" disabled={pending === `new-lesson-${module.id}`}><Plus />Adicionar aula</Button></form></div></Card>)}<Card className="border-dashed"><CardContent className="p-6"><form onSubmit={createModule} className="grid gap-3 sm:grid-cols-[1fr_1.4fr_auto]"><Input name="title" placeholder="Título do novo módulo" required minLength={3} maxLength={128} /><Input name="description" placeholder="Descrição (opcional)" maxLength={255} /><Button type="submit" disabled={pending === "new-module"}>{pending === "new-module" ? <LoaderCircle className="animate-spin" /> : <Plus />}Adicionar módulo</Button></form></CardContent></Card></div>
}

