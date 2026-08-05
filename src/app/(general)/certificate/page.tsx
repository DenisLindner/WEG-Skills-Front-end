import type { Metadata } from "next"

export const metadata: Metadata = { title: "Validar certificado" }

export default function CertificatePage() {

    return (
        <main className="content-grid py-16 sm:py-24">
            <div className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">Validação pública</p>
                <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Confirme a autenticidade de um certificado</h1>
                <p className="mt-4 text-muted-foreground">Informe o código presente no documento. Não é necessário estar autenticado.</p>
            </div>
            {/* <CertificateValidator/> */}
        </main>
    )

}
