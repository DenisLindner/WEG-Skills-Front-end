"use client";

import CourseCard from "@/components/molecules/course-card";
import InfoCarousel from "@/components/molecules/InfoCarousel";

export default function Home() {
  return (
    <>
      <InfoCarousel />
      <div className="p-4 flex gap-4 flex-wrap">
        {/* Exemplo de card com nota 2/10 (equivale a 1 estrela preenchida) */}
        <CourseCard
          title="Ferramentaria para Sistemas WEB"
          description="Uma breve descrição sobre"
          rating={2}
          buttonText="Matricular"
        />

        {/* Exemplo de card com nota 8/10 (equivale a 4 estrelas preenchidas) */}
        <CourseCard
          title="Desenvolvimento React & Next.js"
          description="Aprenda a criar aplicações modernas"
          rating={8}
          buttonText="Matricular"
        />
      </div>
    </>
  );
}
