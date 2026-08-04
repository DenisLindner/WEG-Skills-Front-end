import {Metadata} from "next";
import {courseService} from "@/services/course.service";
import {moduleService} from "@/services/module.service";
import {reviewService} from "@/services/review.service";
import {enrollmentService} from "@/services/enrollment.service";
import {ApiError} from "@/services/api-error";
import {notFound, redirect} from "next/navigation";
import {getSession} from "@/lib/session";
import {BookOpen, CheckCircle2, ImageIcon, Layers3, Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {EnrollButton} from "@/components/courses/enroll-button";
import {Card} from "@/components/ui/card";
import {ReviewForm} from "@/components/courses/review-form";
import type {SpringPage} from "@/types/common/spring-page";

export const metadata: Metadata = { title: "Detalhes do curso" }

const PAGE_SIZE = 100;

async function loadAllPages<T>(loadPage: (page: number, size: number) => Promise<SpringPage<T>>) {
    const firstPage = await loadPage(0, PAGE_SIZE);

    if (firstPage.totalPages <= 1) {
        return firstPage.content;
    }

    const remainingPages = await Promise.all(
        Array.from(
            {length: firstPage.totalPages - 1},
            (_, index) => loadPage(index + 1, PAGE_SIZE),
        ),
    );

    return [
        ...firstPage.content,
        ...remainingPages.flatMap((page) => page.content),
    ];
}

async function loadCourseOrNotFound(courseId: number) {
    try {
        return await courseService.findCourseById(courseId);
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            notFound();
        }

        throw error;
    }
}

async function isEnrolled(courseId: number) {
    let page = 0;

    while (true) {
        const enrollments = await enrollmentService.mineEnrollment(page, PAGE_SIZE);

        if (enrollments.content.some((item) => item.courseId === courseId)) {
            return true;
        }

        if (enrollments.last || page + 1 >= enrollments.totalPages) {
            return false;
        }

        page += 1;
    }
}

async function loadCourse(courseId: number) {
    try {
        return await Promise.all([
            loadCourseOrNotFound(courseId),
            loadAllPages((page, size) => moduleService.listModulesByCourse(courseId, page, size)),
            loadAllPages((page, size) => reviewService.listReviewsByCourse(courseId, page, size)),
            isEnrolled(courseId),
        ]);
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            redirect(`/login?next=/courses/${courseId}`);
        }

        throw error;
    }
}

export default async function CourseDetailsPage({ params }: { params: Promise<{ courseId: string }> }) {
    const session = await getSession()
    const courseId = Number((await params).courseId)
    if (!Number.isSafeInteger(courseId) || courseId <= 0) {
        notFound()
    }
    if (!session.authenticated) {
        redirect(`/login?next=/courses/${courseId}`)
    }

    const [course, modules, allReviews, enrolled] = await loadCourse(courseId)
    const reviews = allReviews.slice(0, 6)

    return (
        <main>
            <section className="bg-[#003057] py-14 text-white">
                <div className="content-grid grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                    <div className="flex aspect-video items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl">
                        {course.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={course.imageUrl} alt={course.title + " image"} className="h-full w-full object-cover" />
                        ) : <ImageIcon className="size-16 text-white/30" />}
                    </div>
                    <div>
                        <Badge className="mb-5 bg-sky-300/15 text-sky-100">Curso publicado</Badge>
                        <h1 className="text-balance text-4xl font-bold sm:text-5xl">{course.title}</h1>
                        <p className="mt-5 text-lg leading-relaxed text-white/72">{course.description || "Curso técnico disponível para sua jornada de aprendizagem."}</p>
                        <div className="mt-7 flex flex-wrap gap-5 text-sm text-white/75">
                            <span className="flex items-center gap-2"><Layers3 className="size-4" />{modules.length} módulos</span>
                            <span className="flex items-center gap-2"><Star className="size-4 fill-amber-400 text-amber-400" />{course.rating === null ? "Sem avaliações" : `${course.rating.toFixed(1)}/10`}</span>
                            <span className="flex items-center gap-2"><CheckCircle2 className="size-4" />Certificado ao concluir</span>
                        </div>
                        <div className="mt-8">
                            <EnrollButton courseId={courseId} enrolled={enrolled} />
                        </div>
                    </div>
                </div>
            </section>
            <section id="course-content" className="content-grid grid scroll-mt-24 gap-10 py-16 lg:grid-cols-[1fr_360px]">
                <div>
                    <h2 className="text-2xl font-bold">Conteúdo do curso</h2>
                    <div className="mt-6 space-y-3">
                        {modules.length ? modules.map((module) => (
                            <Card key={module.id} className="flex items-center gap-4 p-5">
                                <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                                    <BookOpen className="size-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-primary">Módulo {module.position}</p>
                                    <h3 className="font-semibold">{module.title}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{module.description || "Conteúdo do módulo"}</p>
                                </div>
                            </Card>
                        )) : <Card className="border-dashed p-8 text-center text-muted-foreground">Os módulos serão apresentados aqui.</Card>}
                    </div>
                </div>
                <aside>
                    <h2 className="text-2xl font-bold">Avaliações</h2>
                    <div className="mt-6 space-y-3">
                        {reviews.map((review) =>
                            <Card key={review.id} className="p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-9 items-center justify-center rounded-full bg-secondary font-semibold text-primary">{review.userName.charAt(0).toUpperCase()}</div>
                                        <span className="text-sm font-medium">{review.userName}</span>
                                    </div>
                                    <span className="flex items-center gap-1 text-sm font-bold"><Star className="size-4 fill-amber-400 text-amber-400" />{review.rate}</span>
                                </div>
                            </Card>)}
                        {!reviews.length && <p className="text-sm text-muted-foreground">Este curso ainda não recebeu avaliações.</p>}
                    </div>
                    {enrolled && <div className="mt-6"><ReviewForm courseId={courseId} /></div>}
                </aside>
            </section>
        </main>
    )
}
