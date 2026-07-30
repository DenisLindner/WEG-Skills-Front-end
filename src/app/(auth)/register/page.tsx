import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AuthShell } from "@/components/auth/auth-shell"
import { RegisterForm } from "@/components/auth/register-form"
import { getSession } from "@/lib/session"

export const metadata: Metadata = { title: "Criar conta" }

export default async function RegisterPage() {
  const session = await getSession()
  if (session.authenticated) redirect("/")
  return <AuthShell eyebrow="Comece sua jornada" title="Crie sua conta" description="Cadastre-se gratuitamente para acessar o catálogo e acompanhar seu aprendizado."><RegisterForm /></AuthShell>
}
