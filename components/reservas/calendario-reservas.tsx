"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dados fictícios de reservas
const reservasData = [
  {
    id: "1",
    area: "Salão de Festas",
    data: new Date(2025, 4, 15), // 15/05/2025
    horario: "18:00 - 23:00",
    morador: "Ana Silva",
    apartamento: "101",
    status: "Confirmada",
  },
  {
    id: "2",
    area: "Churrasqueira",
    data: new Date(2025, 4, 16), // 16/05/2025
    horario: "12:00 - 17:00",
    morador: "Carlos Mendes",
    apartamento: "305",
    status: "Confirmada",
  },
  {
    id: "3",
    area: "Quadra",
    data: new Date(2025, 4, 17), // 17/05/2025
    horario: "09:00 - 11:00",
    morador: "Juliana Costa",
    apartamento: "201",
    status: "Confirmada",
  },
  {
    id: "4",
    area: "Salão de Festas",
    data: new Date(2025, 4, 22), // 22/05/2025
    horario: "19:00 - 23:00",
    morador: "Roberto Almeida",
    apartamento: "402",
    status: "Pendente",
  },
  {
    id: "5",
    area: "Churrasqueira",
    data: new Date(2025, 4, 23), // 23/05/2025
    horario: "12:00 - 17:00",
    morador: "Mariana Santos",
    apartamento: "102",
    status: "Pendente",
  },
  {
    id: "6",
    area: "Salão de Jogos",
    data: new Date(2025, 4, 18), // 18/05/2025
    horario: "14:00 - 18:00",
    morador: "Paulo Oliveira",
    apartamento: "301",
    status: "Confirmada",
  },
  {
    id: "7",
    area: "Piscina",
    data: new Date(2025, 4, 19), // 19/05/2025
    horario: "10:00 - 16:00",
    morador: "Fernanda Lima",
    apartamento: "203",
    status: "Cancelada",
  },
]

export function CalendarioReservas() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 4, 11))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Função para verificar se uma data tem reservas
  const hasReservation = (date: Date) => {
    return reservasData.some(
      (reserva) =>
        reserva.data.getDate() === date.getDate() &&
        reserva.data.getMonth() === date.getMonth() &&
        reserva.data.getFullYear() === date.getFullYear(),
    )
  }

  // Função para obter as reservas de uma data específica
  const getReservationsForDate = (date: Date) => {
    if (!date) return []

    return reservasData.filter(
      (reserva) =>
        reserva.data.getDate() === date.getDate() &&
        reserva.data.getMonth() === date.getMonth() &&
        reserva.data.getFullYear() === date.getFullYear(),
    )
  }

  // Função para renderizar o conteúdo do dia no calendário
  const renderDay = (day: Date) => {
    const hasEvent = hasReservation(day)

    return (
      <div className="relative">
        <div>{day.getDate()}</div>
        {hasEvent && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
        )}
      </div>
    )
  }

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      setSelectedDate(date)
    }
  }

  const selectedReservations = selectedDate ? getReservationsForDate(selectedDate) : []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border"
          renderDay={renderDay}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">
          {selectedDate ? (
            <>Reservas para {selectedDate.toLocaleDateString("pt-BR")}</>
          ) : (
            <>Selecione uma data para ver as reservas</>
          )}
        </h3>
        <div className="space-y-4">
          {selectedReservations.length > 0 ? (
            selectedReservations.map((reserva) => (
              <Card key={reserva.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{reserva.area}</h4>
                      <p className="text-sm text-muted-foreground">{reserva.horario}</p>
                      <p className="text-sm mt-2">
                        {reserva.morador} - Apto {reserva.apartamento}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        reserva.status === "Confirmada"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : reserva.status === "Pendente"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {reserva.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : selectedDate ? (
            <p className="text-muted-foreground">Nenhuma reserva para esta data.</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
