"use client"

import { useState } from "react"
import { LogOut, LoaderCircle } from "lucide-react"
import {Button} from "@/components/ui/button";
import {logoutAction} from "@/actions/auth/logout-action";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
    const [pending, setPending] = useState(false)

    async function logout() {
        setPending(true)
        try {
            await logoutAction()
        } finally {
            setPending(false)
        }
    }

    return (
        <Button type="button" variant="ghost" size={compact ? "sm" : "default"} onClick={logout} disabled={pending}>
            {pending ? <LoaderCircle className="animate-spin" /> : <LogOut />}Sair
        </Button>
)
}

