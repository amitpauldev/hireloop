import { createAuthClient } from "better-auth/react"
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient<typeof auth>({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
})
