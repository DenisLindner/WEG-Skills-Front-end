"use client"

import { useActionState, useState } from "react"
import { Award, Check, Copy, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    createCertificateAction,
    type CertificateState,
} from "@/actions/course/create-certificate-action";

const initialState: CertificateState = {};

export function CertificateButton({ courseId, enabled }: { courseId: number; enabled: boolean }) {
    const action = createCertificateAction.bind(null, courseId);
    const [state, formAction, pending] = useActionState(action, initialState);
    const [copied, setCopied] = useState(false)

    async function copy() {
        if (!state.code) {
            return
        }
        await navigator.clipboard.writeText(`${window.location.origin}/certificate?code=${state.code}`)
        setCopied(true); window.setTimeout(() => setCopied(false), 1800)
    }

    return (
        <div>
            <form action={formAction}>
                <Button type="submit" disabled={!enabled || pending || state.success}>{pending ?
                    <LoaderCircle className="animate-spin" /> : <Award />}
                    {state.success ? "Certificado emitido" : pending ? "Emitindo certificado..." : "Emitir certificado"}
                </Button>
            </form>
            {!enabled && <p className="mt-2 text-xs text-muted-foreground">Disponível ao concluir todas as aulas.</p>}
            {state.error && <p className="mt-2 text-sm text-destructive" role="alert">{state.error}</p>}
            {state.success && state.code &&
                <div className="mt-4 rounded-xl border border-primary/20 bg-secondary/60 p-4">
                    <p className="text-sm font-semibold">Certificado disponível</p>
                    <p className="mt-1 break-all font-mono text-xs text-muted-foreground">{state.code}</p>
                    <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={copy}>{copied ? <Check /> : <Copy />}
                        {copied ? "Copiado" : "Copiar link de validação"}
                    </Button>
                </div>}
        </div>
    )
}
