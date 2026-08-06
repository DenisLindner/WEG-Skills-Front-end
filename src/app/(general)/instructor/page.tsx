import {Metadata} from "next";
import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";
import {hasRole} from "@/lib/session-utils";
import {courseService} from "@/services/course.service";
import {ArrowRight, BookOpen, Plus} from "lucide-react"
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {CourseCard} from "@/components/shared/course-card";
import {Card} from "@/components/ui/card";
import {ApiError} from "@/services/api-error";

export const metadata: Metadata = { title: "Painel do instrutor" }

export default async function InstructorPage() {
    const session = await getSession()
    if (!session.authenticated) {
        redirect("/login?next=/instructor")
    }
    if (!hasRole(session, "INSTRUCTOR", "ADMIN")) {
        redirect("/student")
    }
    let courses
    try {
        courses = hasRole(session, "ADMIN")
            ? await courseService.listCoursesAdmin({page: 0, size: 100})
            : await courseService.listCoursesPrivate({page: 0, size: 100})
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            redirect("/login?next=/instructor")
        }
        if (error instanceof ApiError && error.status === 403) {
            redirect("/student")
        }

        throw error
    }

    return (
        <main className="content-grid py-12 sm:py-16">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Gestão de conteúdo</p>
                    <h1 className="text-4xl font-bold tracking-tight">Painel do instrutor</h1>
                    <p className="mt-3 text-muted-foreground">Crie, organize e publique experiências de aprendizagem.</p>
                </div>
                <Link href="/instructor/courses/new" className={buttonVariants()}><Plus />Novo curso</Link>
            </div>
            {courses.content.length ?
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.content.map((course) =>
                        <div key={course.id}>
                            <CourseCard course={course} href={`/instructor/courses/${course.id}`} />
                            <Link href={`/courses/${course.id}`} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Visualizar curso <ArrowRight className="size-4" /></Link>
                        </div>)}
                </div> :
                <Card className="flex flex-col items-center border-dashed p-12 text-center">
                    <BookOpen className="size-12 text-primary/40" />
                    <h2 className="mt-5 text-xl font-semibold">Nenhum curso criado</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Comece definindo o título, a descrição e a capa.</p>
                    <Link href="/instructor/courses/new" className={buttonVariants({ className: "mt-6" })}><Plus />Criar primeiro curso</Link>
                </Card>}
        </main>
    )
}