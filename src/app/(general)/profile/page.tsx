"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon, PencilEdit02Icon, Tick01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Rating } from "@/components/atoms/rating";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Dados reais do perfil
  const [name, setName] = useState("Miguel dos Santos");
  const [email, setEmail] = useState("miguel.santos@weg.net");
  const [phone, setPhone] = useState("(47) 98765-4321");
  const [address, setAddress] = useState("Jaraguá do Sul - SC");
  const [gender, setGender] = useState("Masculino");
  const [bio, setBio] = useState(
    "Desenvolvedor Front-end apaixonado por tecnologia e inovação, com foco em React, Next.js e design de interfaces modernas na WEG Skills. Sempre em busca de novos aprendizados e competências digitais."
  );

  // Estado rascunho enquanto edita
  const [draft, setDraft] = useState({
    name,
    email,
    phone,
    address,
    gender,
    bio,
  });

  const handleStartEdit = () => {
    setDraft({ name, email, phone, address, gender, bio });
    setIsEditing(true);
  };

  const handleSave = () => {
    setName(draft.name);
    setEmail(draft.email);
    setPhone(draft.phone);
    setAddress(draft.address);
    setGender(draft.gender);
    setBio(draft.bio);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft({ name, email, phone, address, gender, bio });
    setIsEditing(false);
  };

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
          
          {/* Header da Seção com Título e Ações */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-slate-100">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00579D] tracking-tight">
                Meu perfil
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isEditing ? "Edite suas informações pessoais abaixo." : "Gerencie seus dados e preferências."}
              </p>
            </div>

            {!isEditing ? (
              <button
                type="button"
                onClick={handleStartEdit}
                className="inline-flex items-center justify-center gap-2 bg-[#00579D] text-white hover:bg-[#004277] px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm cursor-pointer w-full sm:w-auto"
              >
                <HugeiconsIcon icon={PencilEdit02Icon} className="size-4" strokeWidth={2} />
                Editar Perfil
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center gap-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer flex-1 sm:flex-initial"
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="size-4" strokeWidth={2} />
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#187545] text-white hover:bg-[#125834] px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm cursor-pointer flex-1 sm:flex-initial"
                >
                  <HugeiconsIcon icon={Tick01Icon} className="size-4" strokeWidth={2} />
                  Salvar
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left Column: Form Fields */}
            <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-4">
              <div className="flex flex-col gap-3.5 sm:gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={isEditing ? draft.name : name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    placeholder="Nome Completo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white disabled:bg-slate-50/60 disabled:text-slate-600 disabled:cursor-not-allowed transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    E-mail
                  </label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={isEditing ? draft.email : email}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                    placeholder="Email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white disabled:bg-slate-50/60 disabled:text-slate-600 disabled:cursor-not-allowed transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={isEditing ? draft.phone : phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    placeholder="Telefone"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white disabled:bg-slate-50/60 disabled:text-slate-600 disabled:cursor-not-allowed transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Endereço
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={isEditing ? draft.address : address}
                    onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                    placeholder="Endereço"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white disabled:bg-slate-50/60 disabled:text-slate-600 disabled:cursor-not-allowed transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Gênero
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={isEditing ? draft.gender : gender}
                    onChange={(e) => setDraft({ ...draft, gender: e.target.value })}
                    placeholder="Gênero"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white disabled:bg-slate-50/60 disabled:text-slate-600 disabled:cursor-not-allowed transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Avatar with Edit Pencil & Bio Box */}
            <div className="md:col-span-6 lg:col-span-7 flex flex-col items-center justify-between h-full gap-6 md:pl-6 lg:pl-10">
              
              {/* Big Avatar Circle */}
              <div className="relative mt-2">
                <div className="size-44 sm:size-52 md:size-60 rounded-full bg-[#D9D9D9] border-[8px] sm:border-[10px] border-slate-200/80 shadow-inner flex items-center justify-center text-slate-700 relative overflow-hidden">
                  <HugeiconsIcon icon={UserIcon} className="size-28 sm:size-36 md:size-44 text-slate-700" strokeWidth={1.5} />
                </div>

                {/* Edit Pencil Icon Button */}
                <button
                  type="button"
                  onClick={!isEditing ? handleStartEdit : undefined}
                  title="Editar foto de perfil"
                  aria-label="Editar foto de perfil"
                  className={`absolute top-2 right-2 sm:top-4 sm:right-4 bg-white text-slate-700 hover:text-[#00579D] hover:bg-slate-50 shadow-md border border-slate-200 rounded-full p-3 sm:p-3.5 transition-colors flex items-center justify-center cursor-pointer ${
                    isEditing ? "ring-2 ring-[#00579D]" : ""
                  }`}
                >
                  <HugeiconsIcon icon={PencilEdit02Icon} className="size-5 sm:size-6" strokeWidth={2} />
                </button>
              </div>

              {/* Bio / Description Box */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                  Sobre mim
                </label>
                <textarea
                  disabled={!isEditing}
                  value={isEditing ? draft.bio : bio}
                  onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                  placeholder="Descrição sobre o usuário, competências, entre outras variáveis sobre o mesmo."
                  rows={4}
                  className="w-full bg-transparent text-sm sm:text-base text-slate-700 italic leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#00579D] focus:bg-white rounded-lg p-2 disabled:bg-transparent disabled:p-0 resize-none transition-all"
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
