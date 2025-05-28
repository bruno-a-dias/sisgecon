import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { MoradorTable } from "@/components/morador-table"

export default function Moradores() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Moradores</h1>
          <p className="text-muted-foreground">Gerencie os moradores do condomínio</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Morador
        </Button>
      </div>

      <MoradorTable />
    </div>
  )
}
