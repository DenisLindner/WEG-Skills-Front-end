import {AuthShell} from "@/components/auth/auth-shell";
import {RegisterForm} from "@/components/auth/register-form";

export default function registerPage () {
    return (
        <AuthShell eyebrow="Comece sua jornada" title="Crie sua conta" description="Cadastre-se gratuitamente para acessar o catálogo e acompanhar seu aprendizado">
            <RegisterForm />
        </AuthShell>
    )
}