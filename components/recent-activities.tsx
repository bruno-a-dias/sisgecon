import { Badge } from "@/components/ui/badge"

interface RecentActivitiesProps {
  type: "avisos" | "manutencoes"
}

export function RecentActivities({ type }: RecentActivitiesProps) {
  const avisos = [
    {
      id: 1,
      title: "Assembleia Geral",
      date: "15/05/2025",
      status: "importante",
      description: "Assembleia geral para discussão do orçamento anual.",
    },
    {
      id: 2,
      title: "Manutenção da Piscina",
      date: "20/05/2025",
      status: "normal",
      description: "A piscina ficará fechada para manutenção.",
    },
    {
      id: 3,
      title: "Festa Junina",
      date: "12/06/2025",
      status: "normal",
      description: "Tradicional festa junina do condomínio.",
    },
  ]

  const manutencoes = [
    {
      id: 1,
      title: "Elevadores",
      date: "18/05/2025",
      status: "agendada",
      description: "Manutenção preventiva dos elevadores.",
    },
    {
      id: 2,
      title: "Sistema de Segurança",
      date: "22/05/2025",
      status: "pendente",
      description: "Atualização do sistema de câmeras.",
    },
    {
      id: 3,
      title: "Jardim",
      date: "25/05/2025",
      status: "agendada",
      description: "Poda das árvores e manutenção do jardim.",
    },
  ]

  const items = type === "avisos" ? avisos : manutencoes

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-start space-x-4 rounded-md border p-3">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{item.title}</p>
              <Badge variant={item.status === "importante" || item.status === "pendente" ? "destructive" : "secondary"}>
                {item.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
            <p className="text-xs font-medium">Data: {item.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
