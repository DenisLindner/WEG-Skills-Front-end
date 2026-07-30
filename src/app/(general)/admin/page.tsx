import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookCopy, ShieldCheck } from "lucide-react"
import { redirect } from "next/navigation"
import { CreateInstructorForm } from "@/components/admin/create-instructor-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSession, hasRole } from "@/lib/session"
import { courseService } from "@/services/course.service"

export const metadata: Metadata = { title: "Administração" }

export default async function AdminPage() {
  const session = await getSession(); if (!session.authenticated) redirect("/login?next=/admin")
  if (!hasRole(session, "ADMIN")) redirect("/student")
  const courses = await courseService.listAdmin({ page: 0, size: 100 })
  return <main className="content-grid py-12 sm:py-16"><div className="mb-10"><div className="mb-3 flex items-center gap-2 text-primary"><ShieldCheck className="size-5" /><span className="text-sm font-bold uppercase tracking-[0.18em]">Acesso administrativo</span></div><h1 className="text-4xl font-bold tracking-tight">Administração</h1><p className="mt-3 text-muted-foreground">Gerencie instrutores e acompanhe todo o catálogo.</p></div><div className="grid gap-6 lg:grid-cols-[380px_1fr]"><Card className="h-fit"><CardHeader><CardTitle>Novo instrutor</CardTitle></CardHeader><CardContent><CreateInstructorForm /></CardContent></Card><Card><CardHeader><CardTitle className="flex items-center gap-2"><BookCopy className="size-5 text-primary" />Todos os cursos <Badge>{courses.totalElements}</Badge></CardTitle></CardHeader><CardContent><div className="divide-y divide-border">{courses.content.map((course) => <div key={course.id} className="flex items-center gap-4 py-4"><div className="min-w-0 flex-1"><p className="truncate font-semibold">{course.title}</p><p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{course.description || "Sem descrição"}</p></div><Badge className={course.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : ""}>{course.status === "PUBLISHED" ? "Publicado" : "Rascunho"}</Badge><Link href={`/instructor/courses/${course.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Gerenciar<ArrowRight className="size-4" /></Link></div>)}{!courses.content.length && <p className="py-8 text-center text-sm text-muted-foreground">Nenhum curso cadastrado.</p>}</div></CardContent></Card></div></main>
}
