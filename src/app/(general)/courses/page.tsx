import {Metadata} from "next";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CourseCard} from "@/components/shared/course-card";
import {Card} from "@/components/ui/card";
import {courseService} from "@/services/course.service";
import {redirect} from "next/navigation";
import {getSession} from "@/lib/session";
import Form from "next/form";
import {PaginationLinks} from "@/components/shared/pagination-links";
import {ApiError} from "@/services/api-error";

export const metadata: Metadata = { title: "Cursos" }

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ title?: string; page?: string }> }) {
    const session = await getSession()
    if (!session.authenticated) {
        redirect("/login?next=/courses")
    }
    const query = await searchParams
    const requestedPage = Number(query.page)
    const page = Number.isSafeInteger(requestedPage) && requestedPage >= 0 ? requestedPage : 0
    const title = query.title?.trim().slice(0, 128)
    const titleError = title && title.length < 3
        ? "Informe ao menos 3 caracteres para buscar por título."
        : undefined

    let courses
    try {
        courses = await courseService.listCoursesPublished({
            page: titleError ? 0 : page,
            size: 12,
            title: titleError ? undefined : title
        })
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            redirect("/login?next=/courses")
        }

        throw error
    }

    return (
        <main className="content-grid py-12 sm:py-16">
            <div className="mb-10 max-w-2xl">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Catálogo</p>
                <h1 className="text-4xl font-bold tracking-tight">Encontre seu próximo aprendizado</h1>
                <p className="mt-3 text-muted-foreground">Explore os cursos publicados e avance nas competências que fazem diferença.</p>
            </div>
            <Form className="mb-10 flex max-w-2xl gap-2" action="/courses">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            name="title"
                            defaultValue={title}
                            placeholder="Buscar por título"
                            className="pl-9"
                            aria-invalid={Boolean(titleError)}
                            aria-describedby={titleError ? "course-search-error" : undefined}
                        />
                    </div>
                    {titleError && <p id="course-search-error" className="mt-2 text-sm text-destructive">{titleError}</p>}
                </div>
                <Button type="submit">Buscar</Button>
            </Form>
            {courses.content.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{courses.content.map(course =>
                <CourseCard key={course.id} course={course} />)}</div> :
                <Card className="border-dashed p-12 text-center"><h2 className="font-semibold">Nenhum curso encontrado</h2><p className="mt-2 text-sm text-muted-foreground">Tente outro termo ou volte ao catálogo completo.</p></Card>}
            <PaginationLinks page={courses.number} totalPages={courses.totalPages} pathname="/courses" query={{ title: titleError ? undefined : title }} />
        </main>
    )
}
