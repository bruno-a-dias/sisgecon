import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { OcorrenciasTable } from "@/components/ocorrencias/ocorrencias-table"

export const metadata: Metadata = {
  title: "Ocorrências | SISGECON",
  description: "Gestão de ocorrências do condomínio",
}

export default function OcorrenciasPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ocorrências</h1>
          <p className="text-muted-foreground">Gerencie as ocorrências do condomínio</p>
        </div>
        <Button asChild>
          <Link href="/ocorrencias/nova">Nova Ocorrência</Link>
        </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Lista de Ocorrências</CardTitle>
            <CardDescription>Total de 15 ocorrências registradas</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Buscar ocorrência..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <OcorrenciasTable />
        </CardContent>
      </Card>
    </div>
  )
}
