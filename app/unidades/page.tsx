import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { UnidadesTable } from "@/components/unidades/unidades-table"

export const metadata: Metadata = {
  title: "Unidades | SISGECON",
  description: "Gestão de unidades do condomínio",
}

export default function UnidadesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unidades</h1>
          <p className="text-muted-foreground">Gerencie as unidades do condomínio</p>
        </div>
        <Button asChild>
          <Link href="/unidades/nova">Nova Unidade</Link>
        </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Lista de Unidades</CardTitle>
            <CardDescription>Total de 48 unidades cadastradas</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Buscar unidade..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <UnidadesTable />
        </CardContent>
      </Card>
    </div>
  )
}
