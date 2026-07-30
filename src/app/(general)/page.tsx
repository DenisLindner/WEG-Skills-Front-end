"use client"

import InfoCarousel from "@/components/molecules/InfoCarousel"
import BestCourses from "@/components/organisms/bestCourses"
import Hero from "@/components/organisms/hero"

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center gap-8">
      <Hero page="home" />
      <div className="w-full max-w-[90%] mx-auto flex flex-col items-center gap-8 py-6">
        <InfoCarousel />
      </div>
      <BestCourses />
    </main>
  )
}

