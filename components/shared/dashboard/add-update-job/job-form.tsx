"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  Building2Icon,
  CalendarIcon,
  GlobeIcon,
  MapPinIcon,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "cn"
import {
  JOB_CATEGORIES,
  JOB_TYPES,
  SALARY_FREQUENCIES,
  type JobFormValues,
} from "./types"

const DEFAULT_INITIAL_VALUES: JobFormValues = {
  title: "",
  companyName: "",
  category: JOB_CATEGORIES[0],
  jobType: JOB_TYPES[0],
  remote: false,
  location: "",
  deadline: "",
  salaryMin: "",
  salaryMax: "",
  salaryFrequency: SALARY_FREQUENCIES[0],
  responsibilities:
    "Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products.",
  requirements:
    "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers",
}

export type JobFormProps = {
  /** Called on submit. Throw to show the error banner; the form handles the busy state. */
  onSubmit: (values: JobFormValues) => Promise<void> | void
  initialValues?: Partial<JobFormValues>
  submitLabel?: string
  className?: string
}

export function JobForm({
  onSubmit,
  initialValues,
  submitLabel = "Save",
  className,
}: JobFormProps) {
  const [values, setValues] = React.useState<JobFormValues>({
    ...DEFAULT_INITIAL_VALUES,
    ...initialValues,
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const update = <K extends keyof JobFormValues>(
    key: K,
    value: JobFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await onSubmit(values)
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {/* 1. Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SectionDot />
            1. Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Job Title" required>
            <Input
              placeholder="Frontend Developer"
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company Name" required>
              <IconInput icon={Building2Icon}>
                <Input
                  className="pl-8"
                  placeholder="HireLoop Network"
                  value={values.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                />
              </IconInput>
            </Field>

            <Field label="Job Category" required>
              <Select
                value={values.category}
                onValueChange={(next) =>
                  update("category", next as JobFormValues["category"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Job Type" required>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {JOB_TYPES.map((type) => {
                const isActive = values.jobType === type
                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => update("jobType", type)}
                    className={cn(
                      "flex h-10 items-center justify-center rounded-lg border border-input text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px",
                      isActive
                        ? "border-primary bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-muted/60"
                    )}
                  >
                    {type}
                  </button>
                )
              })}
            </div>
          </Field>
        </CardContent>
      </Card>

      {/* 2. Location, Compensation & Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SectionDot />
            2. Location, Compensation &amp; Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-lg border border-input bg-muted/30 px-4 py-3">
            <div className="flex items-start gap-3">
              <GlobeIcon className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">
                  Remote Work Allowed (isRemote)
                </p>
                <p className="text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>
            <Switch
              checked={values.remote}
              onCheckedChange={(checked) => update("remote", checked)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Job Location (location)">
              <IconInput icon={MapPinIcon}>
                <Input
                  className="pl-8"
                  placeholder="New York, USA"
                  value={values.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </IconInput>
            </Field>

            <Field label="Application Deadline (deadline)">
              <IconInput icon={CalendarIcon}>
                <Input
                  className="pl-8"
                  type="date"
                  value={values.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                />
              </IconInput>
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Min Salary / Rate">
              <Input
                type="number"
                min={0}
                placeholder="€ 25"
                value={values.salaryMin}
                onChange={(e) => update("salaryMin", e.target.value)}
              />
            </Field>

            <Field label="Max Salary / Rate">
              <Input
                type="number"
                min={0}
                placeholder="€ 40"
                value={values.salaryMax}
                onChange={(e) => update("salaryMax", e.target.value)}
              />
            </Field>

            <Field label="Frequency">
              <Select
                value={values.salaryFrequency}
                onValueChange={(next) =>
                  update(
                    "salaryFrequency",
                    next as JobFormValues["salaryFrequency"]
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SALARY_FREQUENCIES.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* 3. Responsibilities & Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SectionDot />
            3. Responsibilities &amp; Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Key Responsibilities" required>
            <Textarea
              rows={4}
              placeholder="Describe the core responsibilities of the role..."
              value={values.responsibilities}
              onChange={(e) => update("responsibilities", e.target.value)}
            />
          </Field>

          <Field label="Qualifications & Requirements" required>
            <Textarea
              rows={4}
              placeholder="List qualifications and requirements, one per line..."
              value={values.requirements}
              onChange={(e) => update("requirements", e.target.value)}
            />
          </Field>
        </CardContent>
      </Card>

      {/* Errors */}
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Publishing..." : submitLabel}
          {!isSubmitting && <ArrowRightIcon />}
        </Button>
      </div>
    </form>
  )
}

function SectionDot() {
  return <span className="size-1.5 rounded-full bg-primary" />
}

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label>
        {label}
        {required && (
          <span aria-hidden className="text-primary">
            *
          </span>
        )}
      </Label>
      {children}
    </div>
  )
}

function IconInput({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      {children}
    </div>
  )
}
