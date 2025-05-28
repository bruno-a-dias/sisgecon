import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReservasTable } from "@/components/reservas/reservas-table"
import { CalendarioReservas } from "@/components/reservas/calendario-reservas"

export const metadata: Metadata = {
  title: "Reservas | SISGECON",
  description: "Gestão de reservas de áreas comuns",
}

export default function ReservasPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservas</h1>
          <p className="text-muted-foreground">Gerencie as reservas de áreas comuns</p>
        </div>
        <Button asChild>
          <Link href="/reservas/nova">Nova Reserva</Link>
        </Button>
      </div>

      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
        </TabsList>
        <TabsContent value="lista">
          <Card>
            <CardHeader>
              <CardTitle>Reservas</CardTitle>
              <CardDescription>Todas as reservas de áreas comuns</CardDescription>
            </CardHeader>
            <CardContent>
              <ReservasTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendario">
          <Card>
            <CardHeader>
              <CardTitle>Calendário de Reservas</CardTitle>
              <CardDescription>Visualize as reservas em formato de calendário</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarioReservas />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
