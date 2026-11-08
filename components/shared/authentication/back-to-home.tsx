import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BackToHome({
  className,
  label = "Back to home",
}: {
  className?: string
  label?: string
}) {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "text-muted-foreground hover:text-foreground",
        }),
        className
      )}
    >
      <ArrowLeft className="size-4" />
      {label}
    </Link>
  )
}
