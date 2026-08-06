import type { Metadata } from "next"
import {CertificateValidator} from "@/components/certificate/certificate-validator";
import {validateCertificateAction} from "@/actions/certificate/validate-certificate-action";

export const metadata: Metadata = { title: "Validar certificado" }

export default async function CertificatePage({
    searchParams,
}: {
    searchParams: Promise<{code?: string | string[]}>
}) {
    const requestedCode = (await searchParams).code
    const initialCode = typeof requestedCode === "string" ? requestedCode.trim().slice(0, 128) : ""
    const initialResult = initialCode ? await validateCertificateAction(initialCode) : null

    return (
        <main className="content-grid py-16 sm:py-24">
            <div className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">Validação pública</p>
                <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Confirme a autenticidade de um certificado</h1>
                <p className="mt-4 text-muted-foreground">Informe o código presente no documento. Não é necessário estar autenticado.</p>
            </div>
            <CertificateValidator
                initialCode={initialCode}
                initialCertificate={initialResult?.success ? initialResult.data : null}
                initialFailure={initialResult && !initialResult.success
                    ? {status: initialResult.status, message: initialResult.error.message}
                    : null}
            />
        </main>
    )

}
