import Link from "next/link"

import { AuthCard } from "@/components/shared/authentication/auth-card"
import { BackToHome } from "@/components/shared/authentication/back-to-home"
import { SignUpForm } from "@/components/shared/authentication/sign-up-form"
import { SocialAuthButtons } from "@/components/shared/authentication/social-auth-buttons"
import { Separator } from "@/components/ui/separator"

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Join HireLoop to find, track and land the right job."
      headerAction={
        <Link
          href="/sign-in"
          className="shrink-0 text-sm font-medium text-primary hover:text-primary/80"
        >
          Sign in
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

      <SignUpForm />
    </AuthCard>
  )
}
