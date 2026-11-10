import { useState } from "react"
import { deleteJob } from "./actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Job } from "./types"
import { Trash2Icon } from "lucide-react"

export default function DeleteJobAlert({
  job,
  open,
  onOpenChange,
  onDeleted,
}: {
  job: Job
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted: () => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    const result = await deleteJob(job.id)

    if (!result.ok) {
      setIsDeleting(false)
      setError(result.error ?? "Failed to delete job.")
      return
    }

    setIsDeleting(false)
    onDeleted()
  }

  const applicantsLabel =
    job.applicantsCount == null
      ? "its applications"
      : `its ${job.applicantsCount} application${
          job.applicantsCount === 1 ? "" : "s"
        }`

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/15 text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete “{job.title}”?</AlertDialogTitle>
          <AlertDialogDescription>
            The job post and {applicantsLabel} will be permanently removed. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
