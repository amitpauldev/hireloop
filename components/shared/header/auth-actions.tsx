import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export function AuthActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link
        href="/sign-in"
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "lg",
            className:
              "rounded-xl px-4 text-[15px] font-semibold text-primary hover:bg-accent hover:text-primary",
          })
        )}
      >
        Sign In
      </Link>
      <Link
        href="/get-started"
        className={cn(
          buttonVariants({
            size: "lg",
            className:
              "h-11 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-[0_0_24px_-4px] shadow-primary/50 hover:bg-primary/90",
          })
        )}
      >
        Get Started
      </Link>
    </div>
  )
}
