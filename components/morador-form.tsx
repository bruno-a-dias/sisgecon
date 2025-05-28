"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface MoradorFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  morador?: {
    id?: number
    nome?: string
    cpf?: string
    rg?: string
    email?: string
    telefone?: string
    celular?: string
    profissao?: string
    estadoCivil?: string
    dataEntrada?: string
    status?: string
    unidade?: string
    enderecoCorrespondencia?: string
    contatoEmergencia?: string
    observacoes?: string
  }
}

export function MoradorForm({ open, onOpenChange, morador = {} }: MoradorFormProps) {
  const [formData, setFormData] = useState({
    nome: morador.nome || "",
    cpf: morador.cpf || "",
    rg: morador.rg || "",
    email: morador.email || "",
    telefone: morador.telefone || "",
    celular: morador.celular || "",
    profissao: morador.profissao || "",
    estadoCivil: morador.estadoCivil || "",
    dataEntrada: morador.dataEntrada || "",
    status: morador.status || "",
    unidade: morador.unidade || "",
    enderecoCorrespondencia: morador.enderecoCorrespondencia || "",
    contatoEmergencia: morador.contatoEmergencia || "",
    observacoes: morador.observacoes || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{morador.id ? "Editar Morador" : "Novo Morador"}</DialogTitle>
          <DialogDescription>Preencha os dados do morador. Clique em salvar quando terminar.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rg">RG</Label>
                <Input id="rg" name="rg" value={formData.rg} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="celular">Celular</Label>
                <Input id="celular" name="celular" value={formData.celular} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profissao">Profissão</Label>
                <Input id="profissao" name="profissao" value={formData.profissao} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estadoCivil">Estado Civil</Label>
                <Select
                  value={formData.estadoCivil}
                  onValueChange={(value) => handleSelectChange("estadoCivil", value)}
                >
                  <SelectTrigger id="estadoCivil">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                    <SelectItem value="casado">Casado(a)</SelectItem>
                    <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                    <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataEntrada">Data de Entrada</Label>
                <Input
                  id="dataEntrada"
                  name="dataEntrada"
                  type="date"
                  value={formData.dataEntrada}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proprietario">Proprietário</SelectItem>
                    <SelectItem value="inquilino">Inquilino</SelectItem>
                    <SelectItem value="dependente">Dependente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unidade">Unidade</Label>
                <Select value={formData.unidade} onValueChange={(value) => handleSelectChange("unidade", value)}>
                  <SelectTrigger id="unidade">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101A">101A</SelectItem>
                    <SelectItem value="102A">102A</SelectItem>
                    <SelectItem value="201B">201B</SelectItem>
                    <SelectItem value="202B">202B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="enderecoCorrespondencia">Endereço de Correspondência</Label>
                <Input
                  id="enderecoCorrespondencia"
                  name="enderecoCorrespondencia"
                  value={formData.enderecoCorrespondencia}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contatoEmergencia">Contato de Emergência</Label>
              <Input
                id="contatoEmergencia"
                name="contatoEmergencia"
                value={formData.contatoEmergencia}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
