import {Metadata} from "next";
import {getSession} from "@/lib/session";
import {notFound, redirect} from "next/navigation";
import {hasRole} from "@/lib/session-utils";
import {BuilderModule, CourseBuilder} from "@/components/instructor/course-builder";
import {courseService} from "@/services/course.service";
import {moduleService} from "@/services/module.service";
import {lessonService} from "@/services/lesson.service";
import {ApiError} from "@/services/api-error";

export const metadata: Metadata = { title: "Editor de curso" }

export default async function CourseBuilderPage({ params }: { params: Promise<{ courseId: string }> }) {
    const session = await getSession();
    if (!session.authenticated) {
        redirect("/login?next=/instructor")
    }
    if (!hasRole(session, "INSTRUCTOR", "ADMIN")) {
        redirect("/student")
    }
    const courseId = Number((await params).courseId);
    if (!Number.isSafeInteger(courseId) || courseId <= 0) {
        notFound()
    }
    let course
    let modules: BuilderModule[]

    try {
        const [courseData, modulesPage] = await Promise.all([
            courseService.findCourseById(courseId),
            moduleService.listModulesByCourse(courseId, 0, 100),
        ])

        course = courseData
        modules = await Promise.all(modulesPage.content.map(async (module) => {
            const lessonsPage = await lessonService.listByModule(module.id, 0, 100)
            const lessons = await Promise.all(lessonsPage.content.map(async (lesson) => {
                const details = await lessonService.findById(lesson.id)
                return {...lesson, hasVideo: Boolean(details.videoUrl)}
            }))

            return {...module, lessons}
        }))
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                redirect(`/login?next=/instructor/courses/${courseId}`)
            }
            if (error.status === 403) {
                redirect("/instructor")
            }
            if (error.status === 404) {
                notFound()
            }
        }

        throw error
    }

    return (
        <main className="content-grid py-12 sm:py-16">
            <div className="mb-10">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Editor de curso</p>
                <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
                <p className="mt-3 text-muted-foreground">Organize o conteúdo e publique quando todos os requisitos estiverem completos.</p>
            </div>
            <CourseBuilder initialCourse={course} initialModules={modules} />
        </main>
    )
}
