"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivities() {
  const activities = [
    {
      id: 1,
      user: {
        name: "Roberto Almeida",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RA",
      },
      action: "registrou uma nova ocorrência",
      target: "Vazamento no 3º andar",
      time: "há 2 horas",
    },
    {
      id: 2,
      user: {
        name: "Mariana Costa",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
      },
      action: "fez uma reserva",
      target: "Salão de Festas",
      time: "há 3 horas",
    },
    {
      id: 3,
      user: {
        name: "Carlos Santos",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CS",
      },
      action: "atualizou o cadastro",
      target: "Apartamento 305",
      time: "há 5 horas",
    },
    {
      id: 4,
      user: {
        name: "Juliana Ferreira",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JF",
      },
      action: "registrou pagamento",
      target: "Taxa de condomínio - Maio",
      time: "há 1 dia",
    },
    {
      id: 5,
      user: {
        name: "Ricardo Oliveira",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RO",
      },
      action: "adicionou um novo morador",
      target: "Apartamento 102",
      time: "há 1 dia",
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action} <span className="font-medium">{activity.target}</span>
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}
