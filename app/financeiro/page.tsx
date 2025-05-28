import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReceitasTable } from "@/components/financeiro/receitas-table"
import { DespesasTable } from "@/components/financeiro/despesas-table"
import { ResumoFinanceiro } from "@/components/financeiro/resumo-financeiro"

export const metadata: Metadata = {
  title: "Financeiro | SISGECON",
  description: "Gestão financeira do condomínio",
}

export default function FinanceiroPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">Gerencie as finanças do condomínio</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/financeiro/relatorios">Gerar Relatório</Link>
          </Button>
          <Button asChild>
            <Link href="/financeiro/nova-transacao">Nova Transação</Link>
          </Button>
        </div>
      </div>

      <ResumoFinanceiro />

      <Tabs defaultValue="receitas" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="receitas">Receitas</TabsTrigger>
          <TabsTrigger value="despesas">Despesas</TabsTrigger>
        </TabsList>
        <TabsContent value="receitas">
          <Card>
            <CardHeader>
              <CardTitle>Receitas</CardTitle>
              <CardDescription>Todas as receitas do condomínio</CardDescription>
            </CardHeader>
            <CardContent>
              <ReceitasTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="despesas">
          <Card>
            <CardHeader>
              <CardTitle>Despesas</CardTitle>
              <CardDescription>Todas as despesas do condomínio</CardDescription>
            </CardHeader>
            <CardContent>
              <DespesasTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
