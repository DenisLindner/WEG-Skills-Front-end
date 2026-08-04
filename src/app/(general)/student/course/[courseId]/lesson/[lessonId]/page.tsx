import {Metadata} from "next";
import {getSession} from "@/lib/session";
import {notFound, redirect} from "next/navigation";
import {lessonService} from "@/services/lesson.service";
import {courseService} from "@/services/course.service";
import {enrollmentService} from "@/services/enrollment.service";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {LessonPlayer} from "@/components/student/lesson-player";

export const metadata: Metadata = { title: "Aula" }

export default async function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
    const session = await getSession();
    if (!session.authenticated) {
        redirect("/login?next=/student")
    }
    const values = await params;
    const courseId = Number(values.courseId);
    const lessonId = Number(values.lessonId)
    if (![courseId, lessonId].every((value) => Number.isSafeInteger(value) && value > 0)) {
        notFound()
    }

    const enrollments = await enrollmentService.mineEnrollment(0, 100);
    if (!enrollments.content.some((item) => item.courseId === courseId)) {
        redirect(`/courses/${courseId}`)
    }

    const [lesson, progress] = await Promise.all(
        [lessonService.findById(lessonId), courseService.progressCourse(courseId)]
    )
    const completed = progress.lessons.some((item) => item.lessonId === lessonId)
    return (
        <main className="content-grid py-10 sm:py-14">
            <Link href={`/student/course/${courseId}`} className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="size-4" />Voltar ao conteúdo</Link>
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <section>
                    <LessonPlayer lesson={lesson} courseId={courseId} completed={completed} />
                </section>
                <aside>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Aula {lesson.position}</p>
                    <h1 className="mt-2 text-3xl font-bold">{lesson.title}</h1>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{lesson.description || "Acompanhe o conteúdo em vídeo e marque a aula como concluída ao finalizar."}</p>
                </aside>
            </div>
        </main>
    )
}
