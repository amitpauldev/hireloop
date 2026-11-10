import Link from "next/link"
import { PublishJob } from "@/components/shared/dashboard/add-update-job"

const AddNewJob = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link
          href="/dashboard/recruiter/manage-jobs"
          className="transition-colors hover:text-foreground"
        >
          Manage Jobs
        </Link>
        <span aria-hidden className="mx-1.5">
          ›
        </span>
        <span className="text-foreground">Create New Listing</span>
      </nav>

      {/* Page header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Post a New Job
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill in the position specifications to attract qualified talent across
          our network.
        </p>
      </header>

      <PublishJob />
    </div>
  )
}

export default AddNewJob
