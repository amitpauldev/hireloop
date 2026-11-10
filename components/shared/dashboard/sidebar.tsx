"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  PlusCircleIcon,
  Settings,
  Users,
  Wallet,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Logo } from "../header"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "cn"
import type { LucideIcon } from "lucide-react"

type DashboardRole = "seeker" | "recruiter" | "admin"

type NavItem = {
  title: string
  url: string
  icon: LucideIcon
}

const NAV_ITEMS: Record<DashboardRole, NavItem[]> = {
  seeker: [
    { title: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { title: "Jobs", url: "/dashboard/seeker/jobs", icon: BriefcaseBusiness },
    { title: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
    {
      title: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    { title: "Billing", url: "/dashboard/seeker/billing", icon: Wallet },
    { title: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { title: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    {
      title: "Add Job",
      url: "/dashboard/recruiter/jobs/add-job",
      icon: PlusCircleIcon,
    },
    {
      title: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      title: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    { title: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { title: "Users", url: "/dashboard/admin/users", icon: Users },
    { title: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { title: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
    { title: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { title: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

const PORTAL_INFO: Record<
  DashboardRole,
  { title: string; subtitle: string; badge?: string }
> = {
  seeker: { title: "Seeker Portal", subtitle: "Professional Tier" },
  recruiter: {
    title: "Recruiter Portal",
    subtitle: "Recruiter",
    badge: "Premium account",
  },
  admin: { title: "Admin Console", subtitle: "Platform administrator" },
}

export function AppSidebar() {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const pathname = usePathname()
  const router = useRouter()
  const { setOpenMobile, isMobile } = useSidebar()

  const userRole = (user?.role ?? "seeker") as DashboardRole
  const items = NAV_ITEMS[userRole]
  const portal = PORTAL_INFO[userRole]

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/")
  }

  return (
    <Sidebar collapsible="icon">
      {/* Brand */}
      <SidebarHeader className="p-3 pb-1">
        <Logo className="group-data-[collapsible=icon]:hidden" />

        {/* Portal identity card */}
        <div className="flex items-center gap-3 rounded-lg bg-muted/60">
          <Avatar className="size-8">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name || "User avatar"} />
            ) : null}
            <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
              {(user?.name || portal.title).slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-col gap-1 group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm leading-none font-semibold">
              {user?.name || portal.title}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="truncate text-xs text-muted-foreground">
                {portal.subtitle}
              </span>
            </span>
            {portal.badge && (
              <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                {portal.badge}
              </span>
            )}
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup className="p-2">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(`${item.url}/`)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={
                        <Link
                          href={item.url}
                          className={cn(
                            "border-l-2 border-transparent transition-colors",
                            isActive && "border-l-sidebar-primary"
                          )}
                          onClick={() => isMobile && setOpenMobile(false)}
                        />
                      }
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: sign out */}
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              onClick={handleSignOut}
              variant="outline"
            >
              <LogOut className="rotate-180" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
