"use client"

import * as React from "react"
import { Rating } from "@/components/atoms/rating"
import { Button } from "@/components/atoms/button"
import { cn } from "@/lib/utils"

export interface CourseCardProps {
  imageSrc?: string
  imageAlt?: string
  title: string
  description: string
  /**
   * Nota do curso (0 a 10).
   * Ex: 8 (preenche 4 estrelas), 7.5 (preenche 3.75 estrelas), 2 (preenche 1 estrela).
   */
  rating: number
  /**
   * Escala máxima da nota.
   * @default 10
   */
  maxScore?: number
  buttonText?: string
  onButtonClick?: () => void
  /**
   * Se true, desabilita a interação direta do usuário nas estrelas.
   * @default true
   */
  readOnlyRating?: boolean
  className?: string
}

/**
 * Componente Molecule: CourseCard
 * 
 * Classificado como **Molecule** no Atomic Design pois combina múltiplos átomos 
 * (Rating, Button, elementos de mídia e tipografia) para formar uma unidade funcional.
 */
export function CourseCard({
  imageSrc,
  imageAlt = "Imagem do curso",
  title,
  description,
  rating,
  maxScore = 10,
  buttonText = "Matricular",
  onButtonClick,
  readOnlyRating = true, // Desabilitado clique por padrão
  className,
}: CourseCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[280px] bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col justify-between gap-4 transition-all hover:shadow-md",
        className
      )}
    >
      {/* Banner / Área da imagem */}
      <div className="w-full h-36 bg-slate-200 rounded-md flex items-center justify-center overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-slate-500 font-medium text-lg">imagem</span>
        )}
      </div>

      {/* Conteúdo textual e Avaliação */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-slate-900 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2">
          {description}
        </p>
        
        {/* Atom: Rating */}
        <div className="pt-1">
          <Rating
            value={rating}
            maxScore={maxScore}
            maxStars={5}
            readOnly={readOnlyRating}
            size="md"
          />
        </div>
      </div>

      {/* Atom: Button */}
      <Button
        onClick={onButtonClick}
        className="w-full bg-[#00579D] hover:bg-[#004780] text-white font-medium py-2 h-auto text-base rounded-md"
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default CourseCard
