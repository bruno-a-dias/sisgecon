"use client"

import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dados fictícios para o relatório de moradores
const distribuicaoStatus = [
  { name: "Proprietários", value: 75 },
  { name: "Inquilinos", value: 49 },
]

const distribuicaoBlocos = [
  { name: "Bloco A", value: 48 },
  { name: "Bloco B", value: 40 },
  { name: "Bloco C", value: 36 },
]

const COLORS = ["#4ade80", "#60a5fa", "#f87171", "#facc15"]

const blocos = [
  { bloco: "Bloco A", unidades: 48, ocupadas: 48, disponiveis: 0, proprietarios: 30, inquilinos: 18 },
  { bloco: "Bloco B", unidades: 40, ocupadas: 37, disponiveis: 3, proprietarios: 25, inquilinos: 12 },
  { bloco: "Bloco C", unidades: 36, ocupadas: 34, disponiveis: 2, proprietarios: 20, inquilinos: 14 },
  { bloco: "Total", unidades: 124, ocupadas: 119, disponiveis: 5, proprietarios: 75, inquilinos: 44 },
]

const ultimosMoradores = [
  { nome: "Ricardo Oliveira", apartamento: "102", bloco: "A", dataEntrada: "05/05/2025", status: "Proprietário" },
  { nome: "Fernanda Lima", apartamento: "203", bloco: "A", dataEntrada: "01/05/2025", status: "Inquilino" },
  { nome: "Marcelo Gomes", apartamento: "303", bloco: "B", dataEntrada: "28/04/2025", status: "Proprietário" },
  { nome: "Renata Dias", apartamento: "304", bloco: "B", dataEntrada: "25/04/2025", status: "Proprietário" },
  { nome: "Bruno Costa", apartamento: "401", bloco: "C", dataEntrada: "20/04/2025", status: "Inquilino" },
]

export function RelatorioMoradores() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Moradores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">Em 119 unidades ocupadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Proprietários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75</div>
            <p className="text-xs text-muted-foreground">60.5% dos moradores</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inquilinos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49</div>
            <p className="text-xs text-muted-foreground">39.5% dos moradores</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Status</CardTitle>
            <CardDescription>Proporção entre proprietários e inquilinos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribuicaoStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {distribuicaoStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} moradores`, "Quantidade"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Bloco</CardTitle>
            <CardDescription>Distribuição de moradores por bloco</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribuicaoBlocos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {distribuicaoBlocos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} moradores`, "Quantidade"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ocupação por Bloco</CardTitle>
          <CardDescription>Detalhamento da ocupação de cada bloco</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bloco</TableHead>
                <TableHead className="text-right">Unidades</TableHead>
                <TableHead className="text-right">Ocupadas</TableHead>
                <TableHead className="text-right">Disponíveis</TableHead>
                <TableHead className="text-right">Proprietários</TableHead>
                <TableHead className="text-right">Inquilinos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blocos.map((item, index) => (
                <TableRow key={index} className={item.bloco === "Total" ? "font-bold" : ""}>
                  <TableCell>{item.bloco}</TableCell>
                  <TableCell className="text-right">{item.unidades}</TableCell>
                  <TableCell className="text-right">{item.ocupadas}</TableCell>
                  <TableCell className="text-right">{item.disponiveis}</TableCell>
                  <TableCell className="text-right">{item.proprietarios}</TableCell>
                  <TableCell className="text-right">{item.inquilinos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Novos Moradores</CardTitle>
          <CardDescription>Últimos moradores cadastrados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Apartamento</TableHead>
                <TableHead>Bloco</TableHead>
                <TableHead>Data de Entrada</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ultimosMoradores.map((morador, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{morador.nome}</TableCell>
                  <TableCell>{morador.apartamento}</TableCell>
                  <TableCell>{morador.bloco}</TableCell>
                  <TableCell>{morador.dataEntrada}</TableCell>
                  <TableCell>{morador.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
