import Link from "next/link"
import { cn } from "cn"

export const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const

export function NavLinks({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Main navigation" className="flex items-center gap-1">
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href)
        return (
          <Link
            key={link.label}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-lg px-3 py-2 text-[15px] font-medium whitespace-nowrap text-foreground/80 transition-colors hover:text-foreground",
              isActive && "text-foreground"
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
