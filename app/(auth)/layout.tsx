import Link from "next/link"
import Image from "next/image"

import { BackToHome } from "@/components/shared/authentication/back-to-home"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-svh flex-col bg-background text-foreground">
      {/* Decorative token-based glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute top-24 left-1/2 size-160 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
      </div>

      {/* Top-left: back to home */}
      <div className="absolute top-4 left-4 z-10">
        <BackToHome className="rounded-xl px-3 py-2" />
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16 sm:py-20">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="mb-8 inline-flex shrink-0 items-center select-none"
        >
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  )
}
