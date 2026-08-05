import {SessionResponse} from "@/types/auth/session";
import {UserProfile} from "@/types/user/user-profile";
import Link from "next/link";
import {hasRole} from "@/lib/session-utils";
import {Logo} from "@/components/shared/logo";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {BookOpen, ChevronDown, GraduationCap, Menu, ShieldCheck, UserRound} from "lucide-react";
import {LogoutButton} from "@/components/shared/logout";

type HeaderProps = { session: SessionResponse; user?: UserProfile | null }

function Navigation({ session }: Pick<HeaderProps, "session">) {
    return (
        <>
            <Link href="/courses" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-primary">Cursos</Link>
            <Link href="/certificate" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-primary">Certificados</Link>
            <Link href="/about" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-primary">Sobre</Link>
            {session.authenticated && (
                <Link href="/student" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-primary">Meu aprendizado</Link>
            )}
            {hasRole(session, "INSTRUCTOR", "ADMIN") && (
                <Link href="/instructor" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-primary">Instrutor</Link>
            )}
            {hasRole(session, "ADMIN") && (
                <Link href="/admin" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-primary">Administração</Link>
            )}
        </>
    )
}

function UserAvatar({ user }: Pick<HeaderProps, "user">) {
    if (!user?.pictureUrl) {
        return <UserRound className="size-4" />
    }

    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.pictureUrl} alt="" className="size-6 shrink-0 rounded-full object-cover" />
        </>
    )
}

export function Header({ session, user }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur-xl">
            <div className="content-grid flex h-16 items-center justify-between gap-4">
                <Logo />
                <nav className="hidden items-center lg:flex" aria-label="Navegação principal">
                    <Navigation session={session} />
                </nav>
                <div className="hidden items-center gap-2 lg:flex">
                    {session.authenticated ? (
                        <>
                            <Link href="/profile" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "max-w-52")}>
                                <UserAvatar user={user} /> <span className="truncate">{user?.name ?? session.email}</span>
                            </Link>
                            <LogoutButton compact />
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>Entrar</Link>
                            <Link href="/register" className={buttonVariants({ size: "sm" })}>Criar conta</Link>
                        </>
                    )}
                </div>
                <details className="group relative lg:hidden">
                    <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-xl border border-border bg-white text-primary">
                        <Menu className="size-5 group-open:hidden" />
                        <ChevronDown className="hidden size-5 group-open:block" />
                        <span className="sr-only">Abrir menu</span>
                    </summary>
                    <div className="absolute right-0 mt-3 flex w-72 flex-col gap-1 rounded-2xl border border-border bg-white p-3 shadow-xl">
                        <Navigation session={session} />
                        <div className="my-2 h-px bg-border" />
                        {session.authenticated ? (
                            <>
                                <Link href="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium">
                                    <UserAvatar user={user} />{user?.name ?? "Meu perfil"}
                                </Link>
                                <LogoutButton compact />
                            </>
                        ) : (
                            <>
                                <Link href="/login" className={buttonVariants({ variant: "outline", size: "sm" })}>Entrar</Link>
                                <Link href="/register" className={buttonVariants({ size: "sm" })}>Criar conta</Link>
                            </>
                        )}
                    </div>
                </details>
            </div>
        </header>
    )
}

export const roleIcons = { STUDENT: GraduationCap, INSTRUCTOR: BookOpen, ADMIN: ShieldCheck }
