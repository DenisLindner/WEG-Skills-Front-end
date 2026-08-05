"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {createCourseAction} from "@/actions/course/create-course-action";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/text-area";
import {LoaderCircle, PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ApiFieldErrors} from "@/types/common/api-field-errors";
import {PublicApiError} from "@/types/common/public-api-error";
import {CourseInput} from "@/types/course/course-input";

function courseInput(form: HTMLFormElement) {
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

    const input: CourseInput = {
        title,
        ...(description ? {description} : {}),
    }

    return {input, errors}
}

function translatedErrors(error: PublicApiError) {
    const errors = {...error.fieldErrors}

    if (errors.title) errors.title = "Informe um título entre 3 e 128 caracteres."
    if (errors.description) errors.description = "A descrição deve ter entre 3 e 255 caracteres."

    return errors
}

export function CourseCreateForm() {
    const [pending, setPending] = useState(false)
    const [notice, setNotice] = useState("")
    const [formErrors, setFormErrors] = useState<ApiFieldErrors>({})
    const router = useRouter()

    function handleFailure(status: number, error: PublicApiError) {
        if (status === 401) {
            router.replace("/login?next=/instructor/courses/new")
            router.refresh()
            return
        }
        if (status === 403) {
            setNotice("Você não tem permissão para criar cursos.")
            return
        }

        const errors = translatedErrors(error)
        setFormErrors(errors)
        setNotice(Object.keys(errors).length > 0
            ? "Verifique os campos destacados."
            : status === 409
                ? "Já existe um curso com esse título."
                : error.message || "Não foi possível criar o curso. Tente novamente.")
    }

    async function submit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        if (pending) return

        const {input, errors} = courseInput(event.currentTarget)
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            setNotice("Verifique os campos destacados.")
            return
        }

        setPending(true)
        setNotice("")
        setFormErrors({})

        try {
            const result = await createCourseAction(input)
            if (!result.success) {
                handleFailure(result.status, result.error)
                return
            }

            router.push("/instructor/courses/" + result.data.id)
            router.refresh()
        } catch (error) {
            console.error("Course creation failed", error)
            setNotice("Não foi possível concluir a operação. Tente novamente.")
        } finally {
            setPending(false)
        }
    }

    return (
        <Card className="mx-auto max-w-3xl">
            <CardHeader>
                <CardTitle>Informações iniciais</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} noValidate className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título do curso</Label>
                        <Input
                            id="title"
                            name="title"
                            required
                            minLength={3}
                            maxLength={128}
                            placeholder="Ex.: Fundamentos de automação industrial"
                            disabled={pending}
                            aria-invalid={Boolean(formErrors.title)}
                            aria-describedby={formErrors.title ? "title-error" : undefined}
                        />
                        {formErrors.title && <p id="title-error" className="text-sm text-destructive">{formErrors.title}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            name="description"
                            minLength={3}
                            maxLength={255}
                            placeholder="Explique de forma objetiva o que será aprendido."
                            disabled={pending}
                            aria-invalid={Boolean(formErrors.description)}
                            aria-describedby={formErrors.description ? "description-error" : undefined}
                        />
                        {formErrors.description && <p id="description-error" className="text-sm text-destructive">{formErrors.description}</p>}
                    </div>
                    {notice && (
                        <div role="alert" aria-live="polite" className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                            {notice}
                        </div>
                    )}
                    <Button type="submit" size="lg" disabled={pending}>
                        {pending ? <LoaderCircle className="animate-spin" /> : <PlusCircle />}
                        {pending ? "Criando..." : "Criar e configurar conteúdo"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

