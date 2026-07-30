"use client"

import { useState } from "react"
import { CheckCircle2, LoaderCircle, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { apiFetch, friendlyError } from "@/lib/client-api"
import type { LessonDetails } from "@/types/domain"

export function LessonPlayer({ lesson: initialLesson, completed }: { lesson: LessonDetails; completed: boolean }) {
  const [lesson, setLesson] = useState(initialLesson)
  const [done, setDone] = useState(completed)
  const [pending, setPending] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  async function renew() {
    setPending("renew"); setMessage("")
    try { setLesson(await apiFetch<LessonDetails>(`/api/lessons/${lesson.id}`)) } catch (error) { setMessage(friendlyError(error)) } finally { setPending("") }
  }
  async function complete() {
    setPending("complete"); setMessage("")
    try { await apiFetch(`/api/lessons/${lesson.id}/completion`, { method: "PUT", body: "{}" }); setDone(true); setMessage("Aula concluída."); router.refresh() } catch (error) { setMessage(friendlyError(error)) } finally { setPending("") }
  }

  return <div><div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">{lesson.videoUrl ? <video key={lesson.videoUrl} controls preload="metadata" src={lesson.videoUrl} className="h-full w-full" onError={() => setMessage("O acesso ao vídeo expirou. Renove para continuar.")} /> : <div className="flex h-full items-center justify-center p-8 text-center text-sm text-white/65">O vídeo desta aula ainda não está disponível.</div>}</div><div className="mt-5 flex flex-wrap items-center gap-3"><Button type="button" onClick={complete} disabled={done || pending === "complete"}>{pending === "complete" ? <LoaderCircle className="animate-spin" /> : <CheckCircle2 />}{done ? "Aula concluída" : "Marcar como concluída"}</Button><Button type="button" variant="outline" onClick={renew} disabled={pending === "renew"}>{pending === "renew" ? <LoaderCircle className="animate-spin" /> : <RefreshCw />}Renovar acesso ao vídeo</Button></div>{message && <p className="mt-3 text-sm" role="status">{message}</p>}</div>
}

