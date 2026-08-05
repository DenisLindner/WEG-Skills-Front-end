"use client"

import {useState} from "react";
import {Certificate} from "@/types/certificate/certificate";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Award, CheckCircle2, LoaderCircle, Search} from "lucide-react";
import {Card} from "@/components/ui/card";
import {validateCertificateAction} from "@/actions/certificate/validate-certificate-action";
import {Label} from "@/components/ui/label";

function formatEndDate(value: string) {
    const normalizedValue = /^\d{4}-\d{2}-\d{2}$/.test(value) ? value + "T00:00:00" : value
    const date = new Date(normalizedValue)

    return Number.isNaN(date.getTime())
        ? "Data não informada"
        : new Intl.DateTimeFormat("pt-BR", {dateStyle: "long"}).format(date)
}

function validationError(status: number, fallback: string) {
    if (status === 404) {
        return "Nenhum certificado foi encontrado com este código."
    }
    if (status === 429) {
        return "Muitas tentativas de validação. Aguarde um momento e tente novamente."
    }

    return fallback || "Não foi possível validar o certificado. Tente novamente."
}

type CertificateValidatorProps = {
    initialCode?: string
    initialCertificate?: Certificate | null
    initialFailure?: {status: number; message: string} | null
}

export function CertificateValidator({
    initialCode = "",
    initialCertificate = null,
    initialFailure = null,
}: CertificateValidatorProps) {
    const [certificate, setCertificate] = useState<Certificate | null>(initialCertificate)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(initialFailure
        ? validationError(initialFailure.status, initialFailure.message)
        : "")
    const [code, setCode] = useState(initialCode)

    async function validate(value: string) {
        const normalizedCode = value.trim()
        if (!normalizedCode || normalizedCode.length > 128) {
            setCertificate(null)
            setError("Informe um código de certificado válido.")
            return
        }

        setPending(true)
        setError("")
        setCertificate(null)

        try {
            const result = await validateCertificateAction(normalizedCode)

            if (!result.success) {
                setError(validationError(result.status, result.error.message))
                return
            }

            setCertificate(result.data)
        } catch (reason) {
            console.error("Certificate validation failed", reason)
            setError("Não foi possível validar o certificado. Tente novamente.")
        } finally {
            setPending(false)
        }
    }

    function submit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        if (pending) return
        void validate(code)
    }

    return (
        <div className="mx-auto max-w-3xl">
            <form onSubmit={submit} noValidate className="flex flex-col gap-2 sm:flex-row">
                <Label htmlFor="certificate-code" className="sr-only">Código do certificado</Label>
                <Input
                    id="certificate-code"
                    name="code"
                    required
                    maxLength={128}
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="Digite o código do certificado"
                    className="h-12"
                    disabled={pending}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "certificate-error" : undefined}
                />
                <Button type="submit" size="lg" className="sm:shrink-0" disabled={pending}>
                    {pending ? <LoaderCircle className="animate-spin" /> : <Search />}Validar
                </Button>
            </form>
            {error && <div id="certificate-error" className="mt-5 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive" role="alert" aria-live="polite">{error}</div>}
            {certificate &&
                <Card className="relative mt-8 overflow-hidden border-primary/20 p-8 shadow-lg">
                    <div className="absolute -right-12 -top-12 size-44 rounded-full bg-secondary" />
                    <Award className="relative size-12 text-primary" />
                    <div className="relative mt-6">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                            <CheckCircle2 className="size-4" />Certificado válido
                        </div>
                        <h2 className="text-3xl font-bold">{certificate.studentName}</h2>
                        <p className="mt-3 text-muted-foreground">Concluiu o curso <strong className="text-foreground">{certificate.courseTitle}</strong>, composto por {certificate.totalLessons} aulas.</p>
                        <dl className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Código</dt>
                                <dd className="mt-1 break-all font-mono text-sm">{certificate.code}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Conclusão</dt>
                                <dd className="mt-1 text-sm"><time dateTime={certificate.endDate}>{formatEndDate(certificate.endDate)}</time></dd>
                            </div>
                        </dl>
                    </div>
                </Card>
            }
        </div>
    )
}
