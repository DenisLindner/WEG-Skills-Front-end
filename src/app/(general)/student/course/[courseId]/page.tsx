import {Metadata} from "next";
import {getSession} from "@/lib/session";
import {notFound, redirect} from "next/navigation";
import {enrollmentService} from "@/services/enrollment.service";
import {courseService} from "@/services/course.service";
import {moduleService} from "@/services/module.service";
import {lessonService} from "@/services/lesson.service";
import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {BookOpen, CheckCircle2, Circle, PlayCircle} from "lucide-react";
import {Progress} from "@/components/ui/progress";
import {CertificateButton} from "@/components/student/certificate-button";
import {ApiError} from "@/services/api-error";

export const metadata: Metadata = { title: "Curso" }

export default async function StudentCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
    const session = await getSession();
    if (!session.authenticated) {
        redirect("/login?next=/student")
    }
    const courseId = Number((await params).courseId);
    if (!Number.isSafeInteger(courseId) || courseId <= 0) {
        notFound()
    }
    try {
        await enrollmentService.mineEnrollmentByCourse(courseId);
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            redirect(`/courses/${courseId}`);
        }

        throw error;
    }
    const [course, modules, progress] = await Promise.all(
        [courseService.findCourseById(courseId), moduleService.listModulesByCourse(courseId, 0, 100), courseService.progressCourse(courseId)]
    )
    const moduleLessons = await Promise.all(
        modules.content.map(async (module) => (
            { module, lessons: await lessonService.listByModule(module.id, 0, 100) }
        ))
    )
    const completed = new Set(progress.lessons.map((item) => item.lessonId))

    return (
        <main className="content-grid py-12 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <section>
                    <Badge>Em andamento</Badge>
                    <h1 className="mt-4 text-4xl font-bold tracking-tight">{course.title}</h1>
                    <p className="mt-3 max-w-3xl text-muted-foreground">{course.description}</p>
                    <div className="mt-10 space-y-5">
                        {moduleLessons.map(({ module, lessons }) =>
                            <Card key={module.id} className="overflow-hidden">
                                <div className="flex items-center gap-4 border-b border-border bg-secondary/45 p-5">
                                    <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white text-primary">
                                        {module.imageUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={module.imageUrl} alt={"Imagem do módulo " + module.title} className="h-full w-full object-cover" />
                                        ) : (
                                            <BookOpen className="size-5" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold uppercase tracking-wide text-primary">Módulo {module.position}</p>
                                        <h2 className="mt-1 text-lg font-semibold">{module.title}</h2>
                                    </div>
                                </div>
                                <div className="divide-y divide-border">{lessons.content.map((lesson) =>
                                { const done = completed.has(lesson.id);
                                    return (
                                        <Link key={lesson.id} href={`/student/course/${courseId}/lesson/${lesson.id}`} className="flex items-center gap-4 p-5 transition hover:bg-secondary/35">
                                            <span className={done ? "text-emerald-600" : "text-muted-foreground"}>{done ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}</span>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">{lesson.position}. {lesson.title}</p>
                                                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{lesson.description || "Aula do módulo"}</p>
                                            </div>
                                            <PlayCircle className="size-5 text-primary" />
                                        </Link>
                                    )})}
                                    {!lessons.content.length && <p className="p-5 text-sm text-muted-foreground">Nenhuma aula disponível.</p>}
                                </div>
                            </Card>)}
                    </div>
                </section>
                <aside className="lg:sticky lg:top-24 lg:h-fit">
                    <Card className="p-6">
                        <p className="text-sm font-medium text-muted-foreground">Progresso geral</p>
                        <p className="mt-2 text-4xl font-bold text-primary">{Math.round(progress.percentage)}%</p>
                        <Progress value={progress.percentage} className="mt-4" />
                        <p className="mt-3 text-sm text-muted-foreground">{progress.completedLessons} de {progress.totalLessons} aulas concluídas</p>
                        <div className="mt-6 border-t border-border pt-6">
                            <CertificateButton courseId={courseId} enabled={progress.totalLessons > 0 && progress.completedLessons === progress.totalLessons} />
                        </div>
                    </Card>
                </aside>
            </div>
        </main>
    )
}
