"use client"

import CourseCard from "@/components/molecules/course-card"
import InfoCarousel from "@/components/molecules/InfoCarousel"

export default function Home() {
  return (
    <main className="w-full min-h-screen py-6 px-4 flex flex-col items-center gap-8">
      <InfoCarousel />
      
      {/* Grid: 1 coluna no mobile, exatamente 3 colunas lado a lado no desktop (md:grid-cols-3) */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        <CourseCard
          title="Ferramentaria para Sistemas WEB"
          description="Uma breve descrição sobre"
          rate={2}
        />
        <CourseCard
          title="Ferramentaria para Sistemas WEB"
          description="Uma breve descrição sobre"
          rate={2}
        />
        <CourseCard
          title="Ferramentaria para Sistemas WEB"
          description="Uma breve descrição sobre"
          rate={2}
        />
      </div>
    </main>
  )
}
