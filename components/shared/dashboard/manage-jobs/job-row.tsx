import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  EllipsisVerticalIcon,
  MapPinIcon,
  PencilIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { JobStatusBadge } from "./status-badge"
import {
  formatCompensation,
  formatDate,
  formatLocation,
  formatPostedAgo,
  getCategoryVisual,
} from "./helpers"

import DeleteJobAlert from "./deleteJobAlert"
import { Job } from "./types"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "cn"

const ACTION_ROUTE = "/dashboard/recruiter/update-job"

export default function JobRow({ job }: { job: Job }) {
  const router = useRouter()
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)

  const updateHref = `${ACTION_ROUTE}/${encodeURIComponent(job.id)}`
  const visual = getCategoryVisual(job.category)
  const CategoryIcon = visual.icon

  return (
    <TableRow>
      {/* Job Title & Dept */}
      <TableCell className="px-3">
        <div className="flex min-w-52 items-center gap-3 py-1">
          <span
            aria-hidden
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-md",
              visual.tileClass
            )}
          >
            <CategoryIcon className={cn("size-4", visual.textClass)} />
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">{job.title}</p>
            {job.category && (
              <p className={cn("truncate text-xs", visual.textClass)}>
                {job.category}
              </p>
            )}
          </div>
        </div>
      </TableCell>

      {/* Company & Location */}
      <TableCell className="px-3">
        <p className="truncate font-medium">{job.companyName}</p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPinIcon className="size-3 shrink-0" />
          <span className="truncate">{formatLocation(job)}</span>
        </p>
      </TableCell>

      {/* Type */}
      <TableCell className="px-3">
        <span className="inline-flex rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
          {job.jobType}
        </span>
      </TableCell>

      {/* Compensation */}
      <TableCell className="px-3">
        <span className="text-sm whitespace-nowrap">
          {formatCompensation(job)}
        </span>
      </TableCell>

      {/* Applicants */}
      <TableCell className="px-3">
        <span className="flex items-center gap-1.5 text-sm whitespace-nowrap">
          <UsersIcon className="size-4 shrink-0 text-muted-foreground" />
          {job.applicantsCount != null
            ? `${job.applicantsCount} Candidates`
            : "—"}
        </span>
      </TableCell>

      {/* Status */}
      <TableCell className="px-3">
        <JobStatusBadge status={job.status} />
      </TableCell>

      {/* Deadline */}
      <TableCell className="px-3">
        <p className="whitespace-nowrap">{formatDate(job.deadline)}</p>
        <p
          className="truncate text-xs text-muted-foreground"
          suppressHydrationWarning
        >
          {job.status === "expired"
            ? "Closed"
            : job.createdAt
              ? `Posted ${formatPostedAgo(job.createdAt)}`
              : ""}
        </p>
      </TableCell>

      {/* Actions */}
      <TableCell className="px-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            render={<Link href={updateHref} />}
            size="sm"
            nativeButton={false}
          >
            <PencilIcon />
            Update
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2Icon />
            <span className="sr-only">Delete {job.title}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground"
                />
              }
            >
              <EllipsisVerticalIcon />
              <span className="sr-only">More actions for {job.title}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36">
              <DropdownMenuItem render={<Link href={updateHref} />}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setIsDeleteOpen(true)}
              >
                <Trash2Icon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DeleteJobAlert
          job={job}
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onDeleted={() => {
            setIsDeleteOpen(false)
            router.refresh()
          }}
        />
      </TableCell>
    </TableRow>
  )
}
