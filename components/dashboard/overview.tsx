"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    receitas: 18000,
    despesas: 16500,
  },
  {
    name: "Fev",
    receitas: 18200,
    despesas: 17000,
  },
  {
    name: "Mar",
    receitas: 18500,
    despesas: 16800,
  },
  {
    name: "Abr",
    receitas: 19000,
    despesas: 17200,
  },
  {
    name: "Mai",
    receitas: 19200,
    despesas: 17500,
  },
  {
    name: "Jun",
    receitas: 19500,
    despesas: 17800,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
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
        <Bar dataKey="receitas" fill="#4ade80" radius={[4, 4, 0, 0]} name="Receitas" />
        <Bar dataKey="despesas" fill="#f87171" radius={[4, 4, 0, 0]} name="Despesas" />
      </BarChart>
    </ResponsiveContainer>
  )
}
