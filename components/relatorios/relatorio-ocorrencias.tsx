"use client"

import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Dados fictícios para o relatório de ocorrências
const distribuicaoStatus = [
  { name: "Resolvidas", value: 42 },
  { name: "Em andamento", value: 15 },
  { name: "Em análise", value: 8 },
]

const distribuicaoTipos = [
  { name: "Barulho", value: 18 },
  { name: "Vazamento", value: 12 },
  { name: "Manutenção", value: 15 },
  { name: "Segurança", value: 8 },
  { name: "Limpeza", value: 7 },
  { name: "Elevador", value: 5 },
]

const ocorrenciasMensais = [
  { name: "Jan", ocorrencias: 10, resolvidas: 8 },
  { name: "Fev", ocorrencias: 12, resolvidas: 10 },
  { name: "Mar", ocorrencias: 8, resolvidas: 7 },
  { name: "Abr", ocorrencias: 15, resolvidas: 12 },
  { name: "Mai", ocorrencias: 20, resolvidas: 15 },
]

const COLORS = ["#4ade80", "#60a5fa", "#f87171", "#facc15", "#a78bfa", "#f472b6"]

const ultimasOcorrencias = [
  {
    id: "1",
    tipo: "Barulho",
    descricao: "Barulho excessivo após as 22h no apartamento 305",
    data: "10/05/2025",
    morador: "Roberto Almeida",
    apartamento: "402",
    status: "Em análise",
  },
  {
    id: "2",
    tipo: "Vazamento",
    descricao: "Vazamento de água no teto do apartamento 201",
    data: "08/05/2025",
    morador: "Juliana Costa",
    apartamento: "201",
    status: "Resolvido",
  },
  {
    id: "3",
    tipo: "Elevador",
    descricao: "Elevador do bloco B com problemas na porta",
    data: "05/05/2025",
    morador: "Carlos Mendes",
    apartamento: "305",
    status: "Em andamento",
  },
  {
    id: "4",
    tipo: "Limpeza",
    descricao: "Área da piscina precisa de limpeza",
    data: "03/05/2025",
    morador: "Mariana Santos",
    apartamento: "102",
    status: "Resolvido",
  },
  {
    id: "5",
    tipo: "Segurança",
    descricao: "Portão da garagem não está fechando corretamente",
    data: "01/05/2025",
    morador: "Paulo Oliveira",
    apartamento: "301",
    status: "Em andamento",
  },
]

export function RelatorioOcorrencias() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Ocorrências</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65</div>
            <p className="text-xs text-muted-foreground">Nos últimos 6 meses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ocorrências Resolvidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-green-500">64.6% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5 dias</div>
            <p className="text-xs text-green-500">-0.5 dias em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Status</CardTitle>
            <CardDescription>Status atual das ocorrências</CardDescription>
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
                <Tooltip formatter={(value) => [`${value} ocorrências`, "Quantidade"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo</CardTitle>
            <CardDescription>Tipos de ocorrências registradas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribuicaoTipos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {distribuicaoTipos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} ocorrências`, "Quantidade"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução Mensal</CardTitle>
          <CardDescription>Ocorrências registradas e resolvidas por mês</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ocorrenciasMensais}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="ocorrencias" fill="#f87171" radius={[4, 4, 0, 0]} name="Ocorrências" />
              <Bar dataKey="resolvidas" fill="#4ade80" radius={[4, 4, 0, 0]} name="Resolvidas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Ocorrências</CardTitle>
          <CardDescription>Ocorrências mais recentes registradas no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Morador</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ultimasOcorrencias.map((ocorrencia) => (
                <TableRow key={ocorrencia.id}>
                  <TableCell className="font-medium">{ocorrencia.tipo}</TableCell>
                  <TableCell className="max-w-[300px] truncate" title={ocorrencia.descricao}>
                    {ocorrencia.descricao}
                  </TableCell>
                  <TableCell>{ocorrencia.data}</TableCell>
                  <TableCell>
                    {ocorrencia.morador} (Apto {ocorrencia.apartamento})
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        ocorrencia.status === "Resolvido"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : ocorrencia.status === "Em análise"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {ocorrencia.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
