import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { TopMenu } from "@/components/top-menu"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-4 bg-background">
          <TopMenu />
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-auto p-4 bg-background">{children}</main>
      </div>
    </div>
  )
}
