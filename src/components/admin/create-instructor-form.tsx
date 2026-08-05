"use client"

import {InstructorCreated} from "@/types/user/instructor-created";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {createInstructorAction} from "@/actions/user/instructor/create-instructor-action";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Check, Copy, LoaderCircle, UserPlus, X} from "lucide-react";
import {ApiFieldErrors} from "@/types/common/api-field-errors";
import {PublicApiError} from "@/types/common/public-api-error";
import {InstructorInput} from "@/types/user/instructor-input";

function instructorInput(form: HTMLFormElement) {
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const errors: ApiFieldErrors = {}

    if (name.length < 3 || name.length > 128) {
        errors.name = "Informe um nome entre 3 e 128 caracteres."
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 128) {
        errors.email = "Informe um e-mail válido de até 128 caracteres."
    }

    const input: InstructorInput = {name, email}
    return {input, errors}
}

function translatedErrors(error: PublicApiError) {
    const errors = {...error.fieldErrors}

    if (errors.name) {
        errors.name = "Informe um nome entre 3 e 128 caracteres."
    }
    if (errors.email) {
        errors.email = "Informe um e-mail válido de até 128 caracteres."
    }

    return errors
}

export function CreateInstructorForm() {
    const [instructor, setInstructor] = useState<InstructorCreated | null>(null)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState("")
    const [formErrors, setFormErrors] = useState<ApiFieldErrors>({})
    const [copied, setCopied] = useState(false)
    const [copyError, setCopyError] = useState("")
    const router = useRouter()

    function handleFailure(status: number, apiError: PublicApiError) {
        if (status === 401) {
            router.replace("/login?next=/admin")
            router.refresh()
            return
        }
        if (status === 403) {
            setError("Você não tem permissão para criar instrutores.")
            return
        }

        const errors = translatedErrors(apiError)
        setFormErrors(errors)
        setError(Object.keys(errors).length > 0
            ? "Verifique os campos destacados."
            : status === 409
                ? "Já existe um usuário cadastrado com este e-mail."
                : status === 429
                    ? "Muitas tentativas. Aguarde um momento e tente novamente."
                    : apiError.message || "Não foi possível criar o instrutor. Tente novamente.")
    }

    async function submit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        if (pending) return

        const form = event.currentTarget
        const {input, errors} = instructorInput(form)
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            setError("Verifique os campos destacados.")
            return
        }

        setPending(true)
        setError("")
        setFormErrors({})
        setInstructor(null)
        setCopied(false)
        setCopyError("")

        try {
            const result = await createInstructorAction(input)

            if (!result.success) {
                handleFailure(result.status, result.error)
                return
            }

            setInstructor(result.data)
            form.reset()
            router.refresh()
        } catch (reason) {
            console.error("Instructor creation failed", reason)
            setError("Não foi possível criar o instrutor. Tente novamente.")
        } finally {
            setPending(false)
        }
    }

    async function copy() {
        if (!instructor) {
            return
        }

        setCopyError("")
        try {
            await navigator.clipboard.writeText("E-mail: " + instructor.email + "\nSenha temporária: " + instructor.temporaryPassword)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1800)
        } catch (reason) {
            console.error("Instructor credentials copy failed", reason)
            setCopyError("Não foi possível copiar as credenciais. Copie os dados manualmente.")
        }
    }

    return (
        <div>
            <form onSubmit={submit} noValidate className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="instructor-name">Nome</Label>
                    <Input
                        id="instructor-name"
                        name="name"
                        autoComplete="name"
                        required
                        minLength={3}
                        maxLength={128}
                        disabled={pending}
                        aria-invalid={Boolean(formErrors.name)}
                        aria-describedby={formErrors.name ? "instructor-name-error" : undefined}
                    />
                    {formErrors.name && <p id="instructor-name-error" className="text-sm text-destructive">{formErrors.name}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instructor-email">E-mail</Label>
                    <Input
                        id="instructor-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={128}
                        disabled={pending}
                        aria-invalid={Boolean(formErrors.email)}
                        aria-describedby={formErrors.email ? "instructor-email-error" : undefined}
                    />
                    {formErrors.email && <p id="instructor-email-error" className="text-sm text-destructive">{formErrors.email}</p>}
                </div>
                <div>
                    <Button type="submit" disabled={pending}>
                        {pending ? <LoaderCircle className="animate-spin" /> : <UserPlus />}Criar instrutor
                    </Button>
                </div>
            </form>
            {error && <p className="mt-4 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive" role="alert" aria-live="polite">{error}</p>}
            {instructor &&
                <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900" role="status" aria-live="polite">
                    <p className="font-semibold">Instrutor criado. Copie a senha agora; ela não será exibida novamente.</p>
                    <dl className="mt-3 grid gap-2">
                        <div>
                            <dt className="text-xs font-bold uppercase">E-mail</dt>
                            <dd>{instructor.email}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold uppercase">Senha temporária</dt>
                            <dd className="font-mono text-base">{instructor.temporaryPassword}</dd>
                        </div>
                    </dl>
                    {copyError && <p className="mt-3 text-sm text-destructive" role="alert">{copyError}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={copy}>
                            {copied ? <Check /> : <Copy />}{copied ? "Copiado" : "Copiar credenciais"}
                        </Button>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setInstructor(null)}>
                            <X />Ocultar credenciais
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}
