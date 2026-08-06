import {Metadata} from "next";
import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";
import {enrollmentService} from "@/services/enrollment.service";
import {courseService} from "@/services/course.service";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {ArrowRight, BookOpenCheck, GraduationCap} from "lucide-react";
import {Card} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";

export const metadata: Metadata = { title: "Meu aprendizado" }

export default async function StudentDashboard() {
    const session = await getSession()
    if (!session.authenticated) {
        redirect("/login?next=/student")
    }
    const enrollments = await enrollmentService.mineEnrollment(0, 100)
    const items = await Promise.all(enrollments.content.map(async (enrollment) => {
        const course = await courseService.findCourseById(enrollment.courseId)
        let progress = null
        try {
            progress = await courseService.progressCourse(enrollment.courseId)
        } catch {
            progress = null
        }
        return { enrollment, course, progress }
    }))

    return (
        <main className="content-grid py-12 sm:py-16">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Área do aluno</p>
                    <h1 className="text-4xl font-bold tracking-tight">Meu aprendizado</h1>
                    <p className="mt-3 text-muted-foreground">Continue de onde parou e acompanhe sua evolução.</p>
                </div>
                <Link href="/courses" className={buttonVariants({ variant: "outline" })}>Explorar mais cursos <ArrowRight /></Link>
            </div>
            {items.length ?
                <div className="grid gap-5 lg:grid-cols-2">{items.map(({ course, progress }) =>
                    <Card key={course.id} className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                                <BookOpenCheck className="size-6" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h2 className="truncate text-lg font-semibold">{course.title}</h2>
                                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{course.description || "Curso em andamento"}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="mb-2 flex justify-between text-sm">
                                <span className="text-muted-foreground">Progresso</span>
                                <strong>{Math.round(progress?.percentage ?? 0)}%</strong>
                            </div>
                            <Progress value={progress?.percentage ?? 0} />
                        </div>
                        <Link href={`/student/course/${course.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{progress?.percentage ? "Continuar curso" : "Começar curso"}<ArrowRight className="size-4" /></Link>
                    </Card>)}
                </div> :
                <Card className="flex flex-col items-center border-dashed p-12 text-center">
                    <GraduationCap className="size-12 text-primary/40" />
                    <h2 className="mt-5 text-xl font-semibold">Sua jornada começa aqui</h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">Você ainda não está matriculado em nenhum curso.</p>
                    <Link href="/courses" className={buttonVariants({ className: "mt-6" })}>Ver cursos disponíveis</Link>
                </Card>}
        </main>
    )
}
