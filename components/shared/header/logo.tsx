import Link from "next/link"
import Image from "next/image"
import { cn } from "cn"

export function Logo({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      onClick={onClick}
      className={cn("inline-flex shrink-0 items-center select-none", className)}
    >
      <Image
        src="/images/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        priority
        className="h-10 w-auto"
      />
    </Link>
  )
}
