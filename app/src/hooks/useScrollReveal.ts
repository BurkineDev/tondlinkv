import { useEffect, useRef } from 'react'

/**
 * Attaches IntersectionObserver to add .visible class on .reveal elements.
 * Web-only hook — swap for Animated API in React Native.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return containerRef
}

/**
 * Animated counter hook — reusable in React Native with Animated.Value
 */
export function useCounter(target: number, duration = 1800) {
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = countRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const update = (time: number) => {
          const progress = Math.min((time - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          el.textContent = Math.round(eased * target).toLocaleString('fr-FR')
          if (progress < 1) requestAnimationFrame(update)
        }
        requestAnimationFrame(update)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [target, duration])

  return countRef
}
