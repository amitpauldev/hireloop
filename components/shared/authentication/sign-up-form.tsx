"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/shared/authentication/password-input"

type FieldName = "name" | "email" | "password" | "confirmPassword"
type Errors = Partial<Record<FieldName, string>>

export function SignUpForm() {
  const router = useRouter()
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = React.useState<Errors>({})
  const [authError, setAuthError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  const setField = (field: FieldName) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = "Name is required."
    if (!values.email.trim()) next.email = "Email is required."
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      next.email = "Enter a valid email address."
    if (values.password.length < 8)
      next.password = "Password must be at least 8 characters."
    if (values.confirmPassword !== values.password)
      next.confirmPassword = "Passwords do not match."
    return next
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setAuthError(null)

    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setPending(true)
    // Create the account, then sign in with the same credentials.
    const { error: signUpError } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    })

    if (signUpError) {
      setAuthError(signUpError.message || "Could not create your account.")
      setPending(false)
      return
    }

    const { error: signInError } = await authClient.signIn.email({
      email: values.email.trim(),
      password: values.password,
    })

    if (signInError) {
      // Account created, but sign-in failed — continue on the sign-in page.
      router.push("/sign-in")
    } else {
      router.push("/dashboard")
    }
    router.refresh()
    setPending(false)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sign-up-name" className="text-sm">
          Full name
        </Label>
        <Input
          id="sign-up-name"
          type="text"
          autoComplete="name"
          placeholder="Enter your full name"
          value={values.name}
          onChange={(e) => setField("name")(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby="sign-up-name-error"
          className="h-10 rounded-xl px-3.5 text-sm dark:bg-input/30"
        />
        {errors.name && (
          <p id="sign-up-name-error" className="text-xs text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sign-up-email" className="text-sm">
          Email
        </Label>
        <Input
          id="sign-up-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(e) => setField("email")(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="sign-up-email-error"
          className="h-10 rounded-xl px-3.5 text-sm dark:bg-input/30"
        />
        {errors.email && (
          <p id="sign-up-email-error" className="text-xs text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sign-up-password" className="text-sm">
          Password
        </Label>
        <PasswordInput
          id="sign-up-password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={values.password}
          onChange={(e) => setField("password")(e.target.value)}
          aria-invalid={Boolean(errors.password)}
          aria-describedby="sign-up-password-error"
          className="h-10 rounded-xl px-3.5 text-sm dark:bg-input/30"
        />
        {errors.password && (
          <p id="sign-up-password-error" className="text-xs text-destructive">
            {errors.password}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sign-up-confirm-password" className="text-sm">
          Confirm password
        </Label>
        <PasswordInput
          id="sign-up-confirm-password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={values.confirmPassword}
          onChange={(e) => setField("confirmPassword")(e.target.value)}
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby="sign-up-confirm-password-error"
          className="h-10 rounded-xl px-3.5 text-sm dark:bg-input/30"
        />
        {errors.confirmPassword && (
          <p
            id="sign-up-confirm-password-error"
            className="text-xs text-destructive"
          >
            {errors.confirmPassword}
          </p>
        )}
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
        Create account
      </Button>
    </form>
  )
}
