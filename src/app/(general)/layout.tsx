import {Header} from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import {userService} from "@/services/user.service";
import {getSession} from "@/lib/session";

export default async function GeneralLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const session = await getSession();

    const user = session.authenticated
        ? await userService.meProfile().catch(() => null)
        : null;

    return (
        <div className="flex min-h-screen flex-col">
            <Header session={session ?? null} user={user}/>
            <div className="flex flex-1 flex-col">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
