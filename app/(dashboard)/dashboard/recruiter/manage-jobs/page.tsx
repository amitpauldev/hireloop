import { Suspense } from "react"
import Link from "next/link"
import { cookies } from "next/headers"
import {
  BriefcaseBusinessIcon,
  PlusIcon,
  ServerCrashIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import {
  JobsTable,
  JobsTableSkeleton,
  normalizeJob,
  type Job,
  type RawJob,
} from "@/components/shared/dashboard/manage-jobs"

const NEW_JOB_HREF = "/dashboard/recruiter/manage-jobs/add-job"

async function fetchJobs(): Promise<{ jobs: Job[]; error: string | null }> {
  try {
    const cookieHeader = (await cookies()).toString()

    const res = await fetch(`${process.env.SERVER_URL}/jobs`, {
      headers: {
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return {
        jobs: [],
        error: `The job service responded with HTTP ${res.status}.`,
      }
    }

    const data = (await res.json()) as {
      success?: boolean
    } & (RawJob[] | { jobs?: RawJob[]; data?: RawJob[] })

    // Confirmed API envelope: { success, data: [...] }
    const failed = !Array.isArray(data) && data.success === false
    if (failed) {
      return { jobs: [], error: "The job service reported a failure." }
    }

    const list = Array.isArray(data)
      ? data
      : (data.jobs ?? data.data ?? [])

    return {
      jobs: list.map(normalizeJob).filter((job) => job.id !== ""),
      error: null,
    }
  } catch {
    return {
      jobs: [],
      error: "We couldn't reach the job service. Please try again later.",
    }
  }
}

async function JobsSection() {
  const { jobs, error } = await fetchJobs()

  if (error) {
    return (
      <Feedback
        icon={ServerCrashIcon}
        title="Something went wrong"
        description={error}
      />
    )
  }

  if (jobs.length === 0) {
    return (
      <Feedback
        icon={BriefcaseBusinessIcon}
        title="No job posts yet"
        description="Publish your first listing to start reviewing live postings and applicants across your organization."
        cta={{ href: NEW_JOB_HREF, label: "New Job Post" }}
      />
    )
  }

  return <JobsTable jobs={jobs} />
}

function Feedback({
  icon: Icon,
  title,
  description,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  cta?: { href: string; label: string }
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <span
          aria-hidden
          className="flex size-10 items-center justify-center rounded-md bg-muted"
        >
          <Icon className="size-5 text-muted-foreground" />
        </span>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        {cta && (
          <Link
            href={cta.href}
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            <PlusIcon />
            {cta.label}
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

const ManageJobs = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link
          href="/dashboard/recruiter"
          className="transition-colors hover:text-foreground"
        >
          Manage Jobs
        </Link>
        <span aria-hidden className="mx-1.5">
          ›
        </span>
        <span className="text-foreground">Job Listings &amp; Postings</span>
      </nav>

      {/* Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Manage Job Posts
          </h1>
          <p className="text-sm text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Link
          href={NEW_JOB_HREF}
          className={buttonVariants({
            variant: "default",
            className: "w-full sm:w-auto",
          })}
        >
          <PlusIcon />
          New Job Post
        </Link>
      </header>

      {/* Scrollable listings (single table, swipeable on mobile) */}
      <Suspense fallback={<JobsTableSkeleton />}>
        <JobsSection />
      </Suspense>
    </div>
  )
}

export default ManageJobs
