import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"
import { getSession } from "@/lib/session"

export const metadata: Metadata = { title: "Entrar" }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const session = await getSession()
  if (session.authenticated) redirect("/")
  return <AuthShell eyebrow="Bem-vindo de volta" title="Entre na sua conta" description="Continue seus cursos e acompanhe sua evolução."><LoginForm nextPath={(await searchParams).next} /></AuthShell>
}
