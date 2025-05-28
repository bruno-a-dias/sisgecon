"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, ArrowUpDown, Building, Phone, Mail } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dados fictícios de moradores
const moradores = [
  {
    id: "1",
    nome: "Ana Silva",
    apartamento: "101",
    bloco: "A",
    telefone: "(11) 98765-4321",
    email: "ana.silva@email.com",
    status: "Proprietário",
    dataEntrada: "15/01/2023",
  },
  {
    id: "2",
    nome: "Carlos Mendes",
    apartamento: "305",
    bloco: "B",
    telefone: "(11) 97654-3210",
    email: "carlos.mendes@email.com",
    status: "Proprietário",
    dataEntrada: "03/03/2023",
  },
  {
    id: "3",
    nome: "Juliana Costa",
    apartamento: "201",
    bloco: "A",
    telefone: "(11) 96543-2109",
    email: "juliana.costa@email.com",
    status: "Inquilino",
    dataEntrada: "10/05/2023",
  },
  {
    id: "4",
    nome: "Roberto Almeida",
    apartamento: "402",
    bloco: "C",
    telefone: "(11) 95432-1098",
    email: "roberto.almeida@email.com",
    status: "Proprietário",
    dataEntrada: "22/06/2023",
  },
  {
    id: "5",
    nome: "Mariana Santos",
    apartamento: "102",
    bloco: "A",
    telefone: "(11) 94321-0987",
    email: "mariana.santos@email.com",
    status: "Inquilino",
    dataEntrada: "05/08/2023",
  },
  {
    id: "6",
    nome: "Paulo Oliveira",
    apartamento: "301",
    bloco: "B",
    telefone: "(11) 93210-9876",
    email: "paulo.oliveira@email.com",
    status: "Proprietário",
    dataEntrada: "17/09/2023",
  },
  {
    id: "7",
    nome: "Fernanda Lima",
    apartamento: "203",
    bloco: "A",
    telefone: "(11) 92109-8765",
    email: "fernanda.lima@email.com",
    status: "Inquilino",
    dataEntrada: "30/10/2023",
  },
  {
    id: "8",
    nome: "Ricardo Souza",
    apartamento: "404",
    bloco: "C",
    telefone: "(11) 91098-7654",
    email: "ricardo.souza@email.com",
    status: "Proprietário",
    dataEntrada: "12/12/2023",
  },
  {
    id: "9",
    nome: "Camila Ferreira",
    apartamento: "103",
    bloco: "A",
    telefone: "(11) 90987-6543",
    email: "camila.ferreira@email.com",
    status: "Inquilino",
    dataEntrada: "25/01/2024",
  },
  {
    id: "10",
    nome: "Lucas Martins",
    apartamento: "302",
    bloco: "B",
    telefone: "(11) 98765-4322",
    email: "lucas.martins@email.com",
    status: "Proprietário",
    dataEntrada: "08/03/2024",
  },
]

// Definição das colunas
const columns: ColumnDef<(typeof moradores)[0]>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const nome = row.getValue("nome") as string
      const iniciais = nome
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={nome} />
            <AvatarFallback>{iniciais}</AvatarFallback>
          </Avatar>
          <span>{nome}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "apartamento",
    header: "Apartamento",
    cell: ({ row }) => {
      const apartamento = row.getValue("apartamento") as string
      const bloco = row.getValue("bloco") as string

      return (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span>
            {apartamento} - Bloco {bloco}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "bloco",
    header: "Bloco",
    enableHiding: true,
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
    cell: ({ row }) => {
      const telefone = row.getValue("telefone") as string

      return (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{telefone}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string

      return (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{email}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      return <Badge variant={status === "Proprietário" ? "default" : "outline"}>{status}</Badge>
    },
  },
  {
    accessorKey: "dataEntrada",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Data de Entrada
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const morador = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(morador.id)}>Copiar ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/moradores/${morador.id}`} className="flex w-full">
                Ver detalhes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/moradores/${morador.id}/editar`} className="flex w-full">
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Remover</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function MoradoresTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: moradores,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum morador encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Próximo
        </Button>
      </div>
    </div>
  )
}
