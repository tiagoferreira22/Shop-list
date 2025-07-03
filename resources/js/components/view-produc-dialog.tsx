"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react"

interface ViewProductDialogProps {
  product: {
    id: string
    name: string
    type: string
    status: 'comprando' | 'comprado'
    amount: number
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewProductDialog({ product, open, onOpenChange }: ViewProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(open) => {
        if (!open) {
            setTimeout(() => {
              document.body.style.pointerEvents = 'auto'
            }, 100)
        }
        onOpenChange(open)
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Produto</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Nome</p>
            <p className="mt-1">{product.name}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Tipo</p>
            <Badge variant="outline" className="mt-1 capitalize">
              {product.type}
            </Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <Badge variant="outline" className="mt-1 gap-1">
              {product.status === "comprado" ? (
                <IconCircleCheckFilled className="h-3.5 w-3.5 fill-green-500" />
              ) : (
                <IconLoader className="h-3.5 w-3.5 animate-spin" />
              )}
              {product.status}
            </Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Quantidade</p>
            <p className="mt-1">{product.amount}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
