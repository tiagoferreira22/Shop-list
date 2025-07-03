"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconPlus } from "@tabler/icons-react"
import { useState } from "react"
import { useForm } from '@inertiajs/react'

export function AddProductDialog() {
  const [open, setOpen] = useState(false)
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    type: 'alimentício',
    amount: 1,
    status: 'comprando'
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/products', {
      onSuccess: () => {
        setOpen(false)
        // Os dados serão atualizados automaticamente pelo Inertia
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-3" variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Add produto</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar novo produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do produto</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>

                <Select
                    value={data.type}
                    onValueChange={(value) => setData('type', value)}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tipos</SelectLabel>
                        <SelectItem value="alimentício">Alimentício</SelectItem>
                        <SelectItem value="limpeza">Limpeza</SelectItem>
                        <SelectItem value="higiene pessoal">Higiene pessoal</SelectItem>
                        <SelectItem value="beleza">Beleza</SelectItem>
                        <SelectItem value="utensílios">Utensílios</SelectItem>
                    </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Quantidade</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                value={data.amount}
                onChange={(e) => setData('amount', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={processing}>
              {processing ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
