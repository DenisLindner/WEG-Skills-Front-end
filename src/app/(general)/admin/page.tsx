import {Metadata} from "next";
import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";
import {hasRole} from "@/lib/session-utils";
import {courseService} from "@/services/course.service";
import {userService} from "@/services/user.service";
import {ArrowRight, BookCopy, ShieldCheck, Users} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {CreateInstructorForm} from "@/components/admin/create-instructor-form";
import {InstructorList} from "@/components/admin/instructor-list";
import {PaginationLinks} from "@/components/shared/pagination-links";
import {ApiError} from "@/services/api-error";

export const metadata: Metadata = { title: "Administração" }

const COURSES_PAGE_SIZE = 10
const INSTRUCTORS_PAGE_SIZE = 20

function pageNumber(value?: string) {
    const page = Number(value ?? 0)
    return Number.isSafeInteger(page) && page >= 0 ? page : 0
}

async function loadAdminData(coursesPage: number, instructorsPage: number) {
    try {
        return await Promise.all([
                courseService.listCoursesAdmin({page: coursesPage, size: COURSES_PAGE_SIZE}),
                userService.listInstructors({page: instructorsPage, size: INSTRUCTORS_PAGE_SIZE}),
        ])
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                redirect("/login?next=/admin")
            }
            if (error.status === 403) {
                redirect("/student")
            }
        }

        throw error
    }
}

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{coursesPage?: string; instructorsPage?: string}>
}) {
    const session = await getSession();
    if (!session.authenticated) {
        redirect("/login?next=/admin")
    }
    if (!hasRole(session, "ADMIN")) {
        redirect("/student")
    }

    const query = await searchParams
    const coursesPage = pageNumber(query.coursesPage)
    const instructorsPage = pageNumber(query.instructorsPage)
    const [courses, instructors] = await loadAdminData(coursesPage, instructorsPage)

    return (
        <main className="content-grid py-12 sm:py-16">
            <div className="mb-10">
                <div className="mb-3 flex items-center gap-2 text-primary">
                    <ShieldCheck className="size-5" />
                    <span className="text-sm font-bold uppercase tracking-[0.18em]">Acesso administrativo</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Administração</h1>
                <p className="mt-3 text-muted-foreground">Gerencie instrutores e acompanhe todo o catálogo.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Novo instrutor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CreateInstructorForm />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="size-5 text-primary" />Instrutores
                            <Badge>{instructors.totalElements}</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InstructorList instructors={instructors.content} />
                        <PaginationLinks
                            page={instructors.number}
                            totalPages={instructors.totalPages}
                            pathname="/admin"
                            pageParam="instructorsPage"
                            query={{coursesPage: String(courses.number)}}
                        />
                    </CardContent>
                </Card>
            </div>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookCopy className="size-5 text-primary" />Todos os cursos
                        <Badge>{courses.totalElements}</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="divide-y divide-border">
                        {courses.content.map((course) =>
                            <div key={course.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-semibold">{course.title}</p>
                                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{course.description || "Sem descrição"}</p>
                                </div>
                                <div className="flex items-center justify-between gap-4 sm:justify-end">
                                    <Badge className={course.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : ""}>{course.status === "PUBLISHED" ? "Publicado" : "Rascunho"}</Badge>
                                    <Link href={"/instructor/courses/" + course.id} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Gerenciar<ArrowRight className="size-4" /></Link>
                                </div>
                            </div>
                        )}
                        {!courses.content.length && <p className="py-8 text-center text-sm text-muted-foreground">Nenhum curso cadastrado.</p>}
                    </div>
                    <PaginationLinks
                        page={courses.number}
                        totalPages={courses.totalPages}
                        pathname="/admin"
                        pageParam="coursesPage"
                        query={{instructorsPage: String(instructors.number)}}
                    />
                </CardContent>
            </Card>
        </main>
    )
}
