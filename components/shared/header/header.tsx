"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "./logo"
import { NavLinks } from "./nav-links"
import { AuthActions } from "./auth-actions"
import { UserMenu } from "./user-menu"
import { MobileMenu } from "./mobile-menu"
import { authClient } from "@/lib/auth-client"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export function Header() {
  const pathname = usePathname()

  const { data: session } = authClient.useSession()

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left: hamburger toggle (mobile) + brand */}
        <div className="flex items-center gap-2">
          <MobileMenu pathname={pathname} />
          <Logo className="px-2 py-2" />
        </div>

        {/* Desktop nav panel (md+) */}
        <div className="hidden items-center gap-2 rounded-2xl border border-border bg-card/90 px-4 py-2 shadow-lg shadow-background/50 backdrop-blur-md md:flex">
          <NavLinks pathname={pathname} />
          <span aria-hidden="true" className="mx-2 h-px w-8 bg-border" />
          {session ? <UserMenu user={session.user} /> : <AuthActions />}
        </div>

        {/* Right side (below md): user avatar or compact sign-in */}
        <div className="flex items-center gap-2 md:hidden">
          {session ? (
            <UserMenu user={session.user} compact />
          ) : (
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className:
                    "rounded-xl border-border bg-card/90 text-[0.8rem] font-semibold text-primary shadow-lg shadow-background/50 backdrop-blur-md hover:bg-accent hover:text-primary",
                })
              )}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
