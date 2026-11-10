import { cn } from "cn"
import type { JobStatus } from "./types"

const STATUS_STYLES: Record<
  JobStatus,
  { label: string; className: string; dotClass: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-400",
    dotClass: "bg-emerald-400",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-400",
    dotClass: "bg-amber-400",
  },
  expired: {
    label: "Expired",
    className: "bg-muted text-muted-foreground",
    dotClass: "bg-muted-foreground/60",
  },
}

export function JobStatusBadge({
  status,
  className,
}: {
  status: JobStatus
  className?: string
}) {
  const style = STATUS_STYLES[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
    dotClass: "bg-muted-foreground/60",
  }

  return (
    <span
      data-slot="job-status-badge"
      className={cn(
        "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium",
        style.className,
        className
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 shrink-0 rounded-full", style.dotClass)}
      />
      {style.label}
    </span>
  )
}
