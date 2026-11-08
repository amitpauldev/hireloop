import Link from "next/link"

import { AuthCard } from "@/components/shared/authentication/auth-card"
import { BackToHome } from "@/components/shared/authentication/back-to-home"
import { SignInForm } from "@/components/shared/authentication/sign-in-form"
import { SocialAuthButtons } from "@/components/shared/authentication/social-auth-buttons"
import { Separator } from "@/components/ui/separator"

export default function SignInPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to continue your job search with HireLoop."
      headerAction={
        <Link
          href="/sign-up"
          className="shrink-0 text-sm font-medium text-primary hover:text-primary/80"
        >
          Create account
        </Link>
      }
      footer={<BackToHome />}
    >
      <SocialAuthButtons />

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs tracking-wider text-muted-foreground uppercase">
          or continue with email
        </span>
        <Separator className="flex-1" />
      </div>

      <SignInForm />
    </AuthCard>
  )
}
