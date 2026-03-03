import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedTextProps {
  text: string
  className?: string
  wordClass?: string
}

export function AnimatedText({ text, className, wordClass = "reveal-word" }: AnimatedTextProps) {
  if (!text) return null

  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className={`inline-flex overflow-hidden pb-1 mr-[0.3em] ${className ?? ""}`}>
          <span className={`${wordClass} inline-block`}>
            {word}
          </span>
        </span>
      ))}
    </>
  )
}
