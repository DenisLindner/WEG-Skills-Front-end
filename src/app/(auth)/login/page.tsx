import {AuthShell} from "@/components/auth/auth-shell";
import {LoginForm} from "@/components/auth/login-form";

export default function loginPage () {
    return (
        <AuthShell eyebrow="Bem vindo de volta" title="Faça login na sua conta" description="Acesse sua conta para continuar">
            <LoginForm />
        </AuthShell>
    )
}