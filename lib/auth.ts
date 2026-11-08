import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db("hireloop_db")

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        defaultValue: "seeker",
        input: true,
      },
    },
  },
  // Guard the client-supplied role: only known values pass through,
  // everything else (including direct API calls) falls back to "seeker".
  // this is for social login default role
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const allowed = ["seeker", "recruiter", "admin"] as const
          type Role = (typeof allowed)[number]
          const requestedRole = user.role as Role | undefined
          return {
            data: {
              ...user,
              role:
                requestedRole && allowed.includes(requestedRole)
                  ? requestedRole
                  : "seeker",
            },
          }
        },
      },
    },
  },
})
