"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {
    ArrowDown,
    ArrowUp,
    CheckCircle2,
    FileVideo,
    ImageIcon,
    ImagePlus,
    Layers3,
    LoaderCircle,
    Pencil,
    Plus,
    Save,
    Send,
    Trash2,
} from "lucide-react";
import {Module} from "@/types/module/module";
import {Lesson} from "@/types/lesson/lesson";
import {Course} from "@/types/course/course";
import {ApiFieldErrors} from "@/types/common/api-field-errors";
import {PublicApiError} from "@/types/common/public-api-error";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/text-area";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {imageTypes, maxImageSize, maxVideoSize, uploadMedia, videoTypes} from "@/lib/upload";
import {updateCourseAction} from "@/actions/course/update-course-action";
import {publishCourseAction} from "@/actions/course/publish-course-action";
import {deleteCourseAction} from "@/actions/course/delete-course-action";
import {createCourseImageUploadAction} from "@/actions/course/create-course-image-upload-action";
import {createModuleAction} from "@/actions/module/create-module-action";
import {updateModuleAction} from "@/actions/module/update-module-action";
import {deleteModuleAction} from "@/actions/module/delete-module-action";
import {repositionModulesAction} from "@/actions/module/reposition-modules-action";
import {createModuleImageUploadAction} from "@/actions/module/create-module-image-upload-action";
import {createLessonAction} from "@/actions/lesson/create-lesson-action";
import {updateLessonAction} from "@/actions/lesson/update-lesson-action";
import {deleteLessonAction} from "@/actions/lesson/delete-lesson-action";
import {repositionLessonsAction} from "@/actions/lesson/reposition-lessons-action";
import {createLessonVideoUploadAction} from "@/actions/lesson/create-lesson-video-upload-action";
import {completeUploadAction} from "@/actions/media/complete-upload-action";

export type BuilderLesson = Lesson & {hasVideo: boolean}
export type BuilderModule = Module & {lessons: BuilderLesson[]}

type Notice = {
    kind: "success" | "error"
    text: string
    area: "course" | "content"
}

function noticeArea(key: string): Notice["area"] {
    const contentKeys = ["new-module", "reorder-modules"]
    const contentPrefixes = [
        "edit-module-",
        "new-lesson-",
        "edit-lesson-",
        "module-image-",
        "video-",
        "delete-module-",
        "delete-lesson-",
        "reorder-lessons-",
    ]

    return contentKeys.includes(key) || contentPrefixes.some((prefix) => key.startsWith(prefix))
        ? "content"
        : "course"
}

function NoticeMessage({notice}: {notice: Notice}) {
    return (
        <div
            className={notice.kind === "error"
                ? "rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive"
                : "rounded-xl border border-primary/15 bg-secondary p-4 text-sm"}
            role={notice.kind === "error" ? "alert" : "status"}
            aria-live="polite"
        >
            {notice.text}
        </div>
    )
}

function contentInput(form: HTMLFormElement) {
    const data = new FormData(form)
    const title = String(data.get("title") ?? "").trim()
    const description = String(data.get("description") ?? "").trim()
    const errors: ApiFieldErrors = {}

    if (title.length < 3 || title.length > 128) {
        errors.title = "Informe um título entre 3 e 128 caracteres."
    }
    if (description && (description.length < 3 || description.length > 255)) {
        errors.description = "A descrição deve ter entre 3 e 255 caracteres."
    }

    return {title, description, errors}
}

function translatedErrors(error: PublicApiError) {
    const errors = {...error.fieldErrors}

    if (errors.title) errors.title = "Informe um título entre 3 e 128 caracteres."
    if (errors.description) errors.description = "A descrição deve ter entre 3 e 255 caracteres."

    return errors
}

export function CourseBuilder({initialCourse, initialModules}: {initialCourse: Course; initialModules: BuilderModule[]}) {
    const [course, setCourse] = useState(initialCourse)
    const [modules, setModules] = useState(initialModules)
    const [pending, setPending] = useState("")
    const [editing, setEditing] = useState("")
    const [notice, setNotice] = useState<Notice | null>(null)
    const [formErrors, setFormErrors] = useState<Record<string, ApiFieldErrors>>({})
    const router = useRouter()
    const busy = pending !== ""
    const lessonCount = modules.reduce((total, module) => total + module.lessons.length, 0)
    const emptyModules = modules.filter((module) => module.lessons.length === 0)
    const allModulesHaveLessons = modules.length > 0 && emptyModules.length === 0
    const allLessonsHaveVideo = lessonCount > 0 && modules.every((module) => module.lessons.every((lesson) => lesson.hasVideo))
    const publicationRequirements = [
        {label: "Capa do curso", complete: Boolean(course.imageUrl)},
        {label: "Ao menos um módulo", complete: modules.length > 0},
        {label: "Ao menos uma aula em cada módulo", complete: allModulesHaveLessons},
        {label: "Vídeo em todas as aulas", complete: allLessonsHaveVideo},
    ]

    function setErrors(key: string, errors: ApiFieldErrors) {
        setFormErrors((current) => ({...current, [key]: errors}))
    }

    function showNotice(key: string, kind: Notice["kind"], text: string) {
        setNotice({kind, text, area: noticeArea(key)})
    }

    function handleFailure(key: string, status: number, error: PublicApiError, fallback: string) {
        if (status === 401) {
            router.replace(`/login?next=/instructor/courses/${course.id}`)
            router.refresh()
            return
        }
        if (status === 403) {
            showNotice(key, "error", "Você não tem permissão para alterar este curso.")
            return
        }

        const errors = translatedErrors(error)
        setErrors(key, errors)
        showNotice(key, "error", Object.keys(errors).length > 0 ? "Verifique os campos destacados." : fallback)
    }

    async function run(key: string, action: () => Promise<void>) {
        if (busy) return

        setPending(key)
        setNotice(null)
        setErrors(key, {})

        try {
            await action()
        } catch (error) {
            console.error("Course builder operation failed", error)
            showNotice(key, "error", "Não foi possível concluir a operação. Tente novamente.")
        } finally {
            setPending("")
        }
    }

    async function saveCourse(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const key = "course"
        const {title, description, errors} = contentInput(event.currentTarget)

        if (Object.keys(errors).length > 0) {
            setErrors(key, errors)
            showNotice(key, "error", "Verifique os campos destacados.")
            return
        }

        await run(key, async () => {
            const result = await updateCourseAction(course.id, {
                title,
                ...(description ? {description} : {}),
            })

            if (!result.success) {
                const fallback = result.status === 409
                    ? "Já existe um curso com esse título."
                    : "Não foi possível salvar os dados do curso."
                handleFailure(key, result.status, result.error, fallback)
                return
            }

            setCourse(result.data)
            showNotice(key, "success", "Dados do curso salvos.")
        })
    }

    async function uploadCover(file: File) {
        if (!imageTypes.includes(file.type) || file.size <= 0 || file.size > maxImageSize) {
            showNotice("cover", "error", "Escolha uma imagem JPEG, PNG ou WebP de até 5 MB.")
            return
        }

        await run("cover", async () => {
            const ticket = await createCourseImageUploadAction(course.id, {
                fileName: file.name,
                contentType: file.type,
                size: file.size,
            })
            if (!ticket.success) {
                handleFailure("cover", ticket.status, ticket.error, "Não foi possível preparar o envio da capa.")
                return
            }

            await uploadMedia(ticket.data, file)
            const completion = await completeUploadAction(ticket.data.mediaId, "course", course.id)
            if (!completion.success) {
                handleFailure("cover", completion.status, completion.error, "A capa foi enviada, mas não foi possível concluir a atualização.")
                return
            }

            setCourse((current) => ({...current, imageUrl: URL.createObjectURL(file)}))
            showNotice("cover", "success", "Capa atualizada.")
        })
    }

    async function createModule(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const key = "new-module"
        const {title, description, errors} = contentInput(form)

        if (Object.keys(errors).length > 0) {
            setErrors(key, errors)
            showNotice(key, "error", "Verifique os campos destacados.")
            return
        }

        await run(key, async () => {
            const result = await createModuleAction({
                courseId: course.id,
                title,
                ...(description ? {description} : {}),
            })
            if (!result.success) {
                handleFailure(key, result.status, result.error, result.status === 409 ? "Já existe um módulo com esse título." : "Não foi possível criar o módulo.")
                return
            }

            setModules((items) => [...items, {...result.data, lessons: []}])
            setCourse((current) => ({...current, status: "DRAFT"}))
            showNotice(key, "success", "Módulo adicionado.")
            form.reset()
        })
    }

    async function updateModule(moduleId: number, event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const key = `edit-module-${moduleId}`
        const {title, description, errors} = contentInput(event.currentTarget)

        if (Object.keys(errors).length > 0) {
            setErrors(key, errors)
            showNotice(key, "error", "Verifique os campos destacados.")
            return
        }

        await run(key, async () => {
            const result = await updateModuleAction(moduleId, {
                title,
                ...(description ? {description} : {}),
            })
            if (!result.success) {
                handleFailure(key, result.status, result.error, result.status === 409 ? "Já existe um módulo com esse título." : "Não foi possível atualizar o módulo.")
                return
            }

            setModules((items) => items.map((item) => item.id === moduleId ? {...item, ...result.data} : item))
            setEditing("")
            showNotice(key, "success", "Módulo atualizado.")
        })
    }

    async function createLesson(moduleId: number, event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const key = `new-lesson-${moduleId}`
        const {title, description, errors} = contentInput(form)

        if (Object.keys(errors).length > 0) {
            setErrors(key, errors)
            showNotice(key, "error", "Verifique os campos destacados.")
            return
        }

        await run(key, async () => {
            const result = await createLessonAction({
                moduleId,
                title,
                ...(description ? {description} : {}),
            })
            if (!result.success) {
                handleFailure(key, result.status, result.error, result.status === 409 ? "Já existe uma aula com esse título neste módulo." : "Não foi possível criar a aula.")
                return
            }

            setModules((items) => items.map((item) => item.id === moduleId
                ? {...item, lessons: [...item.lessons, {...result.data, hasVideo: false}]}
                : item))
            setCourse((current) => ({...current, status: "DRAFT"}))
            showNotice(key, "success", "Aula adicionada.")
            form.reset()
        })
    }

    async function updateLesson(moduleId: number, lessonId: number, event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const key = `edit-lesson-${lessonId}`
        const {title, description, errors} = contentInput(event.currentTarget)

        if (Object.keys(errors).length > 0) {
            setErrors(key, errors)
            showNotice(key, "error", "Verifique os campos destacados.")
            return
        }

        await run(key, async () => {
            const result = await updateLessonAction(lessonId, {
                title,
                ...(description ? {description} : {}),
            })
            if (!result.success) {
                handleFailure(key, result.status, result.error, result.status === 409 ? "Já existe uma aula com esse título neste módulo." : "Não foi possível atualizar a aula.")
                return
            }

            setModules((items) => items.map((item) => item.id === moduleId
                ? {...item, lessons: item.lessons.map((lesson) => lesson.id === lessonId ? {...lesson, ...result.data} : lesson)}
                : item))
            setEditing("")
            showNotice(key, "success", "Aula atualizada.")
        })
    }

    async function uploadModuleImage(moduleId: number, file: File) {
        const key = "module-image-" + moduleId
        if (!imageTypes.includes(file.type) || file.size <= 0 || file.size > maxImageSize) {
            showNotice(key, "error", "Escolha uma imagem JPEG, PNG ou WebP de até 5 MB.")
            return
        }

        await run(key, async () => {
            const ticket = await createModuleImageUploadAction(moduleId, {
                fileName: file.name,
                contentType: file.type,
                size: file.size,
            })
            if (!ticket.success) {
                handleFailure(key, ticket.status, ticket.error, "Não foi possível preparar o envio da imagem.")
                return
            }

            await uploadMedia(ticket.data, file)
            const completion = await completeUploadAction(ticket.data.mediaId, "module", moduleId)
            if (!completion.success) {
                handleFailure(key, completion.status, completion.error, "A imagem foi enviada, mas não foi possível concluir a atualização.")
                return
            }

            const preview = URL.createObjectURL(file)
            setModules((items) => items.map((item) => item.id === moduleId ? {...item, imageUrl: preview} : item))
            showNotice(key, "success", "Imagem do módulo atualizada.")
        })
    }

    async function uploadVideo(moduleId: number, lessonId: number, file: File) {
        const key = "video-" + lessonId
        if (!videoTypes.includes(file.type) || file.size <= 0 || file.size > maxVideoSize) {
            showNotice(key, "error", "Escolha um vídeo MP4 de até 2 GiB.")
            return
        }

        await run(key, async () => {
            const ticket = await createLessonVideoUploadAction(lessonId, {
                fileName: file.name,
                contentType: file.type,
                size: file.size,
            })
            if (!ticket.success) {
                handleFailure(key, ticket.status, ticket.error, "Não foi possível preparar o envio do vídeo.")
                return
            }

            await uploadMedia(ticket.data, file)
            const completion = await completeUploadAction(ticket.data.mediaId, "lesson", lessonId)
            if (!completion.success) {
                handleFailure(key, completion.status, completion.error, "O vídeo foi enviado, mas não foi possível concluir a atualização.")
                return
            }

            setModules((items) => items.map((item) => item.id === moduleId
                ? {...item, lessons: item.lessons.map((lesson) => lesson.id === lessonId ? {...lesson, hasVideo: true} : lesson)}
                : item))
            showNotice(key, "success", "Vídeo enviado e confirmado.")
        })
    }

    async function removeModule(moduleId: number) {
        if (!window.confirm("Excluir este módulo e todas as aulas?")) {
            return
        }

        const key = `delete-module-${moduleId}`
        await run(key, async () => {
            const result = await deleteModuleAction(moduleId)
            if (!result.success) {
                handleFailure(key, result.status, result.error, "Não foi possível excluir o módulo.")
                return
            }

            setModules((items) => items.filter((item) => item.id !== moduleId))
            setCourse((current) => ({...current, status: "DRAFT"}))
            showNotice(key, "success", "Módulo excluído.")
        })
    }

    async function removeLesson(moduleId: number, lessonId: number) {
        if (!window.confirm("Excluir esta aula?")) {
            return
        }

        const key = `delete-lesson-${lessonId}`
        await run(key, async () => {
            const result = await deleteLessonAction(lessonId)
            if (!result.success) {
                handleFailure(key, result.status, result.error, "Não foi possível excluir a aula.")
                return
            }

            setModules((items) => items.map((item) => item.id === moduleId
                ? {...item, lessons: item.lessons.filter((lesson) => lesson.id !== lessonId)}
                : item))
            setCourse((current) => ({...current, status: "DRAFT"}))
            showNotice(key, "success", "Aula excluída.")
        })
    }

    async function moveModule(index: number, direction: -1 | 1) {
        const target = index + direction
        if (target < 0 || target >= modules.length) {
            return
        }

        const next = [...modules];
        [next[index], next[target]] = [next[target], next[index]]

        await run("reorder-modules", async () => {
            const result = await repositionModulesAction({parentId: course.id, orderedIds: next.map((item) => item.id)})
            if (!result.success) {
                handleFailure("reorder-modules", result.status, result.error, "Não foi possível reordenar os módulos.")
                return
            }

            setModules(next)
            showNotice("reorder-modules", "success", "Ordem dos módulos atualizada.")
        })
    }

    async function moveLesson(moduleId: number, index: number, direction: -1 | 1) {
        const owner = modules.find((item) => item.id === moduleId)
        if (!owner) return

        const target = index + direction
        if (target < 0 || target >= owner.lessons.length) {
            return
        }

        const lessons = [...owner.lessons];
        [lessons[index], lessons[target]] = [lessons[target], lessons[index]]
        const key = `reorder-lessons-${moduleId}`

        await run(key, async () => {
            const result = await repositionLessonsAction({parentId: moduleId, orderedIds: lessons.map((item) => item.id)})
            if (!result.success) {
                handleFailure(key, result.status, result.error, "Não foi possível reordenar as aulas.")
                return
            }

            setModules((items) => items.map((item) => item.id === moduleId ? {...item, lessons} : item))
            showNotice(key, "success", "Ordem das aulas atualizada.")
        })
    }

    async function publish() {
        const lessonsWithoutVideo = modules.reduce(
            (total, module) => total + module.lessons.filter((lesson) => !lesson.hasVideo).length,
            0,
        )
        const emptyModuleNames = emptyModules.map((module) => '"' + module.title + '"')
        const emptyModulesText = emptyModuleNames.length > 1
            ? emptyModuleNames.slice(0, -1).join(", ") + " e " + emptyModuleNames.at(-1)
            : emptyModuleNames[0]
        const missingRequirements = [
            !course.imageUrl ? "adicione uma capa ao curso" : "",
            modules.length === 0 ? "adicione ao menos um módulo" : "",
            modules.length > 0 && emptyModules.length > 0
                ? "adicione ao menos uma aula " + (emptyModules.length === 1 ? "ao módulo " : "aos módulos ") + emptyModulesText
                : "",
            lessonsWithoutVideo === 1 ? "envie o vídeo da aula que ainda está sem vídeo" : "",
            lessonsWithoutVideo > 1 ? "envie os vídeos das " + lessonsWithoutVideo + " aulas que ainda estão sem vídeo" : "",
        ].filter(Boolean)
        const requirementsText = missingRequirements.length > 1
            ? missingRequirements.slice(0, -1).join(", ") + " e " + missingRequirements.at(-1)
            : missingRequirements[0]
        const publicationFallback = requirementsText
            ? "Antes de publicar, " + requirementsText + "."
            : "O curso ainda não atende aos requisitos de publicação. Revise os itens indicados."

        if (missingRequirements.length > 0) {
            showNotice("publish", "error", publicationFallback)
            return
        }

        await run("publish", async () => {
            const result = await publishCourseAction(course.id)
            if (!result.success) {
                handleFailure("publish", result.status, result.error, result.status === 409
                    ? publicationFallback
                    : "Não foi possível publicar o curso.")
                return
            }

            setCourse(result.data)
            showNotice("publish", "success", "Curso publicado com sucesso.")
        })
    }

    async function removeCourse() {
        if (!window.confirm("Excluir este curso, todos os módulos e todas as aulas? Esta ação não pode ser desfeita.")) {
            return
        }

        await run("delete-course", async () => {
            const result = await deleteCourseAction(course.id)
            if (!result.success) {
                handleFailure("delete-course", result.status, result.error, "Não foi possível excluir o curso.")
                return
            }

            router.replace("/instructor")
            router.refresh()
        })
    }

    return (
        <div className="space-y-6">
            {notice?.area === "course" && <NoticeMessage notice={notice} />}

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
                <Card className="h-fit">
                    <CardHeader><CardTitle>Informações do curso</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={saveCourse} noValidate className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="course-title">Título</Label>
                                <Input id="course-title" name="title" defaultValue={course.title} disabled={busy} aria-invalid={Boolean(formErrors.course?.title)} aria-describedby={formErrors.course?.title ? "course-title-error" : undefined} />
                                {formErrors.course?.title && <p id="course-title-error" className="text-sm text-destructive">{formErrors.course.title}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="course-description">Descrição</Label>
                                <Textarea id="course-description" name="description" defaultValue={course.description ?? ""} disabled={busy} aria-invalid={Boolean(formErrors.course?.description)} aria-describedby={formErrors.course?.description ? "course-description-error" : undefined} />
                                {formErrors.course?.description && <p id="course-description-error" className="text-sm text-destructive">{formErrors.course.description}</p>}
                            </div>
                            <Button type="submit" disabled={busy}>{pending === "course" ? <LoaderCircle className="animate-spin" /> : <Save />}Salvar</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="h-fit overflow-hidden">
                    <CardHeader className="border-b border-border/70">
                        <div className="flex items-center justify-between gap-4">
                            <CardTitle>Publicação</CardTitle>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <span className={`size-2 rounded-full ${course.status === "PUBLISHED" ? "bg-emerald-500" : "bg-amber-500"}`} />
                                {course.status === "PUBLISHED" ? "Publicado" : "Rascunho"}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5 pt-6">
                        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary">
                            {course.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={course.imageUrl} alt={`Capa do curso ${course.title}`} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <ImageIcon className="size-9 text-primary/35" />
                                    <span className="text-xs font-medium">Nenhuma capa adicionada</span>
                                </div>
                            )}
                            <label className={`absolute inset-x-3 bottom-3 flex h-10 items-center justify-center gap-2 rounded-lg bg-black/65 px-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-black/75 ${busy ? "pointer-events-none opacity-60" : "cursor-pointer"}`}>
                                {pending === "cover" ? <LoaderCircle className="animate-spin" /> : <ImagePlus />}
                                {pending === "cover" ? "Enviando capa..." : course.imageUrl ? "Substituir capa" : "Adicionar capa"}
                                <input type="file" accept={imageTypes.join(",")} className="sr-only" disabled={busy} onChange={(event) => {
                                    const file = event.currentTarget.files?.[0]
                                    if (file) void uploadCover(file)
                                    event.currentTarget.value = ""
                                }} />
                            </label>
                        </div>

                        <div>
                            <p className="mb-3 text-sm font-semibold">Requisitos para publicação</p>
                            <ul className="space-y-2">
                                {publicationRequirements.map((requirement) => (
                                    <li key={requirement.label} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className={`size-4 ${requirement.complete ? "text-emerald-600" : "text-muted-foreground/35"}`} />
                                        <span className={requirement.complete ? "text-foreground" : "text-muted-foreground"}>{requirement.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button type="button" className="w-full" onClick={publish} disabled={busy}>{pending === "publish" ? <LoaderCircle className="animate-spin" /> : <Send />}{course.status === "PUBLISHED" ? "Validar publicação" : "Publicar curso"}</Button>
                        <div className="border-t border-border pt-4">
                            <Button type="button" variant="destructive" className="w-full" onClick={removeCourse} disabled={busy}>{pending === "delete-course" ? <LoaderCircle className="animate-spin" /> : <Trash2 />}Excluir curso</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center gap-3">
                <Layers3 className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Módulos e aulas</h2>
            </div>

            {notice?.area === "content" && <NoticeMessage notice={notice} />}

            {modules.map((module, moduleIndex) => {
                const moduleKey = `edit-module-${module.id}`

                return (
                    <Card key={module.id} className="overflow-hidden">
                        <div className="flex flex-wrap items-center gap-3 border-b border-border bg-secondary/45 p-5">
                            <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
                                {module.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={module.imageUrl} alt={`Imagem do módulo ${module.title}`} className="h-full w-full object-cover" />
                                ) : (
                                    <ImageIcon className="size-6 text-primary/30" />
                                )}
                            </div>
                            <div className="mr-auto">
                                <p className="text-xs font-bold uppercase text-primary">Módulo {moduleIndex + 1}</p>
                                <h3 className="font-semibold">{module.title}</h3>
                                <p className="mt-1 text-xs text-muted-foreground">{module.imageUrl ? "Imagem adicionada" : "Sem imagem"}</p>
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => void moveModule(moduleIndex, -1)} disabled={busy || moduleIndex === 0}><ArrowUp /><span className="sr-only">Mover módulo para cima</span></Button>
                            <Button type="button" variant="ghost" size="icon" onClick={() => void moveModule(moduleIndex, 1)} disabled={busy || moduleIndex === modules.length - 1}><ArrowDown /><span className="sr-only">Mover módulo para baixo</span></Button>
                            <Button type="button" variant="ghost" size="icon" onClick={() => setEditing(editing === moduleKey ? "" : moduleKey)} disabled={busy}><Pencil /><span className="sr-only">Editar módulo</span></Button>
                            <label className={`inline-flex items-center gap-2 rounded-lg p-2 text-xs font-semibold text-primary hover:bg-white ${busy ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
                                <ImagePlus className="size-4" />{pending === `module-image-${module.id}` ? "Enviando..." : module.imageUrl ? "Substituir imagem" : "Adicionar imagem"}
                                <input type="file" accept={imageTypes.join(",")} className="sr-only" disabled={busy} onChange={(event) => {
                                    const file = event.currentTarget.files?.[0]
                                    if (file) void uploadModuleImage(module.id, file)
                                    event.currentTarget.value = ""
                                }} />
                            </label>
                            <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => void removeModule(module.id)} disabled={busy}><Trash2 /><span className="sr-only">Excluir módulo</span></Button>
                        </div>

                        {editing === moduleKey && (
                            <form onSubmit={(event) => void updateModule(module.id, event)} noValidate className="grid gap-3 border-b border-border bg-muted/30 p-5 sm:grid-cols-[1fr_1.4fr_auto]">
                                <div>
                                    <Input name="title" defaultValue={module.title} disabled={busy} aria-label="Título do módulo" aria-invalid={Boolean(formErrors[moduleKey]?.title)} />
                                    {formErrors[moduleKey]?.title && <p className="mt-1 text-sm text-destructive">{formErrors[moduleKey].title}</p>}
                                </div>
                                <div>
                                    <Input name="description" defaultValue={module.description ?? ""} disabled={busy} aria-label="Descrição do módulo" aria-invalid={Boolean(formErrors[moduleKey]?.description)} />
                                    {formErrors[moduleKey]?.description && <p className="mt-1 text-sm text-destructive">{formErrors[moduleKey].description}</p>}
                                </div>
                                <Button type="submit" variant="outline" disabled={busy}>{pending === moduleKey ? <LoaderCircle className="animate-spin" /> : <Save />}Salvar</Button>
                            </form>
                        )}

                        <div className="divide-y divide-border">
                            {module.lessons.map((lesson, lessonIndex) => {
                                const lessonKey = `edit-lesson-${lesson.id}`

                                return (
                                    <div key={lesson.id} className="p-4 sm:px-5">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">{lessonIndex + 1}</span>
                                            <div className="min-w-40 flex-1">
                                                <p className="text-sm font-semibold">{lesson.title}</p>
                                                <p className="line-clamp-1 text-xs text-muted-foreground">{lesson.description || "Sem descrição"}</p>
                                            </div>
                                            <Badge className={lesson.hasVideo ? "bg-emerald-50 text-emerald-700" : ""}>{lesson.hasVideo ? "Com vídeo" : "Sem vídeo"}</Badge>
                                            <Button type="button" variant="ghost" size="icon" onClick={() => void moveLesson(module.id, lessonIndex, -1)} disabled={busy || lessonIndex === 0}><ArrowUp /><span className="sr-only">Mover aula para cima</span></Button>
                                            <Button type="button" variant="ghost" size="icon" onClick={() => void moveLesson(module.id, lessonIndex, 1)} disabled={busy || lessonIndex === module.lessons.length - 1}><ArrowDown /><span className="sr-only">Mover aula para baixo</span></Button>
                                            <Button type="button" variant="ghost" size="icon" onClick={() => setEditing(editing === lessonKey ? "" : lessonKey)} disabled={busy}><Pencil /><span className="sr-only">Editar aula</span></Button>
                                            <label className={`inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-white px-3 text-xs font-semibold text-primary hover:bg-secondary ${busy ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
                                                <FileVideo className="size-4" />{pending === `video-${lesson.id}` ? "Enviando..." : lesson.hasVideo ? "Substituir MP4" : "Enviar MP4"}
                                                <input type="file" accept={videoTypes.join(",")} className="sr-only" disabled={busy} onChange={(event) => {
                                                    const file = event.currentTarget.files?.[0]
                                                    if (file) void uploadVideo(module.id, lesson.id, file)
                                                    event.currentTarget.value = ""
                                                }} />
                                            </label>
                                            <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => void removeLesson(module.id, lesson.id)} disabled={busy}><Trash2 /><span className="sr-only">Excluir aula</span></Button>
                                        </div>

                                        {editing === lessonKey && (
                                            <form onSubmit={(event) => void updateLesson(module.id, lesson.id, event)} noValidate className="mt-4 grid gap-3 rounded-xl bg-muted/40 p-4 sm:grid-cols-[1fr_1.4fr_auto]">
                                                <div>
                                                    <Input name="title" defaultValue={lesson.title} disabled={busy} aria-label="Título da aula" aria-invalid={Boolean(formErrors[lessonKey]?.title)} />
                                                    {formErrors[lessonKey]?.title && <p className="mt-1 text-sm text-destructive">{formErrors[lessonKey].title}</p>}
                                                </div>
                                                <div>
                                                    <Input name="description" defaultValue={lesson.description ?? ""} disabled={busy} aria-label="Descrição da aula" aria-invalid={Boolean(formErrors[lessonKey]?.description)} />
                                                    {formErrors[lessonKey]?.description && <p className="mt-1 text-sm text-destructive">{formErrors[lessonKey].description}</p>}
                                                </div>
                                                <Button type="submit" variant="outline" disabled={busy}>{pending === lessonKey ? <LoaderCircle className="animate-spin" /> : <Save />}Salvar</Button>
                                            </form>
                                        )}
                                    </div>
                                )
                            })}

                            <form onSubmit={(event) => void createLesson(module.id, event)} noValidate className="grid gap-3 bg-muted/40 p-5 sm:grid-cols-[1fr_1.4fr_auto]">
                                <div>
                                    <Input name="title" placeholder="Título da nova aula" disabled={busy} aria-label="Título da nova aula" aria-invalid={Boolean(formErrors[`new-lesson-${module.id}`]?.title)} />
                                    {formErrors[`new-lesson-${module.id}`]?.title && <p className="mt-1 text-sm text-destructive">{formErrors[`new-lesson-${module.id}`].title}</p>}
                                </div>
                                <div>
                                    <Input name="description" placeholder="Descrição (opcional)" disabled={busy} aria-label="Descrição da nova aula" aria-invalid={Boolean(formErrors[`new-lesson-${module.id}`]?.description)} />
                                    {formErrors[`new-lesson-${module.id}`]?.description && <p className="mt-1 text-sm text-destructive">{formErrors[`new-lesson-${module.id}`].description}</p>}
                                </div>
                                <Button type="submit" variant="outline" disabled={busy}>{pending === `new-lesson-${module.id}` ? <LoaderCircle className="animate-spin" /> : <Plus />}Adicionar aula</Button>
                            </form>
                        </div>
                    </Card>
                )
            })}

            <Card className="border-dashed">
                <CardContent className="p-6">
                    <form onSubmit={createModule} noValidate className="grid gap-3 sm:grid-cols-[1fr_1.4fr_auto]">
                        <div>
                            <Input name="title" placeholder="Título do novo módulo" disabled={busy} aria-label="Título do novo módulo" aria-invalid={Boolean(formErrors["new-module"]?.title)} />
                            {formErrors["new-module"]?.title && <p className="mt-1 text-sm text-destructive">{formErrors["new-module"].title}</p>}
                        </div>
                        <div>
                            <Input name="description" placeholder="Descrição (opcional)" disabled={busy} aria-label="Descrição do novo módulo" aria-invalid={Boolean(formErrors["new-module"]?.description)} />
                            {formErrors["new-module"]?.description && <p className="mt-1 text-sm text-destructive">{formErrors["new-module"].description}</p>}
                        </div>
                        <Button type="submit" disabled={busy}>{pending === "new-module" ? <LoaderCircle className="animate-spin" /> : <Plus />}Adicionar módulo</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
