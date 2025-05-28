import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivities } from "@/components/recent-activities"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao Sistema de Gerenciamento de Condomínio</p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Avisos Recentes</CardTitle>
            <CardDescription>Últimos comunicados enviados para o condomínio</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities type="avisos" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manutenções Programadas</CardTitle>
            <CardDescription>Próximas manutenções agendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities type="manutencoes" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
