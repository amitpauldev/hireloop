import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "cn"

const HEAD_WIDTHS = ["w-44", "w-36", "w-16", "w-24", "w-24", "w-16", "w-24"]
const CELL_WIDTHS = ["w-36", "w-28", "w-14", "w-20", "w-20", "w-14", "w-20", "w-36"]

export function JobsTableSkeleton() {
  return (
    <div className="rounded-xl ring-1 ring-foreground/10">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {HEAD_WIDTHS.map((width, index) => (
              <TableHead key={index} className="px-3">
                <Skeleton className={width} />
              </TableHead>
            ))}
            <TableHead className="px-3">
              <span className="sr-only">Loading job posts</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {CELL_WIDTHS.map((width, cellIndex) => (
                <TableCell key={cellIndex} className="px-3">
                  <Skeleton className={cn("h-8", width)} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
