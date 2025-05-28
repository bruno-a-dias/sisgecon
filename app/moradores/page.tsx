import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MoradoresTable } from "@/components/moradores/moradores-table"

export const metadata: Metadata = {
  title: "Moradores | SISGECON",
  description: "Gestão de moradores do condomínio",
}

export default function MoradoresPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Moradores</h1>
          <p className="text-muted-foreground">Gerencie os moradores do condomínio</p>
        </div>
        <Button asChild>
          <Link href="/moradores/novo">Novo Morador</Link>
        </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Lista de Moradores</CardTitle>
            <CardDescription>Total de 124 moradores cadastrados</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Buscar morador..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <MoradoresTable />
        </CardContent>
      </Card>
    </div>
  )
}
