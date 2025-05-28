"use client"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function TopMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Arquivo</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[200px]">
              <ListItem href="/dashboard/condominio" title="Condomínio" />
              <ListItem href="/dashboard/unidades" title="Unidades" />
              <ListItem href="/dashboard/moradores" title="Moradores" />
              <ListItem href="/dashboard/veiculos" title="Veículos" />
              <ListItem href="/dashboard/usuarios" title="Usuários" />
              <ListItem href="/" title="Sair" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Relatórios</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[250px]">
              <ListItem href="/dashboard/relatorios/moradores" title="Moradores por unidade" />
              <ListItem href="/dashboard/relatorios/veiculos" title="Veículos por unidade" />
              <ListItem href="/dashboard/relatorios/taxas" title="Taxas de condomínio e extras" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Backup</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[250px]">
              <ListItem href="/dashboard/backup/manual" title="Gerar manualmente" />
              <ListItem href="/dashboard/backup/agendar" title="Agendar automático" />
              <ListItem href="/dashboard/backup/retornar" title="Retornar manualmente" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Ajuda</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[200px]">
              <ListItem href="/dashboard/ajuda/faq" title="FAQ" />
              <ListItem href="/dashboard/ajuda/suporte" title="Suporte" />
              <ListItem href="/dashboard/ajuda/versao" title="Versão" />
              <ListItem href="/dashboard/ajuda/sobre" title="Sobre" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/dashboard/ia" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Inteligência Artificial</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps {
  title: string
  href: string
}

const ListItem = ({ title, href }: ListItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
      </Link>
    </li>
  )
}
