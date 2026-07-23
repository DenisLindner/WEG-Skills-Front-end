import * as React from "react"
import { cn } from "@/lib/utils"

export interface RatingProps {
  rate?: number
  className?: string
}

export function Rating({ rate = 0, className }: RatingProps) {
  const instanceId = React.useId()
  const clampedRate = Math.max(0, Math.min(10, rate))
  const filledStars = clampedRate / 2

  return (
    <div className={cn("inline-flex items-center gap-0.5 sm:gap-1 select-none", className)}>
      {Array.from({ length: 5 }, (_, i) => {
        const starIndex = i + 1
        const fillPercent =
          filledStars >= starIndex
            ? 100
            : filledStars <= starIndex - 1
            ? 0
            : Math.round((filledStars - (starIndex - 1)) * 100)

        const gradientId = `${instanceId}-star-${starIndex}`

        return (
          <div key={starIndex} className="w-5 h-5 sm:w-6 sm:h-6 inline-flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${fillPercent}%`} stopColor="#EAB308" />
                  <stop offset={`${fillPercent}%`} stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={`url(#${gradientId})`}
                stroke="#1F2937"
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )
      })}
    </div>
  )
}

export default Rating
