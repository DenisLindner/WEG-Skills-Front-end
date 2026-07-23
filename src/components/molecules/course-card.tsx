"use client"

import * as React from "react"
import { Rating } from "@/components/atoms/rating"
import { Button } from "@/components/atoms/button"
import { cn } from "@/lib/utils"

export interface CourseCardProps {
  title: string
  description: string
  rate: number
  imageUrl?: string
  onEnroll?: () => void
  className?: string
}

export function CourseCard({
  title,
  description,
  rate,
  imageUrl,
  onEnroll,
  className,
}: CourseCardProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div
      className={cn(
        "w-full bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 transition-all duration-200 hover:shadow-md",
        "md:max-w-[280px] md:flex md:flex-col md:justify-between md:gap-4",
        className
      )}
    >
      {/* Mobile Accordion Header */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between cursor-pointer md:hidden gap-2 select-none"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-slate-900 leading-tight">
            {title}
          </h3>
          <Rating rate={rate} />
        </div>
        <button
          type="button"
          aria-label="Toggle course details"
          className="p-1 text-[#00579D] hover:bg-slate-100 rounded-full transition-transform"
        >
          <svg
            className={cn("w-5 h-5 transition-transform duration-200", isOpen && "rotate-180")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Card Body: Always visible on Desktop, collapsible on Mobile */}
      <div
        className={cn(
          "flex flex-col gap-4",
          !isOpen && "hidden md:flex"
        )}
      >
        {/* Banner / Image Area */}
        <div className="w-full h-32 sm:h-36 bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden mt-3 md:mt-0">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-slate-500 font-medium text-base sm:text-lg">imagem</span>
          )}
        </div>

        {/* Text Details & Rating (Desktop layout) */}
        <div className="flex flex-col gap-2">
          <h3 className="hidden md:block text-xl font-semibold text-slate-900 leading-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">{description}</p>
          <div className="hidden md:block pt-1">
            <Rating rate={rate} />
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onEnroll}
          className="w-full bg-[#00579D] hover:bg-[#004780] text-white font-medium py-2 h-auto text-sm sm:text-base rounded-md"
        >
          Matricular
        </Button>
      </div>
    </div>
  )
}

export default CourseCard
