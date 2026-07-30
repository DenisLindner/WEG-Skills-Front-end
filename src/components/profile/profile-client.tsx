"use client"

/* eslint-disable @next/next/no-img-element -- avatar URLs come from the backend-controlled MinIO host */

import { useRef, useState } from "react"
import { Camera, KeyRound, LoaderCircle, Save, Trash2, UserRound } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiFetch, friendlyError } from "@/lib/client-api"
import { imageTypes, maxImageSize, uploadDirectly } from "@/lib/upload"
import type { UploadTicket, UserProfile } from "@/types/domain"

export function ProfileClient({ profile }: { profile: UserProfile }) {
  const [pending, setPending] = useState("")
  const [message, setMessage] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending("profile"); setMessage("")
    const data = new FormData(event.currentTarget)
    try {
      await apiFetch("/api/users/me", { method: "PATCH", body: JSON.stringify({ name: data.get("name"), email: data.get("email"), birthday: data.get("birthday") || undefined, phone: data.get("phone") || undefined }) })
      setMessage("Perfil atualizado com sucesso."); router.refresh()
    } catch (error) { setMessage(friendlyError(error)) } finally { setPending("") }
  }

  async function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending("password"); setMessage("")
    const form = event.currentTarget
    const data = new FormData(form)
    if (data.get("password") !== data.get("confirmation")) { setMessage("As novas senhas não coincidem."); return }
    try {
      await apiFetch<void>("/api/users/me/password", { method: "PATCH", body: JSON.stringify({ actualPassword: data.get("actualPassword"), password: data.get("password") }) })
      form.reset(); setMessage("Senha alterada com sucesso.")
    } catch (error) { setMessage(friendlyError(error)) } finally { setPending("") }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!imageTypes.includes(file.type) || file.size > maxImageSize) { setMessage("Escolha uma imagem JPEG, PNG ou WebP de até 5 MB."); return }
    setPending("avatar"); setMessage("")
    try {
      const ticket = await apiFetch<UploadTicket>("/api/users/me/image-upload", { method: "POST", body: JSON.stringify({ fileName: file.name, contentType: file.type, size: file.size }) })
      await uploadDirectly(ticket, file)
      await apiFetch(`/api/media/${ticket.mediaId}/complete`, { method: "POST", body: JSON.stringify({ target: "me" }) })
      setMessage("Foto atualizada com sucesso."); router.refresh()
    } catch (error) { setMessage(friendlyError(error)) } finally { setPending(""); event.target.value = "" }
  }

  async function removeAccount() {
    if (!window.confirm("Excluir sua conta permanentemente? Esta ação não pode ser desfeita.")) return
    setPending("delete"); setMessage("")
    try {
      await apiFetch<void>("/api/users/me", { method: "DELETE", body: "{}" })
      await apiFetch<void>("/api/auth/logout", { method: "POST", body: "{}" })
      router.push("/"); router.refresh()
    } catch (error) { setMessage(friendlyError(error)); setPending("") }
  }

  return <div className="grid gap-6 lg:grid-cols-[320px_1fr]"><Card className="h-fit"><CardContent className="flex flex-col items-center p-7"><div className="relative flex size-32 items-center justify-center overflow-hidden rounded-full bg-secondary text-primary">{profile.pictureUrl ? <img src={profile.pictureUrl} alt={`Foto de ${profile.name}`} className="h-full w-full object-cover" /> : <UserRound className="size-12" />}<button type="button" onClick={() => fileRef.current?.click()} className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-center bg-black/55 text-white hover:bg-black/70"><Camera className="size-4" /><span className="sr-only">Alterar foto</span></button></div><input ref={fileRef} type="file" accept={imageTypes.join(",")} className="sr-only" onChange={uploadAvatar} /><h2 className="mt-5 text-center text-xl font-semibold">{profile.name}</h2><p className="mt-1 break-all text-center text-sm text-muted-foreground">{profile.email}</p>{pending === "avatar" && <p className="mt-4 flex items-center gap-2 text-sm text-primary"><LoaderCircle className="size-4 animate-spin" />Enviando imagem...</p>}</CardContent></Card><div className="space-y-6">{message && <div className="rounded-xl border border-primary/15 bg-secondary p-4 text-sm" role="status">{message}</div>}<Card><CardHeader><CardTitle>Dados pessoais</CardTitle></CardHeader><CardContent><form onSubmit={saveProfile} className="grid gap-5 sm:grid-cols-2"><div className="space-y-2 sm:col-span-2"><Label htmlFor="name">Nome</Label><Input id="name" name="name" defaultValue={profile.name} required minLength={3} maxLength={128} /></div><div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" defaultValue={profile.email} required /></div><div className="space-y-2"><Label htmlFor="phone">Telefone</Label><Input id="phone" name="phone" defaultValue={profile.phone ?? ""} minLength={7} maxLength={20} /></div><div className="space-y-2"><Label htmlFor="birthday">Data de nascimento</Label><Input id="birthday" name="birthday" type="date" defaultValue={profile.birthday ?? ""} max={new Date().toISOString().slice(0, 10)} /></div><div className="flex items-end"><Button type="submit" disabled={pending === "profile"}>{pending === "profile" ? <LoaderCircle className="animate-spin" /> : <Save />}Salvar alterações</Button></div></form></CardContent></Card><Card><CardHeader><CardTitle>Alterar senha</CardTitle></CardHeader><CardContent><form onSubmit={changePassword} className="grid gap-5 sm:grid-cols-3"><div className="space-y-2"><Label htmlFor="actualPassword">Senha atual</Label><Input id="actualPassword" name="actualPassword" type="password" required /></div><div className="space-y-2"><Label htmlFor="newPassword">Nova senha</Label><Input id="newPassword" name="password" type="password" minLength={8} required /></div><div className="space-y-2"><Label htmlFor="confirmation">Confirmar senha</Label><Input id="confirmation" name="confirmation" type="password" minLength={8} required /></div><div className="sm:col-span-3"><Button type="submit" variant="outline" disabled={pending === "password"}>{pending === "password" ? <LoaderCircle className="animate-spin" /> : <KeyRound />}Atualizar senha</Button></div></form></CardContent></Card><Card className="border-destructive/20"><CardHeader><CardTitle className="text-destructive">Zona de risco</CardTitle></CardHeader><CardContent><p className="mb-4 text-sm text-muted-foreground">Contas responsáveis por cursos não podem ser excluídas até que esses cursos sejam removidos.</p><Button type="button" variant="destructive" onClick={removeAccount} disabled={pending === "delete"}>{pending === "delete" ? <LoaderCircle className="animate-spin" /> : <Trash2 />}Excluir minha conta</Button></CardContent></Card></div></div>
}
