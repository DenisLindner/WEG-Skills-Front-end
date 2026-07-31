import { getSession } from "@/lib/session"
import { userService } from "@/services/user.service"
import type { UserProfile } from "@/types/user/user-profile"
import { SiteFooter } from "@/components/shared/site-footer"
import { SiteHeader } from "@/components/shared/site-header"

export default async function GeneralLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession()
  let user: UserProfile | null = null
  if (session.authenticated) {
    try {
      user = await userService.meProfile()
    } catch {
      user = null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader session={session} user={user} />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  )
}
