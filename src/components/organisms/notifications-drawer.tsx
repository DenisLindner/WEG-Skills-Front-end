"use client"

import React from "react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet"
import { Button } from "@/components/atoms/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Notification01Icon, Login01Icon } from "@hugeicons/core-free-icons"

interface NotificationsDrawerProps {
  isLoggedIn?: boolean
}

export function NotificationsDrawer({ isLoggedIn = false }: NotificationsDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger
        className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer outline-none flex items-center justify-center"
        aria-label="Notificações"
        title="Notificações"
      >
        <HugeiconsIcon icon={Notification01Icon} className="size-5" strokeWidth={2} />
        {/* Indicador de notificação ativa quando logado */}
        {isLoggedIn && (
          <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px] sm:w-[380px] bg-white p-6 flex flex-col justify-between">
        <div className="flex flex-col h-full">
          <SheetHeader className="pb-4 border-b border-slate-200 text-left">
            <SheetTitle className="text-lg font-bold text-[#00579D] flex items-center gap-2">
              <HugeiconsIcon icon={Notification01Icon} className="size-5 text-[#00579D]" />
              Notificações
            </SheetTitle>
          </SheetHeader>

          {isLoggedIn ? (
            /* Conteúdo quando o usuário ESTÁ logado */
            <div className="flex flex-col gap-3 mt-4 overflow-y-auto max-h-[calc(100vh-140px)]">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#00579D]/30 hover:bg-slate-100/60 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">Boas-vindas ao WEG Skills!</p>
                  <span className="size-2 rounded-full bg-[#00579D]" />
                </div>
                <p className="text-xs text-slate-600 mt-1">Explore a plataforma e acompanhe seus cursos e certificados.</p>
                <span className="text-[10px] text-slate-400 mt-2 block">Hoje</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#00579D]/30 hover:bg-slate-100/60 transition-all cursor-pointer">
                <p className="text-sm font-semibold text-slate-800">Novo curso disponível</p>
                <p className="text-xs text-slate-600 mt-1">Confira o novo treinamento de Segurança em Instalações Elétricas.</p>
                <span className="text-[10px] text-slate-400 mt-2 block">Ontem</span>
              </div>
            </div>
          ) : (
            /* Conteúdo quando o usuário NÃO está logado */
            <div className="flex flex-col items-center justify-center text-center my-auto px-4 gap-4">
              <div className="size-16 rounded-full bg-[#00579D]/10 flex items-center justify-center text-[#00579D]">
                <HugeiconsIcon icon={Notification01Icon} className="size-8" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="text-base font-semibold text-slate-800">Acesso Restrito</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Você deve fazer login para visualizar as notificações.
                </p>
              </div>

              <Button
                nativeButton={false}
                render={<Link href="/login" />}
                className="mt-2 w-full bg-[#00579D] text-white hover:bg-[#004277] font-medium py-5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm"
              >
                <HugeiconsIcon icon={Login01Icon} className="size-4" />
                Fazer Login
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
