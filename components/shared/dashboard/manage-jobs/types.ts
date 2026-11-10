export type JobStatus = "active" | "expired" | "pending"

export type Job = {
  id: string
  title: string
  companyName: string
  category?: string
  jobType: string
  remote: boolean
  location?: string
  deadline?: string
  salaryMin?: string | number | null
  salaryMax?: string | number | null
  salaryFrequency?: "per hour" | "per month" | "per year" | string
  applicantsCount?: number
  status: JobStatus
  createdAt: string
}

/** Shape the API may return - normalizeJob maps it into a reliable Job. */
export type RawJob = Partial<Job> & { _id?: string }

export function normalizeJob(raw: RawJob): Job {
  let status: JobStatus = "pending"
  if (raw.status === "active" || raw.status === "expired") {
    status = raw.status
  }

  return {
    id: String(raw.id ?? raw._id ?? ""),
    title: raw.title || "Untitled role",
    companyName: raw.companyName || "Unknown company",
    category: raw.category,
    jobType: raw.jobType || "Full-time",
    remote: Boolean(raw.remote),
    location: raw.location,
    deadline: raw.deadline,
    salaryMin: raw.salaryMin ?? null,
    salaryMax: raw.salaryMax ?? null,
    salaryFrequency: raw.salaryFrequency,
    applicantsCount:
      typeof raw.applicantsCount === "number" ? raw.applicantsCount : undefined,
    status,
    createdAt: raw.createdAt ?? "",
  }
}
