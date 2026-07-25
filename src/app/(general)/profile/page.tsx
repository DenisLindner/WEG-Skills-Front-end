"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon, PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { Rating } from "@/components/atoms/rating";

export default function ProfilePage() {
  const [name, setName] = useState("Miguel dos Santos");
  const [email, setEmail] = useState("miguel.santos@weg.net");
  const [phone, setPhone] = useState("(47) 98765-4321");
  const [address, setAddress] = useState("Jaraguá do Sul - SC");
  const [gender, setGender] = useState("Masculino");
  const [bio, setBio] = useState(
    "Desenvolvedor Front-end apaixonado por tecnologia e inovação, com foco em React, Next.js e design de interfaces modernas na WEG Skills. Sempre em busca de novos aprendizados e competências digitais."
  );

  const courses = [
    {
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre",
      rating: 10,
      progress: 100,
    },
    {
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre",
      rating: 10,
      progress: 72,
    },
    {
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre",
      rating: 8,
      progress: 78,
    },
    {
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre",
      rating: 9,
      progress: 100,
    },
    {
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre",
      rating: 8,
      progress: 45,
    },
    {
      title: "Ferramentaria para Sistemas WEB",
      description: "Uma breve descrição sobre",
      rating: 10, // 5 estrelas preenchidas
      progress: 15,
    },
  ];

  // Ordena os cursos do mais completo (100%) para os menores progressos
  const sortedCourses = [...courses].sort((a, b) => b.progress - a.progress);

  return (
    <main className="flex-1 flex flex-col w-full bg-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8 sm:gap-10">
        
        {/* Top Section: Meu perfil */}
        <section className="w-full bg-white rounded-2xl shadow-md border border-slate-200/80 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Column: Form Fields */}
            <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00579D] mb-2 sm:mb-4 tracking-tight">
                Meu perfil
              </h1>

              <div className="flex flex-col gap-3.5 sm:gap-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome Completo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 sm:py-3.5 text-slate-700 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white transition-all shadow-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 sm:py-3.5 text-slate-700 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white transition-all shadow-sm"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefone"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 sm:py-3.5 text-slate-700 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white transition-all shadow-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Endereço"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 sm:py-3.5 text-slate-700 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white transition-all shadow-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Gênero"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 sm:py-3.5 text-slate-700 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Avatar with Edit Pencil & Bio Box */}
            <div className="md:col-span-6 lg:col-span-7 flex flex-col items-center justify-between h-full gap-8 md:pl-6 lg:pl-10">
              
              {/* Big Avatar Circle */}
              <div className="relative mt-2 sm:mt-4">
                <div className="size-44 sm:size-52 md:size-60 rounded-full bg-[#D9D9D9] border-[8px] sm:border-[10px] border-slate-200/80 shadow-inner flex items-center justify-center text-slate-700 relative overflow-hidden">
                  <HugeiconsIcon icon={UserIcon} className="size-28 sm:size-36 md:size-44 text-slate-700" strokeWidth={1.5} />
                </div>

                {/* Edit Pencil Icon Button */}
                <button
                  type="button"
                  title="Editar foto de perfil"
                  aria-label="Editar foto de perfil"
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white text-slate-700 hover:text-[#00579D] hover:bg-slate-50 shadow-md border border-slate-200 rounded-full p-3 sm:p-3.5 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <HugeiconsIcon icon={PencilEdit02Icon} className="size-5 sm:size-6" strokeWidth={2} />
                </button>
              </div>

              {/* Bio / Description Box */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Descrição sobre o usuário, competências, entre outras variáveis sobre o mesmo."
                  rows={4}
                  className="w-full bg-transparent text-sm sm:text-base text-slate-600 italic leading-relaxed focus:outline-none focus:ring-0 resize-none"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Bottom Section: Meus cursos */}
        <section className="w-full bg-[#003057] rounded-2xl shadow-xl p-6 sm:p-10 lg:p-12 text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 tracking-tight">
            Meus cursos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {sortedCourses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white text-slate-800 rounded-xl shadow-md p-4 sm:p-5 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100"
              >
                <div>
                  {/* Image placeholder */}
                  <div className="w-full aspect-[1.6/1] bg-[#D9D9D9] rounded-lg mb-4 flex flex-col items-center justify-center text-slate-600 font-semibold text-xs sm:text-sm select-none shadow-inner">
                    <span>ima</span>
                    <span>gem</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-1 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-400 mb-3 line-clamp-1">
                    {course.description}
                  </p>

                  <div className="mb-4">
                    <Rating rate={course.rating} />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full pt-2 border-t border-slate-100 flex items-center gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.progress === 100 ? "bg-[#187545]" : "bg-[#00579D]"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      course.progress === 100 ? "text-[#187545]" : "text-slate-600"
                    }`}
                  >
                    {course.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
