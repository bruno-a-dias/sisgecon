"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dados fictícios para o relatório financeiro
const dadosMensais = [
  {
    name: "Jan",
    receitas: 18000,
    despesas: 16500,
    saldo: 1500,
  },
  {
    name: "Fev",
    receitas: 18200,
    despesas: 17000,
    saldo: 1200,
  },
  {
    name: "Mar",
    receitas: 18500,
    despesas: 16800,
    saldo: 1700,
  },
  {
    name: "Abr",
    receitas: 19000,
    despesas: 17200,
    saldo: 1800,
  },
  {
    name: "Mai",
    receitas: 19200,
    despesas: 17500,
    saldo: 1700,
  },
  {
    name: "Jun",
    receitas: 19500,
    despesas: 17800,
    saldo: 1700,
  },
]

const categoriasDespesas = [
  { categoria: "Pessoal", valor: 6500, percentual: "36.5%" },
  { categoria: "Utilidades", valor: 7700, percentual: "43.3%" },
  { categoria: "Manutenção", valor: 1600, percentual: "9.0%" },
  { categoria: "Suprimentos", valor: 800, percentual: "4.5%" },
  { categoria: "Seguros", valor: 1200, percentual: "6.7%" },
]

const categoriasReceitas = [
  { categoria: "Taxa de Condomínio", valor: 15000, percentual: "76.9%" },
  { categoria: "Fundo de Reserva", valor: 3000, percentual: "15.4%" },
  { categoria: "Áreas Comuns", valor: 650, percentual: "3.3%" },
  { categoria: "Multas", valor: 150, percentual: "0.8%" },
  { categoria: "Outros", valor: 700, percentual: "3.6%" },
]

export function RelatorioFinanceiro() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Receitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 19.500,00</div>
            <p className="text-xs text-green-500">+2.5% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 17.800,00</div>
            <p className="text-xs text-red-500">+1.7% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.700,00</div>
            <p className="text-xs text-green-500">+15.3% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução Financeira</CardTitle>
          <CardDescription>Receitas, despesas e saldo dos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="barras" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="barras">Gráfico de Barras</TabsTrigger>
              <TabsTrigger value="linhas">Gráfico de Linhas</TabsTrigger>
            </TabsList>
            <TabsContent value="barras">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dadosMensais}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value) => [`R$ ${value.toLocaleString("pt-BR")}`, undefined]}
                    labelFormatter={(label) => `Mês: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="receitas" fill="#4ade80" radius={[4, 4, 0, 0]} name="Receitas" />
                  <Bar dataKey="despesas" fill="#f87171" radius={[4, 4, 0, 0]} name="Despesas" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="linhas">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={dadosMensais}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value) => [`R$ ${value.toLocaleString("pt-BR")}`, undefined]}
                    labelFormatter={(label) => `Mês: ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="receitas" stroke="#4ade80" strokeWidth={2} name="Receitas" />
                  <Line type="monotone" dataKey="despesas" stroke="#f87171" strokeWidth={2} name="Despesas" />
                  <Line type="monotone" dataKey="saldo" stroke="#60a5fa" strokeWidth={2} name="Saldo" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
            <CardDescription>Distribuição das despesas do mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Percentual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriasDespesas.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell className="text-right">R$ {item.valor.toLocaleString("pt-BR")}</TableCell>
                    <TableCell className="text-right">{item.percentual}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Receitas por Categoria</CardTitle>
            <CardDescription>Distribuição das receitas do mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Percentual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriasReceitas.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell className="text-right">R$ {item.valor.toLocaleString("pt-BR")}</TableCell>
                    <TableCell className="text-right">{item.percentual}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
