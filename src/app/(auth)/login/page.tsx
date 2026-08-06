import {AuthShell} from "@/components/auth/auth-shell";
import {LoginForm} from "@/components/auth/login-form";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{next?: string | string[]}>
}) {
    const requestedNext = (await searchParams).next
    const nextPath = typeof requestedNext === "string" ? requestedNext.slice(0, 2048) : ""

    return (
        <AuthShell eyebrow="Bem vindo de volta" title="Faça login na sua conta" description="Acesse sua conta para continuar">
            <LoginForm nextPath={nextPath} />
        </AuthShell>
    )
}
