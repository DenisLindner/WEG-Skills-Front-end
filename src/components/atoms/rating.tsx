"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface RatingProps {
  /**
   * Valor da avaliação (de 0 a 10 por padrão, ou de 0 a maxScore).
   * Suporta números fracionados (ex: 0, 5, 7.5, 8, 10).
   * @default 0
   */
  value?: number
  /**
   * Valor inicial para componente não controlado.
   * @default 0
   */
  defaultValue?: number
  /**
   * Escala máxima da nota recebida (ex: 10).
   * @default 10
   */
  maxScore?: number
  /**
   * Número de estrelas exibidas visualmente.
   * @default 5
   */
  maxStars?: number
  /**
   * Função executada ao alterar o valor da avaliação (se interativo).
   */
  onChange?: (value: number) => void
  /**
   * Se true, o usuário NÃO pode alterar a nota clicando/interagindo.
   * @default true
   */
  readOnly?: boolean
  /**
   * Se true, desabilita o componente e aplica estilo visual desabilitado.
   * @default false
   */
  disabled?: boolean
  /**
   * Permite seleção/exibição de meia estrela no modo interativo.
   * @default true
   */
  allowHalf?: boolean
  /**
   * Tamanho das estrelas ("sm" | "md" | "lg" ou número em px).
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | number
  /**
   * Cor de preenchimento da estrela ativa.
   * @default "#EAB308" (Amarelo/Golden)
   */
  fillColor?: string
  /**
   * Cor de fundo da estrela inativa.
   * @default "transparent"
   */
  emptyColor?: string
  /**
   * Cor do contorno (stroke) da estrela.
   * @default "#1F2937" (Grafite escuro / Preto)
   */
  strokeColor?: string
  /**
   * Espessura do contorno da estrela.
   * @default 1.5
   */
  strokeWidth?: number
  /**
   * Exibe o valor numérico ao lado das estrelas.
   * @default false
   */
  showValueText?: boolean
  /**
   * Formatação customizada do texto do valor.
   */
  valueTextFormatter?: (score: number, maxScore: number) => string
  /**
   * Classe CSS para o container principal.
   */
  className?: string
  /**
   * Classe CSS para cada estrela individual.
   */
  starClassName?: string
}

/**
 * Componente Atom: Rating (Estrelinhas)
 * 
 * Exibe a avaliação em 5 estrelas mapeada a partir de uma variável de nota (0 a 10 por padrão).
 * Por padrão, é somente leitura (`readOnly: true`), não permitindo que o usuário clique para setar a nota.
 */
export function Rating({
  value: controlledValue,
  defaultValue = 0,
  maxScore = 10,
  maxStars = 5,
  onChange,
  readOnly = true, // Desabilitado clique por padrão conforme especificado
  disabled = false,
  allowHalf = true,
  size = "md",
  fillColor = "#EAB308",
  emptyColor = "transparent",
  strokeColor = "#1F2937",
  strokeWidth = 1.5,
  showValueText = false,
  valueTextFormatter,
  className,
  starClassName,
}: RatingProps) {
  const instanceId = React.useId()
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)

  const isControlled = controlledValue !== undefined
  const rawScore = isControlled ? controlledValue : internalValue
  
  // Garante que a nota esteja entre 0 e maxScore
  const clampedScore = Math.max(0, Math.min(maxScore, rawScore))
  const displayScore = hoverValue !== null ? hoverValue : clampedScore

  // Converte a nota (0-10) para a quantidade de estrelas preenchidas (0-5)
  const starRating = maxScore > 0 ? (displayScore / maxScore) * maxStars : 0

  // Mapeia tamanhos predefinidos para pixels
  const getSizeInPixels = (s: "sm" | "md" | "lg" | number): number => {
    if (typeof s === "number") return s
    switch (s) {
      case "sm":
        return 16
      case "lg":
        return 32
      case "md":
      default:
        return 24
    }
  }

  const pxSize = getSizeInPixels(size)

  // Manipula interação de mouse em cada estrela (se readOnly for false)
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (readOnly || disabled) return

    // Converte o índice da estrela de volta para a escala de nota (0-10)
    let hoveredStarValue = index
    if (allowHalf) {
      const rect = event.currentTarget.getBoundingClientRect()
      const isLeftHalf = event.clientX - rect.left < rect.width / 2
      hoveredStarValue = isLeftHalf ? index - 0.5 : index
    }

    const calculatedScore = (hoveredStarValue / maxStars) * maxScore
    setHoverValue(calculatedScore)
  }

  const handleMouseLeave = () => {
    if (readOnly || disabled) return
    setHoverValue(null)
  }

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (readOnly || disabled) return

    let selectedStarValue = index
    if (allowHalf) {
      const rect = event.currentTarget.getBoundingClientRect()
      const isLeftHalf = event.clientX - rect.left < rect.width / 2
      selectedStarValue = isLeftHalf ? index - 0.5 : index
    }

    const selectedScore = (selectedStarValue / maxStars) * maxScore

    if (!isControlled) {
      setInternalValue(selectedScore)
    }
    onChange?.(selectedScore)
  }

  // Acessibilidade via teclado (caso interativo)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || disabled) return

    const stepScore = (maxScore / maxStars) * (allowHalf ? 0.5 : 1)
    let newScore = clampedScore

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault()
      newScore = Math.min(maxScore, clampedScore + stepScore)
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault()
      newScore = Math.max(0, clampedScore - stepScore)
    } else if (event.key === "Home") {
      event.preventDefault()
      newScore = 0
    } else if (event.key === "End") {
      event.preventDefault()
      newScore = maxScore
    }

    if (newScore !== clampedScore) {
      if (!isControlled) {
        setInternalValue(newScore)
      }
      onChange?.(newScore)
    }
  }

  // Calcula a porcentagem de preenchimento de cada estrela (0 a 100%)
  const getFillPercentage = (starIndex: number): number => {
    if (starRating >= starIndex) return 100
    if (starRating <= starIndex - 1) return 0
    return Math.round((starRating - (starIndex - 1)) * 100)
  }

  const formattedText = valueTextFormatter
    ? valueTextFormatter(displayScore, maxScore)
    : `${displayScore.toFixed(1)} / ${maxScore}`

  return (
    <div
      role={readOnly ? "img" : "radiogroup"}
      aria-label={`Avaliação: ${displayScore} de ${maxScore}`}
      aria-valuenow={displayScore}
      aria-valuemin={0}
      aria-valuemax={maxScore}
      tabIndex={readOnly || disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "inline-flex items-center gap-1 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
        disabled && "opacity-50 pointer-events-none",
        !readOnly && !disabled ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const starIndex = i + 1
        const fillPercent = getFillPercentage(starIndex)
        const gradientId = `${instanceId}-star-gradient-${starIndex}`

        return (
          <div
            key={starIndex}
            onMouseMove={(e) => handleMouseMove(e, starIndex)}
            onClick={(e) => handleClick(e, starIndex)}
            className={cn(
              "relative inline-flex items-center justify-center transition-transform duration-150",
              !readOnly && !disabled && "hover:scale-110 active:scale-95",
              starClassName
            )}
            style={{ width: pxSize, height: pxSize }}
          >
            <svg
              viewBox="0 0 24 24"
              width={pxSize}
              height={pxSize}
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${fillPercent}%`} stopColor={fillColor} />
                  <stop offset={`${fillPercent}%`} stopColor={emptyColor} />
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={`url(#${gradientId})`}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )
      })}

      {showValueText && (
        <span className="ml-1.5 text-sm font-medium text-muted-foreground">
          {formattedText}
        </span>
      )}
    </div>
  )
}

export default Rating
