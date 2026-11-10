import {
  BriefcaseIcon,
  ChartLineIcon,
  CloudIcon,
  CodeIcon,
  MegaphoneIcon,
  PenToolIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react"
import type { Job } from "./types"

const FREQUENCY_SUFFIX: Record<string, string> = {
  "per hour": "/hr",
  "per month": "/mo",
  "per year": "/yr",
}

function toNumber(value?: Job["salaryMin"]): number | null {
  if (value == null || value === "") return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function formatMoney(value: number, isYearly: boolean): string {
  if (isYearly && Math.abs(value) >= 1000) {
    const k = Math.round((value / 1000) * 10) / 10
    return `${k}k`
  }
  return String(Math.round(value * 100) / 100)
}

/** `€25 – €40 /hr` / `€90k – €115k /yr` */
export function formatCompensation(job: Omit<Job, "id">): string {
  const min = toNumber(job.salaryMin)
  const max = toNumber(job.salaryMax)

  if (min == null && max == null) return "—"

  const isYearly = job.salaryFrequency === "per year"
  const suffix = job.salaryFrequency
    ? (FREQUENCY_SUFFIX[job.salaryFrequency] ?? "")
    : ""

  if (min != null && max != null && min !== max) {
    return `€${formatMoney(min, isYearly)} – €${formatMoney(max, isYearly)}${suffix}`
  }

  const single = formatMoney(min ?? max!, isYearly)
  return `€${single}${min == null || max == null ? "+" : ""}${suffix}`
}

/** `May 30, 2025` */
export function formatDate(value?: string): string {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

/** `4d ago` / `1w ago` / `2h ago` */
export function formatPostedAgo(createdAt: string, now?: number): string {
  const postedAt = Date.parse(createdAt)
  if (!Number.isFinite(postedAt)) return "just now"

  now ??= Date.now()
  const minutes = Math.max(0, Math.floor((now - postedAt) / 60000))
  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`

  const days = Math.floor(minutes / (60 * 24))
  if (days < 1) return `${Math.floor(minutes / 60)}h ago`
  if (days < 7) return days === 1 ? "1d ago" : `${days}d ago`

  const weeks = Math.floor(days / 7)
  if (weeks < 5) return weeks === 1 ? "1w ago" : `${weeks}w ago`

  const months = Math.floor(days / 30)
  return months <= 1 ? "1mo ago" : `${months}mo ago`
}

/** `Remote (New York, USA)` / `London, UK (On-site)` */
export function formatLocation(job: Omit<Job, "id">): string {
  const { location, remote } = job
  if (remote) {
    return location ? `Remote (${location})` : "Remote"
  }
  if (location) return `${location} (On-site)`
  return "—"
}

type CategoryVisual = {
  icon: LucideIcon
  tileClass: string
  textClass: string
}

/** Colored icon tile per job category, per the reference design. */
export function getCategoryVisual(category?: string): CategoryVisual {
  const key = (category ?? "").toLowerCase()

  if (key.includes("engineering") || key.includes("tech")) {
    return { icon: CodeIcon, tileClass: "bg-sky-500/10", textClass: "text-sky-400" }
  }
  if (key.includes("design") || key.includes("product")) {
    return { icon: PenToolIcon, tileClass: "bg-orange-500/10", textClass: "text-orange-400" }
  }
  if (key.includes("infrastructure") || key.includes("devops")) {
    return { icon: CloudIcon, tileClass: "bg-teal-500/10", textClass: "text-teal-400" }
  }
  if (key.includes("marketing") || key.includes("sales")) {
    return { icon: MegaphoneIcon, tileClass: "bg-rose-500/10", textClass: "text-rose-400" }
  }
  if (key.includes("quality") || key.includes("support")) {
    return { icon: WrenchIcon, tileClass: "bg-emerald-500/10", textClass: "text-emerald-400" }
  }
  if (key.includes("finance") || key.includes("human resources")) {
    return { icon: ChartLineIcon, tileClass: "bg-blue-500/10", textClass: "text-blue-400" }
  }
  return { icon: BriefcaseIcon, tileClass: "bg-violet-500/10", textClass: "text-violet-400" }
}
