"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, ArrowUpDown, Calendar, AlertTriangle, MessageSquare } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dados fictícios de ocorrências
const ocorrencias = [
  {
    id: "1",
    tipo: "Barulho",
    descricao: "Barulho excessivo após as 22h no apartamento 305",
    data: "10/05/2025",
    morador: "Roberto Almeida",
    apartamento: "402",
    status: "Em análise",
  },
  {
    id: "2",
    tipo: "Vazamento",
    descricao: "Vazamento de água no teto do apartamento 201",
    data: "08/05/2025",
    morador: "Juliana Costa",
    apartamento: "201",
    status: "Resolvido",
  },
  {
    id: "3",
    tipo: "Elevador",
    descricao: "Elevador do bloco B com problemas na porta",
    data: "05/05/2025",
    morador: "Carlos Mendes",
    apartamento: "305",
    status: "Em andamento",
  },
  {
    id: "4",
    tipo: "Limpeza",
    descricao: "Área da piscina precisa de limpeza",
    data: "03/05/2025",
    morador: "Mariana Santos",
    apartamento: "102",
    status: "Resolvido",
  },
  {
    id: "5",
    tipo: "Segurança",
    descricao: "Portão da garagem não está fechando corretamente",
    data: "01/05/2025",
    morador: "Paulo Oliveira",
    apartamento: "301",
    status: "Em andamento",
  },
  {
    id: "6",
    tipo: "Barulho",
    descricao: "Festa com som alto no apartamento 404",
    data: "30/04/2025",
    morador: "Fernanda Lima",
    apartamento: "203",
    status: "Resolvido",
  },
  {
    id: "7",
    tipo: "Manutenção",
    descricao: "Lâmpada queimada no corredor do 2º andar",
    data: "28/04/2025",
    morador: "Ana Silva",
    apartamento: "101",
    status: "Resolvido",
  },
]

// Definição das colunas
const columns: ColumnDef<(typeof ocorrencias)[0]>[] = [
  {
    accessorKey: "tipo",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const tipo = row.getValue("tipo") as string

      return (
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          <span>{tipo}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => {
      const descricao = row.getValue("descricao") as string

      return (
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="truncate max-w-[300px]" title={descricao}>
            {descricao}
          </span>
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
    accessorKey: "morador",
    header: "Morador",
    cell: ({ row }) => {
      const morador = row.getValue("morador") as string
      const apartamento = row.getValue("apartamento") as string
      const iniciais = morador
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={morador} />
            <AvatarFallback>{iniciais}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{morador}</div>
            <div className="text-sm text-muted-foreground">Apto {apartamento}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "apartamento",
    header: "Apartamento",
    enableHiding: true,
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
            status === "Resolvido"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : status === "Em análise"
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
      const ocorrencia = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(ocorrencia.id)}>Copiar ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/ocorrencias/${ocorrencia.id}`} className="flex w-full">
                Ver detalhes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/ocorrencias/${ocorrencia.id}/editar`} className="flex w-full">
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Marcar como resolvido</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function OcorrenciasTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: ocorrencias,
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
          placeholder="Filtrar ocorrências..."
          value={(table.getColumn("tipo")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("tipo")?.setFilterValue(event.target.value)}
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
                  Nenhuma ocorrência encontrada.
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
