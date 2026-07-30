import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { CourseCreateForm } from "@/components/instructor/course-create-form"
import { getSession, hasRole } from "@/lib/session"

export const metadata: Metadata = { title: "Novo curso" }

export default async function NewCoursePage() {
  const session = await getSession(); if (!session.authenticated) redirect("/login?next=/instructor/courses/new")
  if (!hasRole(session, "INSTRUCTOR", "ADMIN")) redirect("/student")
  return <main className="content-grid py-12 sm:py-16"><div className="mx-auto mb-10 max-w-3xl"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Novo conteúdo</p><h1 className="text-4xl font-bold tracking-tight">Criar curso</h1><p className="mt-3 text-muted-foreground">Comece pelas informações básicas. Módulos, aulas e vídeos serão configurados na próxima etapa.</p></div><CourseCreateForm /></main>
}

