"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { apiFetch, friendlyError } from "@/lib/client-api"
import { cn } from "@/lib/utils"

export function EnrollButton({ courseId, enrolled }: { courseId: number; enrolled: boolean }) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  if (enrolled) return <Link href={`/student/course/${courseId}`} className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}><CheckCircle2 />Continuar curso</Link>

  async function enroll() {
    setPending(true); setError("")
    try {
      await apiFetch("/api/enrollments", { method: "POST", body: JSON.stringify({ courseId }) })
      router.refresh()
    } catch (reason) { setError(friendlyError(reason)) } finally { setPending(false) }
  }

  return <div><Button type="button" size="lg" className="w-full sm:w-auto" onClick={enroll} disabled={pending}>{pending && <LoaderCircle className="animate-spin" />}{pending ? "Matriculando..." : "Matricular-se"}</Button>{error && <p className="mt-2 max-w-sm text-sm text-destructive" role="alert">{error}</p>}</div>
}

