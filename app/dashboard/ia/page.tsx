import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIInsights } from "@/components/ai-insights"
import { AIChat } from "@/components/ai-chat"

export default function InteligenciaArtificial() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inteligência Artificial</h1>
        <p className="text-muted-foreground">Análise inteligente dos dados do condomínio</p>
      </div>

      <Tabs defaultValue="insights">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="previsoes">Previsões</TabsTrigger>
          <TabsTrigger value="chat">Chat IA</TabsTrigger>
        </TabsList>
        <TabsContent value="insights">
          <AIInsights type="insights" />
        </TabsContent>
        <TabsContent value="previsoes">
          <AIInsights type="previsoes" />
        </TabsContent>
        <TabsContent value="chat">
          <AIChat />
        </TabsContent>
      </Tabs>
    </div>
  )
}
