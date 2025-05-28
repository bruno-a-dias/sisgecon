import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RelatorioFinanceiro } from "@/components/relatorios/relatorio-financeiro"
import { RelatorioMoradores } from "@/components/relatorios/relatorio-moradores"
import { RelatorioOcorrencias } from "@/components/relatorios/relatorio-ocorrencias"

export const metadata: Metadata = {
  title: "Relatórios | SISGECON",
  description: "Relatórios do sistema de gestão de condomínios",
}

export default function RelatoriosPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Gere e visualize relatórios do condomínio</p>
      </div>

      <Tabs defaultValue="financeiro" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="moradores">Moradores</TabsTrigger>
          <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
        </TabsList>
        <TabsContent value="financeiro">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Financeiro</CardTitle>
              <CardDescription>Resumo financeiro do condomínio</CardDescription>
            </CardHeader>
            <CardContent>
              <RelatorioFinanceiro />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exportar PDF</Button>
              <Button>Imprimir</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="moradores">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Moradores</CardTitle>
              <CardDescription>Informações sobre os moradores do condomínio</CardDescription>
            </CardHeader>
            <CardContent>
              <RelatorioMoradores />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exportar PDF</Button>
              <Button>Imprimir</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="ocorrencias">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Ocorrências</CardTitle>
              <CardDescription>Resumo das ocorrências registradas</CardDescription>
            </CardHeader>
            <CardContent>
              <RelatorioOcorrencias />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exportar PDF</Button>
              <Button>Imprimir</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
