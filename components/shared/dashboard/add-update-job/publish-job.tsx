"use client"

import { useRouter } from "next/navigation"
import { createJob } from "@/app/(dashboard)/dashboard/recruiter/manage-jobs/add-job/actions"
import { JobForm } from "./job-form"
import type { JobFormValues } from "./types"

/** Job creation flow: builds the payload, calls the server action, redirects on success. */
export function PublishJob() {
  const router = useRouter()

  const handlePublish = async (values: JobFormValues) => {
    const timestamp = new Date().toISOString()
    const result = await createJob({
      ...values,
      status: "active",
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    if (!result.ok) {
      throw new Error(result.error ?? "Failed to publish job")
    }

    router.push("/dashboard/recruiter/manage-jobs")
  }

  return <JobForm onSubmit={handlePublish} submitLabel="Publish Job" />
}
