import {Metadata} from "next";
import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";
import {userService} from "@/services/user.service";
import {ProfileClient} from "@/components/profile/profile-client";
import {ApiError} from "@/services/api-error";

export const metadata: Metadata = { title: "Meu perfil" }

export default async function ProfilePage() {
    const session = await getSession()
    if (!session.authenticated) {
        redirect("/login?next=/profile")
    }
    let profile
    try {
        profile = await userService.meProfile()
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            redirect("/login?next=/profile")
        }

        throw error
    }

    return (
        <main className="content-grid py-12 sm:py-16">
            <div className="mb-10">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Minha conta</p>
                <h1 className="text-4xl font-bold tracking-tight">Perfil e segurança</h1>
            </div>
            <ProfileClient profile={profile} />
        </main>
    )
}
