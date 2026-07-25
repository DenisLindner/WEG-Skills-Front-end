import React from "react";
import { Button } from "@/components/atoms/button";
import Image from "next/image";

export default function IssueCertificatePage() {
  return (
    <main className="flex-1 flex flex-col w-full bg-white">
          {/* Top Section */}
          <section className="w-full bg-slate-50 border-b border-slate-200 py-10 md:py-16 px-4">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-8">

                  <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 max-w-xl">
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00579D] tracking-tight mb-4">
                          Ferramentaria para Sistemas WEB
                      </h1>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-5">
                          <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[11px] text-slate-600 font-medium shadow-sm">Desenvolvimento Web</span>
                          <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[11px] text-slate-600 font-medium shadow-sm">Lógica de Programação</span>
                          <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[11px] text-slate-600 font-medium shadow-sm">React</span>
                      </div>
                      <p className="text-sm md:text-base text-slate-500 leading-relaxed text-balance">
                          Aprenda a construir interfaces modernas e interativas com as ferramentas e bibliotecas mais requisitadas pelo mercado de tecnologia.
                          Este curso abrange de ponta a ponta as práticas reais da indústria, capacitando você a solucionar desafios e entregar sistemas eficientes.
                      </p>
                  </div>

                  <div className="flex flex-col items-stretch sm:items-end gap-4 w-full md:w-auto min-w-[280px]">
                      <div className="grid grid-cols-2 gap-3 w-full">
                          <div className="bg-white shadow-sm px-4 py-2.5 rounded border border-slate-100 flex flex-col items-center justify-center text-center">
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Duração</span>
                              <span className="text-sm md:text-base font-bold text-slate-800">8h</span>
                          </div>
                          <div className="bg-white shadow-sm px-4 py-2.5 rounded border border-slate-100 flex flex-col items-center justify-center text-center">
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Valor</span>
                              <span className="text-sm md:text-base font-bold text-[#187545]">R$ 150.00</span>
                          </div>
                          <div className="bg-white shadow-sm px-4 py-2.5 rounded border border-slate-100 flex flex-col items-center justify-center text-center">
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Modalidade</span>
                              <span className="text-sm md:text-base font-bold text-slate-800">Online</span>
                          </div>
                          <div className="bg-white shadow-sm px-4 py-2.5 rounded border border-slate-100 flex flex-col items-center justify-center text-center">
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Nível</span>
                              <span className="text-sm md:text-base font-bold text-slate-800">Intermediário</span>
                          </div>
                      </div>

                      <Button className="bg-[#00579D] hover:bg-[#004780] text-white px-6 py-6 text-sm md:text-base rounded-md font-medium w-full sm:w-auto shadow-sm self-end">
                          Emitir Certificado
                      </Button>
                  </div>

              </div>
          </section>

          {/* Bottom Section */}
          <section className="w-full bg-[#003057] flex-1 flex flex-col items-center justify-center py-16 px-4 md:py-24">
              <div className="w-full max-w-5xl bg-white p-3 sm:p-4 shadow-lg rounded aspect-[1.414/1] md:aspect-video flex items-stretch justify-stretch relative">
                  {/* Certificate Preview */}
                  <div className="w-full h-full bg-white p-6 md:p-12 flex flex-col items-center justify-between border-[8px] border-double border-[#00579D] relative overflow-hidden shadow-inner">

                      {/* Fundo decorativo sutil (marca d'água) */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                          <Image
                              src="/assets/icons/Logo WEG Skills Azul.svg"
                              alt="Watermark"
                              width={600}
                              height={600}
                              className="object-contain" />
                      </div>

                      {/* Cabeçalho do certificado */}
                      <div className="mb-6 flex items-center justify-center">
                          <Image
                              src="/assets/icons/Logo WEG Skills Azul.svg"
                              alt="WEG Skills Logo"
                              width={200}
                              height={50}
                              className="w-40 md:w-52 h-auto object-contain" />
                      </div>

                      {/* Texto principal */}
                      <div className="flex flex-col items-center text-center flex-1 justify-center z-10 w-full">
                          <h2 className="text-xl md:text-3xl lg:text-4xl font-serif text-[#00579D] font-bold uppercase tracking-widest mb-4">
                              Certificado de Conclusão
                          </h2>

                          <p className="text-slate-600 text-base md:text-xl mb-2">
                              Certificamos que
                          </p>

                          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2 px-8">
                              Miguel dos Santos
                          </h3>

                          <p className="text-slate-600 text-base md:text-xl mb-4 max-w-2xl leading-relaxed">
                              concluiu com êxito o curso de formação profissionalizante em
                          </p>

                          <h4 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#00579D]">
                              Ferramentaria para Sistemas WEB
                          </h4>
                      </div>

                      {/* Rodapé do certificado */}
                      <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between mt-6 pt-4 relative z-10 gap-6">

                          <div className="flex flex-col items-center w-48 md:w-56 relative pt-10">
                              {/* Rúbrica / Assinatura */}
                              <span
                                  className="text-3xl md:text-4xl text-[#003057] absolute bottom-4 select-none opacity-80"
                                  style={{
                                      fontFamily: "'Brush Script MT', 'Lucida Handwriting', 'Segoe Print', cursive",
                                      transform: "rotate(-5deg)"
                                  }}
                              >
                                  J. Silva
                              </span>
                              <div className="w-full border-b border-slate-800 mb-2"></div>
                              <span className="text-xs md:text-sm text-slate-600 font-medium text-center w-full">Assinatura do Instrutor</span>
                          </div>

                          <div className="flex flex-col items-center md:items-end text-slate-600 space-y-1 text-center md:text-right">
                              <p className="text-sm md:text-base"><strong>Data:</strong> 25 de Julho de 2026</p>
                              <p className="text-sm md:text-base"><strong>Carga Horária:</strong> 8 horas</p>
                              <p className="text-[10px] md:text-xs text-slate-400 mt-1">Autenticidade: WEG-7A9B-2026</p>
                          </div>

                      </div>

                  </div>
              </div>
          </section>
      </main>
  );
}
