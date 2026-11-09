"use client"

import { usePathname } from "next/navigation"
import { Logo } from "./logo"
import { NavLinks } from "./nav-links"
import { AuthActions } from "./auth-actions"
import { UserMenu } from "./user-menu"
import { MobileMenu } from "./mobile-menu"
import { authClient } from "@/lib/auth-client"

export function Header() {
  const pathname = usePathname()

  const { data: session } = authClient.useSession()

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Brand */}
        <Logo className="px-4 py-2" />

        {/* Desktop nav panel */}
        <div className="hidden items-center gap-2 rounded-2xl border border-border bg-card/90 px-4 py-2 shadow-lg shadow-background/50 backdrop-blur-md lg:flex">
          <NavLinks pathname={pathname} />
          <span aria-hidden="true" className="mx-2 h-px w-8 bg-border" />
          {session ? <UserMenu user={session.user} /> : <AuthActions />}
        </div>

        {/* Mobile toggle + drawer */}
        <MobileMenu pathname={pathname} />
      </div>
    </header>
  )
}
