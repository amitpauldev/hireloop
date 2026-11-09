"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { navLinks } from "./nav-links"
import { Logo } from "./logo"
import { authClient } from "@/lib/auth-client"
import { cn } from "cn"

export function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const { data: session } = authClient.useSession()

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  // Lock page scroll while the drawer is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      {/* Toggle */}
      <Button
        variant="ghost"
        size="icon-lg"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen((prev) => !prev)}
        className="size-11! rounded-2xl border border-border bg-card/90 text-foreground/80 shadow-lg shadow-background/50 backdrop-blur-md hover:bg-secondary hover:text-foreground lg:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {/* Backdrop: clicks anywhere outside the 40% drawer close it */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Sidebar drawer — 40% of the viewport width */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-2/5 min-w-64 flex-col overflow-y-auto border-l border-border bg-card p-5 shadow-2xl shadow-background/60 transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <Logo onClick={close} />
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="mt-4 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={close}
              className={cn(
                "rounded-lg px-3 py-3 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground",
                pathname.startsWith(link.href) && "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 border-t border-border pt-6">
          {session ? (
            <div className="flex items-center gap-3">
              <Avatar className="border border-border bg-card shadow-lg shadow-background/50">
                {session.user.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                  />
                ) : null}
                <AvatarFallback>
                  {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[15px] font-semibold text-foreground">
                  {session.user.name ?? "My Account"}
                </span>
                {session.user.email ? (
                  <span className="truncate text-xs text-muted-foreground">
                    {session.user.email}
                  </span>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/sign-in"
                onClick={close}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "w-full justify-center rounded-xl text-[15px] font-semibold text-primary hover:bg-accent hover:text-primary",
                  })
                )}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={close}
                className={cn(
                  buttonVariants({
                    size: "lg",
                    className:
                      "h-11 w-full justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-[0_0_24px_-4px] shadow-primary/50 hover:bg-primary/90",
                  })
                )}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
