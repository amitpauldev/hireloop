import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function AuthCard({
  title,
  description,
  headerAction,
  children,
  footer,
}: {
  title: string
  description?: string
  headerAction?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <Card className="w-full gap-5 rounded-2xl border-border/60 bg-card/95 py-6 shadow-xl shadow-background/50 backdrop-blur-md">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {headerAction}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col gap-5">{children}</CardContent>
      {footer && <CardFooter className="border-border/60">{footer}</CardFooter>}
    </Card>
  )
}
