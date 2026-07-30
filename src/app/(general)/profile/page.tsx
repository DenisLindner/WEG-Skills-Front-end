import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ProfileClient } from "@/components/profile/profile-client"
import { getSession } from "@/lib/session"
import { userService } from "@/services/user.service"

export const metadata: Metadata = { title: "Meu perfil" }

export default async function ProfilePage() {
  const session = await getSession()
  if (!session.authenticated) redirect("/login?next=/profile")
  const profile = await userService.me()
  return <main className="content-grid py-12 sm:py-16"><div className="mb-10"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Minha conta</p><h1 className="text-4xl font-bold tracking-tight">Perfil e segurança</h1></div><ProfileClient profile={profile} /></main>
}
