import { Header } from "@/components/shared/header"

export default function Page() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header />
      <main className="pt-24">{/* page content */}</main>
    </div>
  )
}
