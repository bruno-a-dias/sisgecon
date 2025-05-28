import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"

export const metadata: Metadata = {
  title: "SISGECON - Sistema de Gestão de Condomínios",
  description: "Painel de controle do sistema de gestão de condomínios",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>Resumo financeiro dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas atividades registradas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/atividades">Ver todas as atividades</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Reservas</CardTitle>
            <CardDescription>Reservas de áreas comuns para os próximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { area: "Salão de Festas", data: "15/05/2025", morador: "Ana Silva", apto: "102" },
                { area: "Churrasqueira", data: "16/05/2025", morador: "Carlos Mendes", apto: "305" },
                { area: "Quadra", data: "17/05/2025", morador: "Juliana Costa", apto: "201" },
              ].map((reserva, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{reserva.area}</p>
                    <p className="text-sm text-muted-foreground">{reserva.data}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{reserva.morador}</p>
                    <p className="text-sm text-muted-foreground">Apto {reserva.apto}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/reservas">Gerenciar reservas</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ocorrências Recentes</CardTitle>
            <CardDescription>Últimas ocorrências registradas no condomínio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { tipo: "Barulho", data: "10/05/2025", status: "Em análise" },
                { tipo: "Vazamento", data: "08/05/2025", status: "Resolvido" },
                { tipo: "Elevador", data: "05/05/2025", status: "Em andamento" },
              ].map((ocorrencia, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{ocorrencia.tipo}</p>
                    <p className="text-sm text-muted-foreground">{ocorrencia.data}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        ocorrencia.status === "Resolvido"
                          ? "bg-green-100 text-green-800"
                          : ocorrencia.status === "Em análise"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {ocorrencia.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/ocorrencias">Ver todas as ocorrências</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pagamentos Pendentes</CardTitle>
            <CardDescription>Resumo dos pagamentos pendentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { tipo: "Taxa de Condomínio", mes: "Maio/2025", valor: "R$ 12.500,00" },
                { tipo: "Fundo de Reserva", mes: "Maio/2025", valor: "R$ 3.200,00" },
                { tipo: "Taxa Extra", mes: "Maio/2025", valor: "R$ 5.000,00" },
              ].map((pagamento, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{pagamento.tipo}</p>
                    <p className="text-sm text-muted-foreground">{pagamento.mes}</p>
                  </div>
                  <div>
                    <p className="font-medium">{pagamento.valor}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/financeiro">Ver relatório financeiro</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
