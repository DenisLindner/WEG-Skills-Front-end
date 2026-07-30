import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { CourseBuilder, type BuilderModule } from "@/components/instructor/course-builder"
import { getSession, hasRole } from "@/lib/session"
import { courseService } from "@/services/course.service"
import { lessonService } from "@/services/lesson.service"
import { moduleService } from "@/services/module.service"

export const metadata: Metadata = { title: "Editor de curso" }

export default async function CourseBuilderPage({ params }: { params: Promise<{ courseId: string }> }) {
  const session = await getSession(); if (!session.authenticated) redirect("/login?next=/instructor")
  if (!hasRole(session, "INSTRUCTOR", "ADMIN")) redirect("/student")
  const courseId = Number((await params).courseId); if (!Number.isSafeInteger(courseId) || courseId <= 0) notFound()
  const [course, modulesPage] = await Promise.all([courseService.findById(courseId), moduleService.listByCourse(courseId, 0, 100)])
  const modules: BuilderModule[] = await Promise.all(modulesPage.content.map(async (module) => ({ ...module, lessons: (await lessonService.listByModule(module.id, 0, 100)).content })))
  return <main className="content-grid py-12 sm:py-16"><div className="mb-10"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Editor de curso</p><h1 className="text-4xl font-bold tracking-tight">{course.title}</h1><p className="mt-3 text-muted-foreground">Organize o conteúdo e publique quando todos os requisitos estiverem completos.</p></div><CourseBuilder initialCourse={course} initialModules={modules} /></main>
}

