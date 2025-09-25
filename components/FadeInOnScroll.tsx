"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"

interface FadeInOnScrollProps {
  children: React.ReactNode
  threshold?: number // 0.0 to 1.0, percentage of element visibility to trigger
  delay?: number // delay in ms before animation starts
}

export function FadeInOnScroll({ children, threshold = 0.1, delay = 0 }: FadeInOnScrollProps) {
  const domRef = useRef<HTMLDivElement>(null)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible(true)
            }, delay)
          } else {
            // Optional: reset visibility when out of view
            // setVisible(false);
          }
        })
      },
      {
        threshold,
      },
    )

    const currentRef = domRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, delay])

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  )
}
