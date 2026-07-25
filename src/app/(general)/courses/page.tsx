"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { CourseCard } from "@/components/molecules/course-card";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Array de cursos baseado no mockup (3x2 no grid)
  const allCourses = [
    {
      id: 1,
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre o curso de ferramentaria e desenvolvimento de interfaces.",
      rate: 10, // 1 estrela preenchida como na imagem
    },
    {
      id: 2,
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre o curso de ferramentaria e desenvolvimento de interfaces.",
      rate: 10,
    },
    {
      id: 3,
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre o curso de ferramentaria e desenvolvimento de interfaces.",
      rate: 9,
    },
    {
      id: 4,
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre o curso de ferramentaria e desenvolvimento de interfaces.",
      rate: 8,
    },
    {
      id: 5,
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre o curso de ferramentaria e desenvolvimento de interfaces.",
      rate: 9,
    },
    {
      id: 6,
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre o curso de ferramentaria e desenvolvimento de interfaces.",
      rate: 10,
    },
  ];

  // Filtro de busca interativa
  const filteredCourses = allCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 flex flex-col w-full bg-[#003057] min-h-[calc(100vh-64px)] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between">
        
        {/* Topo da Seção: Título e Sublinha */}
        <div className="flex flex-col items-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight">
            Cursos Disponíveis
          </h1>
          <div className="w-48 sm:w-64 h-1.5 bg-[#00579D] rounded-full mt-3 sm:mt-4" />
        </div>

        {/* Barra de Busca Interativa */}
        <div className="max-w-xl w-full mx-auto mb-12 sm:mb-16">
          <div className="bg-white rounded-full p-1.5 pl-5 shadow-lg flex items-center justify-between border border-white/20 transition-all focus-within:ring-2 focus-within:ring-white/40">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <HugeiconsIcon icon={Search01Icon} className="size-5 text-slate-400 shrink-0" strokeWidth={2} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome, Descrição..."
                className="w-full bg-transparent text-slate-700 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none pr-2 truncate font-medium"
              />
            </div>
            <button
              type="button"
              className="bg-[#00579D] hover:bg-[#004780] active:scale-95 text-white font-medium px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base transition-all shadow-sm shrink-0 cursor-pointer"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Grid de Cards de Curso (3 colunas no Desktop) */}
        <div className="flex-1 mb-12 sm:mb-16">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  rate={course.rate}
                  className="md:!max-w-none w-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none bg-white text-slate-800"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 max-w-lg mx-auto p-8">
              <p className="text-lg text-white/80 font-medium">
                Nenhum curso encontrado para &ldquo;{searchTerm}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-4 text-sm underline text-white hover:text-white/80 cursor-pointer font-semibold"
              >
                Limpar busca
              </button>
            </div>
          )}
        </div>

        {/* Paginação Exata conforme o Mockup */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-white/80 select-none mt-auto pt-4">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3.5 sm:size-4" strokeWidth={2} />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              currentPage === 1
                ? "bg-white text-[#003057] font-bold shadow-md scale-105"
                : "hover:text-white hover:bg-white/10"
            }`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              currentPage === 2
                ? "bg-white text-[#003057] font-bold shadow-md scale-105"
                : "hover:text-white hover:bg-white/10"
            }`}
          >
            2
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              currentPage === 3
                ? "bg-white text-[#003057] font-bold shadow-md scale-105"
                : "hover:text-white hover:bg-white/10"
            }`}
          >
            3
          </button>

          <span className="px-1 text-white/50 tracking-widest font-bold">...</span>

          <button
            type="button"
            onClick={() => setCurrentPage(11)}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              currentPage === 11
                ? "bg-white text-[#003057] font-bold shadow-md scale-105"
                : "hover:text-white hover:bg-white/10"
            }`}
          >
            11
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(12)}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              currentPage === 12
                ? "bg-white text-[#003057] font-bold shadow-md scale-105"
                : "hover:text-white hover:bg-white/10"
            }`}
          >
            12
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
            disabled={currentPage === 12}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <span>Próximo</span>
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5 sm:size-4" strokeWidth={2} />
          </button>
        </div>

      </div>
    </main>
  );
}
