"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, ArrowUpDown, Building, Users, SquareIcon as SquareFeet } from "lucide-react"
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

// Dados fictícios de unidades
const unidades = [
  {
    id: "1",
    numero: "101",
    bloco: "A",
    andar: "1",
    metragem: "75",
    quartos: "2",
    proprietario: "Ana Silva",
    ocupacao: "Proprietário",
    status: "Ocupado",
  },
  {
    id: "2",
    numero: "102",
    bloco: "A",
    andar: "1",
    metragem: "75",
    quartos: "2",
    proprietario: "Mariana Santos",
    ocupacao: "Inquilino",
    status: "Ocupado",
  },
  {
    id: "3",
    numero: "103",
    bloco: "A",
    andar: "1",
    metragem: "75",
    quartos: "2",
    proprietario: "Camila Ferreira",
    ocupacao: "Inquilino",
    status: "Ocupado",
  },
  {
    id: "4",
    numero: "201",
    bloco: "A",
    andar: "2",
    metragem: "75",
    quartos: "2",
    proprietario: "Juliana Costa",
    ocupacao: "Inquilino",
    status: "Ocupado",
  },
  {
    id: "5",
    numero: "202",
    bloco: "A",
    andar: "2",
    metragem: "75",
    quartos: "2",
    proprietario: "João Pereira",
    ocupacao: "Proprietário",
    status: "Ocupado",
  },
  {
    id: "6",
    numero: "203",
    bloco: "A",
    andar: "2",
    metragem: "75",
    quartos: "2",
    proprietario: "Fernanda Lima",
    ocupacao: "Inquilino",
    status: "Ocupado",
  },
  {
    id: "7",
    numero: "301",
    bloco: "B",
    andar: "3",
    metragem: "90",
    quartos: "3",
    proprietario: "Paulo Oliveira",
    ocupacao: "Proprietário",
    status: "Ocupado",
  },
  {
    id: "8",
    numero: "302",
    bloco: "B",
    andar: "3",
    metragem: "90",
    quartos: "3",
    proprietario: "Lucas Martins",
    ocupacao: "Proprietário",
    status: "Ocupado",
  },
  {
    id: "9",
    numero: "303",
    bloco: "B",
    andar: "3",
    metragem: "90",
    quartos: "3",
    proprietario: "Marcelo Gomes",
    ocupacao: "Vazio",
    status: "Disponível",
  },
  {
    id: "10",
    numero: "304",
    bloco: "B",
    andar: "3",
    metragem: "90",
    quartos: "3",
    proprietario: "Renata Dias",
    ocupacao: "Vazio",
    status: "Disponível",
  },
]

// Definição das colunas
const columns: ColumnDef<(typeof unidades)[0]>[] = [
  {
    accessorKey: "numero",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Número
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const numero = row.getValue("numero") as string
      const bloco = row.getValue("bloco") as string
      const andar = row.getValue("andar") as string

      return (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span>
            {numero} - Bloco {bloco} - {andar}º andar
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
    accessorKey: "andar",
    header: "Andar",
    enableHiding: true,
  },
  {
    accessorKey: "metragem",
    header: "Metragem",
    cell: ({ row }) => {
      const metragem = row.getValue("metragem") as string
      const quartos = row.getValue("quartos") as string

      return (
        <div className="flex items-center gap-2">
          <SquareFeet className="h-4 w-4 text-muted-foreground" />
          <span>
            {metragem}m² - {quartos} quartos
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "quartos",
    header: "Quartos",
    enableHiding: true,
  },
  {
    accessorKey: "proprietario",
    header: "Proprietário",
    cell: ({ row }) => {
      const proprietario = row.getValue("proprietario") as string

      return (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{proprietario}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "ocupacao",
    header: "Ocupação",
    cell: ({ row }) => {
      const ocupacao = row.getValue("ocupacao") as string

      return <Badge variant={ocupacao === "Vazio" ? "outline" : "default"}>{ocupacao}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      return (
        <Badge
          variant={status === "Disponível" ? "outline" : "default"}
          className={status === "Ocupado" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const unidade = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(unidade.id)}>Copiar ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/unidades/${unidade.id}`} className="flex w-full">
                Ver detalhes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/unidades/${unidade.id}/editar`} className="flex w-full">
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

export function UnidadesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: unidades,
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
                  Nenhuma unidade encontrada.
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
