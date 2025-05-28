import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface AIInsightsProps {
  type: "insights" | "previsoes"
}

export function AIInsights({ type }: AIInsightsProps) {
  const insights = [
    {
      id: 1,
      title: "Padrão de Inadimplência",
      description: "Detectamos um padrão sazonal de inadimplência, com aumento nos meses de janeiro e julho.",
      recommendation:
        "Considere enviar lembretes preventivos nesses períodos e oferecer condições especiais de pagamento.",
    },
    {
      id: 2,
      title: "Uso de Áreas Comuns",
      description:
        "A academia tem pico de uso entre 18h e 20h, enquanto o salão de festas é mais utilizado aos sábados.",
      recommendation:
        "Avalie a possibilidade de estender o horário da academia e otimizar a limpeza do salão aos domingos.",
    },
    {
      id: 3,
      title: "Manutenções Recorrentes",
      description: "O elevador do bloco B apresenta falhas recorrentes a cada 3 meses aproximadamente.",
      recommendation: "Recomendamos uma manutenção preventiva mais frequente ou avaliação técnica especializada.",
    },
  ]

  const previsoes = [
    {
      id: 1,
      title: "Projeção Financeira",
      description:
        "Com base nos dados históricos, prevemos um aumento de 12% nas despesas de manutenção no próximo trimestre.",
      recommendation: "Recomendamos revisar o orçamento e considerar um ajuste na taxa de condomínio.",
    },
    {
      id: 2,
      title: "Previsão de Inadimplência",
      description:
        "Nosso modelo prevê uma taxa de inadimplência de 8% para o próximo mês, acima da média histórica de 5%.",
      recommendation: "Sugerimos intensificar a comunicação sobre prazos de pagamento e facilitar acordos.",
    },
    {
      id: 3,
      title: "Necessidade de Manutenção",
      description: "Análise preditiva indica alta probabilidade de falha no sistema de bombas nos próximos 45 dias.",
      recommendation: "Agende uma inspeção preventiva com urgência para evitar problemas maiores.",
    },
  ]

  const items = type === "insights" ? insights : previsoes

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {type === "insights" ? "Insights Automáticos" : "Previsões e Tendências"}
        </h2>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{item.description}</p>
              <p className="text-sm font-medium text-primary">Recomendação:</p>
              <p className="text-sm">{item.recommendation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
