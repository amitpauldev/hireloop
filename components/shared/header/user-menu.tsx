"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTheme } from "next-themes"
import { LayoutDashboard, LogOut, Moon, Sun, User } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "cn"

type SessionUser = NonNullable<
  NonNullable<ReturnType<typeof authClient.useSession>["data"]>
>["user"]

export function UserMenu({
  user,
  className,
}: {
  user: SessionUser
  className?: string
}) {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()

  const initial = user.name?.charAt(0).toUpperCase() ?? "U"

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark")

  const handleSignOut = async () => {
    await authClient.signOut()
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Open user menu"
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-xl p-1.5 pr-3 text-[15px] font-semibold text-foreground transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-accent",
              className
            )}
          >
            <Avatar size="default">
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name ?? "User"} />
              ) : null}
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            <span className="max-w-32 truncate">
              {user.name ?? "My Account"}
            </span>
          </button>
        }
      />

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 min-w-56 rounded-xl p-1.5"
      >
        {/* User info header */}
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar>
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name ?? "User"} />
            ) : null}
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold text-foreground">
              {user.name ?? "My Account"}
            </span>
            {user.email ? (
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            ) : null}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          render={<Link href="/my-profile" />}
          className="rounded-lg px-2 py-2"
        >
          <User />
          My Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          render={<Link href="/dashboard" />}
          className="rounded-lg px-2 py-2"
        >
          <LayoutDashboard />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={toggleTheme}
          className="rounded-lg px-2 py-2"
        >
          <Moon className="dark:hidden" />
          <Sun className="hidden dark:block" />
          {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
          className="rounded-lg px-2 py-2"
        >
          <LogOut />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
