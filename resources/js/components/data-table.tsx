"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Loader2, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { Badge } from "./ui/badge"
import {
    IconCircleCheckFilled,
    IconCopy,
    IconEdit,
    IconEye,
    IconLoader,
    IconPlus,
    IconTrash
  } from "@tabler/icons-react"
import { AddProductDialog } from "./ui/AddProductDialog"
import { router } from "@inertiajs/react"
import { EditProductDialog } from "./edit-product-dialog"
import { ViewProductDialog } from "./view-produc-dialog"

export type Payment = {
  id: string
  amount: number
  type: 'alimentício' | 'limpeza' | 'higiene pessoal' | 'beleza' | 'utensílios'
  status: 'comprando' | 'comprado'
  name: string
  created_at?: string
  updated_at?: string
}


type DataTableProps = {
    data: Payment[]
  }

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (!isSorted) {
              column.toggleSorting(false); // Primeiro clique: ordena ASC
            } else if (isSorted === 'asc') {
              column.toggleSorting(true); // Segundo clique: ordena DESC
            } else {
              column.clearSorting(); // Terceiro clique: remove ordenação
            }
          }}
        >
          Nome
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => (
        <div className="capitalize">
            <Badge variant="outline">
                {row.getValue("type")}
            </Badge>
        </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "comprado" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader className="h-3.5 w-3.5 animate-spin"/>
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">quantidade</div>,
    cell: ({ row }) => {
      return <div className="font-medium text-center">{row.original.amount}</div>
    },
  },
  {
    id: "actions",
    header: "Ação",
    enableHiding: false,
    cell: ({ row }) => {
        const product = row.original;
        const [isDeleting, setIsDeleting] = React.useState(false);
        const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
        const [showEditDialog, setShowEditDialog] = React.useState(false);
        const [showViewDialog, setShowViewDialog] = React.useState(false);

        const handleDelete = () => {
            setIsDeleting(true);
            router.delete(`/products/${product.id}`, {
              onSuccess: () => setShowDeleteDialog(false),
              onError: () => setIsDeleting(false),
              preserveScroll: true
            });
          };

      return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(product.name)}
                    >
                        <IconCopy className="mr-2 h-4 w-4" />
                        Copiar nome
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowViewDialog(true)}>
                        <IconEye className="mr-2 h-4 w-4" />
                        Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                        <IconEdit className="mr-2 h-4 w-4" />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                        onClick={handleDelete}
                    >
                    <IconTrash className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"/>
                    Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
      </DropdownMenu>

        <EditProductDialog
            product={product}
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
        />
        <ViewProductDialog
          product={product}
          open={showViewDialog}
          onOpenChange={setShowViewDialog}
        />
        </>
      )
    },
  },
]

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState('');

  const reversedData = React.useMemo(() => [...data].reverse(), [data]);

  const table = useReactTable({
    data: reversedData,
    columns,
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const name = row.getValue('name') as string;
      const type = row.getValue('type') as string;

      return (
        name.toLowerCase().includes(filterValue.toLowerCase()) ||
        type.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">

        <Input
            placeholder="Filtrar por nome ou tipo"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === 'type' ? (
                        'Tipo'
                      ) : column.id === 'amount' ? (
                        'Quantidade'
                      ) : column.id === 'status' ? (
                        'Status'
                      ): column.id === 'name' ? (
                        'Nome'
                      ): (
                        'sem'
                      )
                    }

                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <AddProductDialog />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (

                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}

                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linhas selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
