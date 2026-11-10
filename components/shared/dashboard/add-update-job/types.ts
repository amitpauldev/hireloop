export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

export type SalaryFrequency = "per hour" | "per month" | "per year"

export type JobStatus = "active" | "expired" | "pending"

export type JobFormValues = {
  /** title */
  title: string
  /** companyName */
  companyName: string
  /** category */
  category: string
  /** jobType */
  jobType: JobType
  /** remote */
  remote: boolean
  /** location */
  location: string
  /** deadline - ISO date string (yyyy-mm-dd) */
  deadline: string
  /** salaryMin */
  salaryMin: string
  /** salaryMax */
  salaryMax: string
  /** salaryFrequency */
  salaryFrequency: SalaryFrequency
  /** responsibilities - one line per bullet */
  responsibilities: string
  /** requirements - one line per bullet */
  requirements: string
}

export type JobPayload = JobFormValues & {
  /** status */
  status: JobStatus
  /** createdAt */
  createdAt: string
  /** updatedAt */
  updatedAt: string
}

export const JOB_TYPES: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
]

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Customer Support",
] as const

export const SALARY_FREQUENCIES: SalaryFrequency[] = [
  "per hour",
  "per month",
  "per year",
]
