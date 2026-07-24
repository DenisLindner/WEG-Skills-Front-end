"use client"

import CourseCard from "@/components/molecules/course-card"
import InfoCarousel from "@/components/molecules/InfoCarousel"
import BestCourses from "@/components/organisms/bestCourses"

export default function Home() {
  return (
    <main className="w-full min-h-screen py-6 px-4 flex flex-col items-center gap-8">

      <InfoCarousel />
      <BestCourses />

    </main >
  )
}
