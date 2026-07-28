"use client"

import InfoCarousel from "@/components/molecules/InfoCarousel"
import BestCourses from "@/components/organisms/bestCourses"

export default function Home() {
  return (
    <main className="w-full min-h-screen py-6 flex flex-col items-center gap-8 sm:gap-12 overflow-x-hidden">
      <InfoCarousel />
      <BestCourses />
    </main>
  )
}
