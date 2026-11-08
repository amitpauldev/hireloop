"use client"

import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  GitHubIcon,
  GoogleIcon,
} from "@/components/shared/authentication/icons"
import { useState } from "react"

export function SocialAuthButtons() {
  const router = useRouter()
  const [pending, setPending] = useState<"google" | "github" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const socialProviders = [
    { id: "google" as const, label: "Google", Icon: GoogleIcon },
    { id: "github" as const, label: "GitHub", Icon: GitHubIcon },
  ]

  async function signInWithSocial(provider: "google" | "github") {
    setError(null)
    setPending(provider)
    await authClient.signIn.social({
      provider,
      callbackURL: `${window.location.origin}/dashboard`,
    })
    setPending(null)
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid gap-2.5 sm:grid-cols-2">
        {socialProviders.map(({ id, label, Icon }) => (
          <Button
            key={id}
            type="button"
            variant="outline"
            size="lg"
            disabled={pending !== null}
            onClick={() => signInWithSocial(id)}
            className="h-10 justify-center rounded-xl px-3 text-sm hover:bg-accent"
          >
            {pending === id ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Icon />
            )}
            {label}
          </Button>
        ))}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
