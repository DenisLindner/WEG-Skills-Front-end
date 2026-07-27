"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon, UserIcon } from "@hugeicons/core-free-icons"

export default function HeaderLogged() {
  const [open, setOpen] = useState(false)

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

        {/* Desktop Navigation & User Profile */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8">
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
          </nav>

          {/* Avatar / Profile Icon */}
          <div className="size-9 rounded-full bg-[#D9D9D9] border border-white/20 flex items-center justify-center text-slate-700 cursor-pointer hover:opacity-90 transition-opacity shadow-sm" title="Miguel dos Santos">
            <HugeiconsIcon icon={UserIcon} className="size-5" strokeWidth={2} />
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
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

              {/* Mobile User Profile */}
              <div className="mt-auto pt-6 border-t border-white/20 flex items-center gap-3">
                <div className="size-10 rounded-full bg-[#D9D9D9] flex items-center justify-center text-slate-700 shadow-sm">
                  <HugeiconsIcon icon={UserIcon} className="size-6" strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Miguel dos Santos</span>
                  <span className="text-xs text-white/70">miguel@weg.net</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
