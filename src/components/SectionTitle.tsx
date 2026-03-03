import { cn } from "@/lib/utils"

interface SectionTitleProps {
  small?: React.ReactNode
  title: React.ReactNode
  accent?: React.ReactNode
  smallClass?: string
  smallDevClass?: string
  className?: string
}

export function SectionTitle({ small, title, accent, smallClass, className, smallDevClass }: SectionTitleProps) {
  const accentStr = typeof accent === "string" ? ` ${accent}` : accent
  return (
    <div className="flex flex-col items-center">
      {small && (
        <div className={cn("flex items-center gap-2 mb-2", smallDevClass)}>
          <div className="h-px w-12 bg-brand-yellow" />
          <p className={cn("", smallClass)}>{small}</p>
        </div>
      )}
      <h2 className={className}>
        {title}
        {accent && <span className="italic font-light lowercase text-brand-yellow">{accentStr}</span>}
      </h2>
    </div>
  )
}
