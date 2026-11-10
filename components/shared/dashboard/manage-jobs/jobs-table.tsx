"use client"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { cn } from "cn"

import type { Job } from "./types"
import JobRow from "./job-row"

const COLUMN_LABELS = [
  "Job Title & Dept",
  "Company & Location",
  "Type",
  "Compensation",
  "Applicants",
  "Status",
  "Deadline",
  "Actions",
] as const

export function JobsTable({ jobs }: { jobs: Job[] }) {
  return (
    <div className="rounded-xl ring-1 ring-foreground/10">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {COLUMN_LABELS.map((label, index) => (
              <TableHead
                key={label}
                className={cn(
                  "px-3 text-xs font-medium tracking-wider whitespace-nowrap text-muted-foreground uppercase",
                  index === COLUMN_LABELS.length - 1 && "text-right"
                )}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <JobRow key={job.id || `${job.title}-${job.createdAt}`} job={job} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
