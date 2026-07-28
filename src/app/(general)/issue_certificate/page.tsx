"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Award01Icon, Cancel01Icon, ViewIcon, Download01Icon } from "@hugeicons/core-free-icons";

export default function IssueCertificatePage() {
  const [openModal, setOpenModal] = useState(false);

  const handleDownload = () => {
    const svgElement = document.getElementById("certificate-svg");
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Certificado_WEG_Skills_Miguel_dos_Santos.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex-1 flex flex-col w-full bg-white">
      {/* Top Section */}
      <section className="w-full bg-slate-50 border-b border-slate-200 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 lg:gap-12">
          
          {/* Lado Esquerdo: Título, Badges e Descrição (Alinhados à Esquerda) */}
          <div className="flex flex-col items-start text-left flex-1 max-w-2xl w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00579D] tracking-tight mb-3 sm:mb-4">
              Ferramentaria para Sistemas WEB
            </h1>
            <div className="flex flex-wrap justify-start gap-2 mb-4 sm:mb-5">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 font-medium shadow-sm">
                Desenvolvimento Web
              </span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 font-medium shadow-sm">
                Lógica de Programação
              </span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 font-medium shadow-sm">
                React
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed">
              Aprenda a construir interfaces modernas e interativas com as ferramentas e bibliotecas mais requisitadas pelo mercado de tecnologia.
              Este curso abrange de ponta a ponta as práticas reais da indústria, capacitando você a solucionar desafios e entregar sistemas eficientes.
            </p>
          </div>

          {/* Lado Direito: Cards de Informações do Curso */}
          <div className="w-full md:w-auto min-w-[280px] max-w-md">
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="bg-white shadow-sm px-4 py-3 rounded-lg border border-slate-200/80 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Duração</span>
                <span className="text-sm sm:text-base font-bold text-slate-800">8h</span>
              </div>
              <div className="bg-white shadow-sm px-4 py-3 rounded-lg border border-slate-200/80 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Valor</span>
                <span className="text-sm sm:text-base font-bold text-[#187545]">R$ 150.00</span>
              </div>
              <div className="bg-white shadow-sm px-4 py-3 rounded-lg border border-slate-200/80 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Modalidade</span>
                <span className="text-sm sm:text-base font-bold text-slate-800">Online</span>
              </div>
              <div className="bg-white shadow-sm px-4 py-3 rounded-lg border border-slate-200/80 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Nível</span>
                <span className="text-sm sm:text-base font-bold text-slate-800">Intermediário</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Bottom Section */}
      <section className="w-full bg-[#003057] flex-1 flex flex-col items-center justify-center py-10 px-4 sm:py-16 lg:py-20">
        
        {/* Card Único: Botão "Clique para visualizar o certificado" */}
        <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-xl text-center flex flex-col items-center gap-4 border border-white/20">
          <div className="size-16 rounded-full bg-[#00579D]/10 flex items-center justify-center text-[#00579D]">
            <HugeiconsIcon icon={Award01Icon} className="size-8" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-bold text-slate-800">Certificado de Conclusão</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              O certificado deste curso já está disponível. Clique abaixo para abrir e visualizar o certificado.
            </p>
          </div>
          <Button
            onClick={() => setOpenModal(true)}
            className="w-full max-w-[340px] bg-[#00579D] hover:bg-[#004780] text-white font-semibold py-5.5 px-6 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <HugeiconsIcon icon={ViewIcon} className="size-4" />
            Clique para visualizar o certificado
          </Button>
        </div>

      </section>

      {/* Modal / Dialog para abrir o Certificado Vetorial em Tela Cheia ao Clicar */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-4 sm:p-6 my-auto flex flex-col gap-4 max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-2">
                <HugeiconsIcon icon={Award01Icon} className="size-5 text-[#00579D]" />
                Certificado WEG Skills
              </span>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
              </button>
            </div>

            {/* Modal Body: Certificate Vector Image */}
            <div className="w-full overflow-auto flex-1 flex items-center justify-center p-1">
              <CertificateContent />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <Button
                onClick={handleDownload}
                className="bg-[#00579D] hover:bg-[#004780] active:scale-95 text-white font-semibold px-4 py-5.5 rounded-xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <HugeiconsIcon icon={Download01Icon} className="size-4" />
                Baixar Certificado
              </Button>
              <Button
                onClick={() => setOpenModal(false)}
                className="bg-slate-200 text-slate-700 hover:bg-slate-300 font-semibold px-5 py-5.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Componente de Imagem Vetorial do Certificado (NUNCA quebra ou distorce)
function CertificateContent() {
  return (
    <svg
      id="certificate-svg"
      viewBox="0 0 800 565"
      className="w-full h-auto max-h-[75vh] drop-shadow-xl select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fundo do Certificado */}
      <rect x="0" y="0" width="800" height="565" fill="#FFFFFF" rx="8" />

      {/* Bordas Duplas Azuis */}
      <rect x="15" y="15" width="770" height="535" fill="none" stroke="#00579D" strokeWidth="6" rx="4" />
      <rect x="23" y="23" width="754" height="519" fill="none" stroke="#00579D" strokeWidth="2" rx="2" />

      {/* Marca d'água de Fundo */}
      <g opacity="0.04">
        <image href="/assets/icons/Logo WEG Skills Azul.svg" x="250" y="132" width="300" height="300" />
      </g>

      {/* Logo WEG Skills no Topo */}
      <image href="/assets/icons/Logo WEG Skills Azul.svg" x="300" y="45" width="200" height="50" />

      {/* Título Principal */}
      <text
        x="400"
        y="145"
        textAnchor="middle"
        fill="#00579D"
        fontFamily="Georgia, serif"
        fontSize="26"
        fontWeight="bold"
        letterSpacing="3"
      >
        CERTIFICADO DE CONCLUSÃO
      </text>

      {/* Subtítulo */}
      <text x="400" y="195" textAnchor="middle" fill="#475569" fontSize="17" fontFamily="system-ui, sans-serif">
        Certificamos que
      </text>

      {/* Nome do Aluno */}
      <text x="400" y="255" textAnchor="middle" fill="#1E293B" fontSize="34" fontWeight="bold" fontFamily="system-ui, sans-serif">
        Miguel dos Santos
      </text>

      {/* Linha Divisória sob o Nome */}
      <line x1="240" y1="275" x2="560" y2="275" stroke="#E2E8F0" strokeWidth="2" />

      {/* Descrição da Conclusão */}
      <text x="400" y="320" textAnchor="middle" fill="#475569" fontSize="16" fontFamily="system-ui, sans-serif">
        concluiu com êxito o curso de formação profissionalizante em
      </text>

      {/* Nome do Curso */}
      <text x="400" y="365" textAnchor="middle" fill="#00579D" fontSize="25" fontWeight="bold" fontFamily="system-ui, sans-serif">
        Ferramentaria para Sistemas WEB
      </text>

      {/* Seção de Assinatura */}
      <g>
        <text
          x="140"
          y="460"
          textAnchor="middle"
          fill="#003057"
          fontSize="24"
          fontFamily="'Brush Script MT', 'Lucida Handwriting', 'Segoe Print', cursive"
          transform="rotate(-5, 140, 460)"
        >
          J. Silva
        </text>
        <line x1="60" y1="475" x2="220" y2="475" stroke="#1E293B" strokeWidth="1.5" />
        <text x="140" y="495" textAnchor="middle" fill="#475569" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="500">
          Assinatura do Instrutor
        </text>
      </g>

      {/* Seção de Informações / Autenticidade */}
      <g>
        <text x="730" y="455" textAnchor="end" fill="#334155" fontSize="13" fontFamily="system-ui, sans-serif">
          <tspan fontWeight="bold">Data:</tspan> 25 de Julho de 2026
        </text>
        <text x="730" y="477" textAnchor="end" fill="#334155" fontSize="13" fontFamily="system-ui, sans-serif">
          <tspan fontWeight="bold">Carga Horária:</tspan> 8 horas
        </text>
        <text x="730" y="498" textAnchor="end" fill="#94A3B8" fontSize="11" fontFamily="system-ui, sans-serif">
          Autenticidade: WEG-7A9B-2026
        </text>
      </g>
    </svg>
  );
}
