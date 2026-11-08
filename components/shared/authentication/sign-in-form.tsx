"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PasswordInput } from "@/components/shared/authentication/password-input"

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(true)
  const [errors, setErrors] = React.useState<{
    email?: string
    password?: string
  }>({})
  const [authError, setAuthError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setAuthError(null)

    const nextErrors: typeof errors = {}
    if (!email.trim()) nextErrors.email = "Email is required."
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      nextErrors.email = "Enter a valid email address."
    if (!password) nextErrors.password = "Password is required."
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setPending(true)
    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
      rememberMe,
    })

    if (error) {
      setAuthError(error.message || "Invalid email or password.")
      setPending(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sign-in-email" className="text-sm">
          Email
        </Label>
        <Input
          id="sign-in-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="sign-in-email-error"
          className="h-10 rounded-xl px-3.5 text-sm dark:bg-input/30"
        />
        {errors.email && (
          <p id="sign-in-email-error" className="text-xs text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sign-in-password" className="text-sm">
          Password
        </Label>
        <PasswordInput
          id="sign-in-password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={Boolean(errors.password)}
          aria-describedby="sign-in-password-error"
          className="h-10 rounded-xl px-3.5 text-sm dark:bg-input/30"
        />
        {errors.password && (
          <p id="sign-in-password-error" className="text-xs text-destructive">
            {errors.password}
          </p>
        )}
      </div>

      {/* Remember-me toggle */}
      <div className="flex items-center gap-2.5">
        <Switch
          id="sign-in-remember"
          size="sm"
          checked={rememberMe}
          onCheckedChange={setRememberMe}
        />
        <Label
          htmlFor="sign-in-remember"
          className="text-sm font-normal text-muted-foreground"
        >
          Keep me signed in
        </Label>
      </div>

      {authError && (
        <p role="alert" className="text-sm text-destructive">
          {authError}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="h-10 rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        {pending && <Loader2 className="size-4 animate-spin" />}
        Sign in
      </Button>
    </form>
  )
}
