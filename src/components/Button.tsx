import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "popular"
  children: React.ReactNode
}

export function Button({ variant = "solid", className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full group relative overflow-hidden border border-[#1a1a1a] px-6 py-5 transition-all duration-500",
        disabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 text-[#1a1a1a] text-[0.6rem] tracking-[0.5em] uppercase font-bold group-hover:text-white transition-colors duration-500">
        {children}
      </span>
      {!disabled && (
        <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      )}
    </button>
  )
}
