import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"

const moradores = [
  {
    id: 1,
    nome: "João Silva",
    cpf: "123.456.789-00",
    unidade: "101A",
    status: "Proprietário",
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    cpf: "987.654.321-00",
    unidade: "202B",
    status: "Inquilino",
    telefone: "(11) 91234-5678",
    email: "maria.oliveira@email.com",
  },
  {
    id: 3,
    nome: "Carlos Santos",
    cpf: "456.789.123-00",
    unidade: "303C",
    status: "Proprietário",
    telefone: "(11) 99876-5432",
    email: "carlos.santos@email.com",
  },
  {
    id: 4,
    nome: "Ana Pereira",
    cpf: "789.123.456-00",
    unidade: "404D",
    status: "Dependente",
    telefone: "(11) 95678-1234",
    email: "ana.pereira@email.com",
  },
  {
    id: 5,
    nome: "Roberto Almeida",
    cpf: "321.654.987-00",
    unidade: "505E",
    status: "Proprietário",
    telefone: "(11) 92345-6789",
    email: "roberto.almeida@email.com",
  },
]

export function MoradorTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moradores.map((morador) => (
            <TableRow key={morador.id}>
              <TableCell className="font-medium">{morador.nome}</TableCell>
              <TableCell>{morador.cpf}</TableCell>
              <TableCell>{morador.unidade}</TableCell>
              <TableCell>{morador.status}</TableCell>
              <TableCell>{morador.telefone}</TableCell>
              <TableCell>{morador.email}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
