"use server"

import { cookies } from "next/headers"

export type DeleteJobResult = {
  ok: boolean
  error?: string
}

/** DELETE a job at SERVER_URL/jobs/:id (extends to other job mutations later). */
export async function deleteJob(id: string): Promise<DeleteJobResult> {
  try {
    if (!id) {
      return { ok: false, error: "Missing job id." }
    }

    const cookieHeader = (await cookies()).toString()

    const res = await fetch(`${process.env.SERVER_URL}/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
    })

    if (!res.ok) {
      return {
        ok: false,
        error: `Failed to delete job (HTTP ${res.status}).`,
      }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      error: "Could not reach the job service. Please try again.",
    }
  }
}
