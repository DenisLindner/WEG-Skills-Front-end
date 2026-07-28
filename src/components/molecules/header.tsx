"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/atoms/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon } from "@hugeicons/core-free-icons"
import { NotificationsDrawer } from "@/components/organisms/notifications-drawer"
import HeaderLogged from "./header-logged"

interface HeaderProps {
  isLoggedIn?: boolean
}

export default function Header({ isLoggedIn = false }: HeaderProps = {}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Rotas que devem exibir automaticamente o cabeçalho de usuário logado
  /* Caso tenha uma tela nova que utilize o Header logado, coloque o nome da 
     página aqui
  */
  const loggedInRoutes = [
    "/issue_certificate",
    "/profile",
    "/courses"
  ]

  const isLoggedRoute = loggedInRoutes.some(route => pathname?.startsWith(route))

  // Se passou a prop isLoggedIn=true OU se estiver em uma rota de usuário autenticado
  if (isLoggedIn || isLoggedRoute) {
    return <HeaderLogged />
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#00579D] text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-[90%] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/Logo WEG Skills Branca.svg"
            alt="WEG Skills Logo"
            width={140}
            height={36}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#certificado"
            className="relative py-0.5 text-sm font-medium text-white after:content-[''] after:absolute after:left-0 after:bottom-[1px] after:h-px after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100"
          >
            Certificado
          </Link>
          <Link
            href="#sobre"
            className="relative py-0.5 text-sm font-medium text-white after:content-[''] after:absolute after:left-0 after:bottom-[1px] after:h-px after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100"
          >
            Sobre
          </Link>

          {/* Notificações no Header deslogado */}
          <NotificationsDrawer isLoggedIn={false} />

          <Button
            nativeButton={false}
            render={<Link href="/login" />}
            className="bg-white text-[#00579D] border-2 border-white font-medium px-4 py-1.5 h-auto text-sm rounded-lg transition-colors hover:bg-[#ffffff00] hover:text-white bg-clip-border"
          >
            Login
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <NotificationsDrawer isLoggedIn={false} />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="p-2 text-white hover:bg-white/10 rounded-md transition-colors inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
              aria-label="Abrir Menu"
            >
              <HugeiconsIcon icon={Menu01Icon} className="size-6" strokeWidth={2} />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-[#00579D] text-white border-l-[#004880] w-[280px] p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <SheetHeader className="p-0 text-left border-b border-white/20 pb-4">
                  <SheetTitle className="text-white flex items-center">
                    <Image
                      src="/assets/icons/Logo WEG Skills Branca.svg"
                      alt="WEG Skills Logo"
                      width={130}
                      height={32}
                      className="h-7 w-auto object-contain"
                    />
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-4 mt-2">
                  <Link
                    href="#certificado"
                    onClick={() => setOpen(false)}
                    className="relative py-0.5 text-base font-medium text-white w-fit after:content-[''] after:absolute after:left-0 after:bottom-[1px] after:h-px after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100"
                  >
                    Certificado
                  </Link>
                  <Link
                    href="#sobre"
                    onClick={() => setOpen(false)}
                    className="relative py-0.5 text-base font-medium text-white w-fit after:content-[''] after:absolute after:left-0 after:bottom-[1px] after:h-px after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100"
                  >
                    Sobre
                  </Link>
                </nav>
              </div>

              <div className="mt-auto pt-6 border-t border-white/20">
                <Button
                  nativeButton={false}
                  render={<Link href="#login" onClick={() => setOpen(false)} />}
                  className="w-full bg-white text-[#00579D] hover:bg-white/90 font-medium py-2.5 h-auto text-base rounded transition-colors text-center justify-center"
                >
                  Login
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
