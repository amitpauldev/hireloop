"use server"

import { cookies } from "next/headers"
import type { JobPayload } from "@/components/shared/dashboard/add-update-job/types"

export type CreateJobResult = {
  ok: boolean
  error?: string
}

/** POST new job to the HireLoop API at SERVER_URL/jobs. */
export async function createJob(payload: JobPayload): Promise<CreateJobResult> {
  try {
    const cookieHeader = (await cookies()).toString()

    console.log("cookie", cookieHeader)

    const res = await fetch(`${process.env.SERVER_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      return {
        ok: false,
        error: `Failed to publish job (HTTP ${res.status})`,
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
