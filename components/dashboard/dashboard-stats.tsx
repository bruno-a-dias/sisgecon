"use client"

import { Building, Users, Calendar, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats() {
  const stats = [
    {
      title: "Unidades",
      value: "48",
      description: "12 com pendências",
      icon: Building,
      color: "text-blue-500",
    },
    {
      title: "Moradores",
      value: "124",
      description: "8 novos este mês",
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Reservas",
      value: "18",
      description: "para este mês",
      icon: Calendar,
      color: "text-orange-500",
    },
    {
      title: "Ocorrências",
      value: "7",
      description: "3 pendentes",
      icon: AlertCircle,
      color: "text-red-500",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
