"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, ArrowUpDown, Calendar, DollarSign, Tag } from "lucide-react"
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
import { Input } from "@/components/ui/input"

// Dados fictícios de receitas
const receitas = [
  {
    id: "1",
    descricao: "Taxa de Condomínio",
    categoria: "Mensalidade",
    data: "05/05/2025",
    valor: "R$ 15.000,00",
    status: "Recebido",
  },
  {
    id: "2",
    descricao: "Fundo de Reserva",
    categoria: "Mensalidade",
    data: "05/05/2025",
    valor: "R$ 3.000,00",
    status: "Recebido",
  },
  {
    id: "3",
    descricao: "Aluguel Salão de Festas",
    categoria: "Área Comum",
    data: "10/05/2025",
    valor: "R$ 500,00",
    status: "Recebido",
  },
  {
    id: "4",
    descricao: "Multa por Atraso",
    categoria: "Multa",
    data: "12/05/2025",
    valor: "R$ 150,00",
    status: "Recebido",
  },
  {
    id: "5",
    descricao: "Taxa de Condomínio (Apto 303)",
    categoria: "Mensalidade",
    data: "15/05/2025",
    valor: "R$ 350,00",
    status: "Pendente",
  },
  {
    id: "6",
    descricao: "Taxa de Condomínio (Apto 304)",
    categoria: "Mensalidade",
    data: "15/05/2025",
    valor: "R$ 350,00",
    status: "Pendente",
  },
  {
    id: "7",
    descricao: "Aluguel Churrasqueira",
    categoria: "Área Comum",
    data: "16/05/2025",
    valor: "R$ 150,00",
    status: "Agendado",
  },
]

// Definição das colunas
const columns: ColumnDef<(typeof receitas)[0]>[] = [
  {
    accessorKey: "descricao",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
    cell: ({ row }) => {
      const categoria = row.getValue("categoria") as string

      return (
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span>{categoria}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "data",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.getValue("data") as string

      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{data}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "valor",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const valor = row.getValue("valor") as string

      return (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span>{valor}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      return (
        <Badge
          variant="outline"
          className={
            status === "Recebido"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : status === "Pendente"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                : "bg-blue-100 text-blue-800 hover:bg-blue-100"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const receita = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(receita.id)}>Copiar ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/financeiro/receitas/${receita.id}`} className="flex w-full">
                Ver detalhes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/financeiro/receitas/${receita.id}/editar`} className="flex w-full">
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

export function ReceitasTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: receitas,
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar receitas..."
          value={(table.getColumn("descricao")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("descricao")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
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
                  Nenhuma receita encontrada.
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
