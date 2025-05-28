"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Building2, Home, Users, Car, UserCog, Save, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarItemProps {
  icon: React.ReactNode
  href?: string
  onClick?: () => void
  active?: boolean
  tooltip: string
}

function SidebarItem({ icon, href, onClick, active, tooltip }: SidebarItemProps) {
  return href ? (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center w-16 h-16 rounded-md transition-colors relative group",
        active
          ? "bg-sidebar-active text-sidebar-active-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground",
      )}
    >
      <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
      <span className="absolute left-full ml-2 px-2 py-1 rounded bg-popover text-popover-foreground text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
        {tooltip}
      </span>
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-16 h-16 rounded-md transition-colors relative group",
        "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground",
      )}
    >
      <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
      <span className="absolute left-full ml-2 px-2 py-1 rounded bg-popover text-popover-foreground text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
        {tooltip}
      </span>
    </button>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(!isMobile)

  const handleBackup = () => {
    toast({
      title: "Backup iniciado",
      description: "O backup manual foi iniciado com sucesso.",
    })
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="fixed top-4 left-4 z-50">
          <Menu className="h-6 w-6" />
        </Button>
      )}
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground h-screen flex flex-col items-center py-4 transition-all duration-300 z-40",
          isOpen ? "w-16" : "w-0",
          isMobile && isOpen ? "fixed" : "",
          isMobile && !isOpen ? "hidden" : "",
        )}
      >
        <div className="flex flex-col space-y-2 flex-1">
          <SidebarItem
            icon={<Building2 className="h-8 w-8" />}
            href="/dashboard/condominio"
            active={pathname.includes("/condominio")}
            tooltip="Condomínio"
          />
          <SidebarItem
            icon={<Home className="h-8 w-8" />}
            href="/dashboard/unidades"
            active={pathname.includes("/unidades")}
            tooltip="Unidades"
          />
          <SidebarItem
            icon={<Users className="h-8 w-8" />}
            href="/dashboard/moradores"
            active={pathname.includes("/moradores")}
            tooltip="Moradores"
          />
          <SidebarItem
            icon={<Car className="h-8 w-8" />}
            href="/dashboard/veiculos"
            active={pathname.includes("/veiculos")}
            tooltip="Veículos"
          />
          <SidebarItem
            icon={<UserCog className="h-8 w-8" />}
            href="/dashboard/usuarios"
            active={pathname.includes("/usuarios")}
            tooltip="Usuários"
          />
          <SidebarItem icon={<Save className="h-8 w-8" />} onClick={handleBackup} tooltip="Backup Manual" />
        </div>
        <SidebarItem icon={<LogOut className="h-8 w-8" />} href="/" tooltip="Sair" />
      </aside>
    </>
  )
}
