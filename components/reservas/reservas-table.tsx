"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, ArrowUpDown, Calendar, Clock, MapPin } from "lucide-react"
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

// Dados fictícios de reservas
const reservas = [
  {
    id: "1",
    area: "Salão de Festas",
    data: "15/05/2025",
    horario: "18:00 - 23:00",
    morador: "Ana Silva",
    apartamento: "101",
    status: "Confirmada",
  },
  {
    id: "2",
    area: "Churrasqueira",
    data: "16/05/2025",
    horario: "12:00 - 17:00",
    morador: "Carlos Mendes",
    apartamento: "305",
    status: "Confirmada",
  },
  {
    id: "3",
    area: "Quadra",
    data: "17/05/2025",
    horario: "09:00 - 11:00",
    morador: "Juliana Costa",
    apartamento: "201",
    status: "Confirmada",
  },
  {
    id: "4",
    area: "Salão de Festas",
    data: "22/05/2025",
    horario: "19:00 - 23:00",
    morador: "Roberto Almeida",
    apartamento: "402",
    status: "Pendente",
  },
  {
    id: "5",
    area: "Churrasqueira",
    data: "23/05/2025",
    horario: "12:00 - 17:00",
    morador: "Mariana Santos",
    apartamento: "102",
    status: "Pendente",
  },
  {
    id: "6",
    area: "Salão de Jogos",
    data: "18/05/2025",
    horario: "14:00 - 18:00",
    morador: "Paulo Oliveira",
    apartamento: "301",
    status: "Confirmada",
  },
  {
    id: "7",
    area: "Piscina",
    data: "19/05/2025",
    horario: "10:00 - 16:00",
    morador: "Fernanda Lima",
    apartamento: "203",
    status: "Cancelada",
  },
]

// Definição das colunas
const columns: ColumnDef<(typeof reservas)[0]>[] = [
  {
    accessorKey: "area",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Área
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const area = row.getValue("area") as string

      return (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{area}</span>
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
    accessorKey: "horario",
    header: "Horário",
    cell: ({ row }) => {
      const horario = row.getValue("horario") as string

      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{horario}</span>
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
            status === "Confirmada"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : status === "Pendente"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
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
      const reserva = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(reserva.id)}>Copiar ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/reservas/${reserva.id}`} className="flex w-full">
                Ver detalhes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/reservas/${reserva.id}/editar`} className="flex w-full">
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Cancelar reserva</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ReservasTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: reservas,
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
          placeholder="Filtrar reservas..."
          value={(table.getColumn("area")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("area")?.setFilterValue(event.target.value)}
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
                  Nenhuma reserva encontrada.
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
