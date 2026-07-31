"use client"

import { useState } from "react"
import { LogOut, LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { apiFetch } from "@/lib/client-api"

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  async function logout() {
    setPending(true)
    try {
      await apiFetch<void>("/api/auth/logout", { method: "POST", body: "{}" })
      router.push("/login")
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <Button type="button" variant="ghost" size={compact ? "sm" : "default"} onClick={logout} disabled={pending}>
      {pending ? <LoaderCircle className="animate-spin" /> : <LogOut />}
      Sair
    </Button>
  )
}

