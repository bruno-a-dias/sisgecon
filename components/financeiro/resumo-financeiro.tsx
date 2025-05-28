"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, Percent } from "lucide-react"

export function ResumoFinanceiro() {
  const resumo = [
    {
      title: "Receitas Totais",
      value: "R$ 19.500,00",
      percentual: "+2.5%",
      positivo: true,
      icon: ArrowUpRight,
    },
    {
      title: "Despesas Totais",
      value: "R$ 17.800,00",
      percentual: "+1.7%",
      positivo: false,
      icon: ArrowDownRight,
    },
    {
      title: "Saldo",
      value: "R$ 1.700,00",
      percentual: "+15.3%",
      positivo: true,
      icon: DollarSign,
    },
    {
      title: "Taxa de Inadimplência",
      value: "4.2%",
      percentual: "-0.8%",
      positivo: true,
      icon: Percent,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {resumo.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Icon className={`h-4 w-4 ${item.positivo ? "text-green-500" : "text-red-500"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className={`text-xs ${item.positivo ? "text-green-500" : "text-red-500"}`}>
                {item.percentual} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
