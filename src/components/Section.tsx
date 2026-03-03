import type { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  bgImage?: string
}

function Bglines() {
  return (
    <div className="hidden sm:block absolute inset-0 pointer-events-none">
      <div className="absolute border border-black inset-0 h-full w-full p-10">
        <div className="h-full w-full border border-black relative">
          {["-top-4 -left-4", "-top-4 -right-4", "-bottom-4 -left-4", "-bottom-4 -right-4"].map((pos) => (
            <div key={pos} className={`absolute size-4 bg-black ${pos}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Section({ children, className, bgImage }: SectionProps) {
  if (bgImage) {
    return (
      <section className={`relative min-h-screen bg-center bg-no-repeat bg-cover ${className ?? ""}`} style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative z-10 text-white">{children}</div>
      </section>
    )
  }

  return (
    <section className={`relative flex min-h-screen w-full flex-col items-center px-6 py-20 md:px-12 lg:px-20 overflow-hidden ${className ?? ""}`}>
      <Bglines />
      {children}
    </section>
  )
}

export function SectionLight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={`bg-[#E5E5DD] relative flex min-h-screen w-full flex-col items-center px-6 py-20 md:px-12 lg:px-20 overflow-hidden ${className ?? ""}`}>
      <Bglines />
      {children}
    </section>
  )
}
