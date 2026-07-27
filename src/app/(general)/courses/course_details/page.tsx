"use client";

import React from "react";
import Link from "next/link";
import { Rating } from "@/components/atoms/rating";

export default function CourseDetailsPage() {
  const reviews = [
    {
      id: 1,
      user: "Usuario",
      comment: "Lorem ipsum eu achei tudo incrível",
      rate: 9,
      date: "14/07/2026",
    },
    {
      id: 2,
      user: "Usuario",
      comment: "Lorem ipsum eu achei tudo incrível",
      rate: 9,
      date: "14/07/2026",
    },
    {
      id: 3,
      user: "Usuario",
      comment: "Lorem ipsum eu achei tudo incrível",
      rate: 10,
      date: "14/07/2026",
    },
  ];

  return (
    <main className="flex-1 flex flex-col w-full bg-[#003057] min-h-[calc(100vh-64px)] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between">
        
        {/* Seção Superior: Imagem e Informações do Curso */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-8 sm:mb-12">
          
          {/* Lado Esquerdo: Imagem / Placeholder */}
          <div className="lg:col-span-6 bg-[#D9D9D9] rounded-sm min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] flex items-center justify-center shadow-lg border-4 border-white/10">
            <span className="text-slate-500 font-medium text-lg sm:text-xl">
              imagem
            </span>
          </div>

          {/* Lado Direito: Cards de Informações */}
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 justify-between">
            
            {/* Card Título */}
            <div className="bg-white rounded-sm p-6 sm:p-8 shadow-xl text-center border border-white/20">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#00579D] tracking-tight">
                Ferramentaria para Sistemas WEB
              </h1>
            </div>

            {/* Card Descrição */}
            <div className="bg-white rounded-sm p-6 sm:p-8 shadow-xl flex-1 flex flex-col justify-start border border-white/20">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-3">
                Descrição
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Linha de Ações: Duração, Preço e Botão Matricular */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              
              {/* Duração */}
              <div className="bg-white rounded-sm py-3.5 px-4 shadow-md text-center flex items-center justify-center font-semibold text-xs sm:text-sm text-slate-800 border border-slate-100">
                Duração de 8h
              </div>

              {/* Preço */}
              <div className="bg-white rounded-sm py-3.5 px-4 shadow-md text-center flex items-center justify-center font-bold text-sm sm:text-base text-[#16A34A] border border-slate-100">
                R$ 150.00
              </div>

              {/* Botão Matricular */}
              <Link
                href="/student/course"
                className="bg-[#00579D] hover:bg-[#004780] active:scale-95 text-white font-bold py-3.5 px-4 rounded-sm text-center flex items-center justify-center text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                Matricular
              </Link>
            </div>

          </div>
        </div>

        {/* Linha Divisória */}
        <div className="w-full max-w-4xl mx-auto h-[2px] bg-[#00579D] opacity-80 my-8 sm:my-12" />

        {/* Seção Inferior: Avaliações */}
        <div className="w-full mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-10 tracking-tight">
            Avaliações
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#F8FAFC] rounded-sm p-6 shadow-xl flex flex-col justify-between border border-white/10 hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  {/* Cabeçalho do Usuário */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#D9D9D9] shrink-0" />
                    <span className="font-bold text-slate-800 text-sm sm:text-base">
                      {review.user}
                    </span>
                  </div>

                  {/* Comentário */}
                  <p className="text-xs sm:text-sm text-slate-600 mb-6 font-normal leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/* Rodapé da Avaliação (Estrelas e Data) */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <Rating rate={review.rate} />
                  <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
