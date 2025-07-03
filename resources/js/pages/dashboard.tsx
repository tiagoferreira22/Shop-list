import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { DataTable } from '@/components/data-table'
import { PageProps, router } from '@inertiajs/core'
import { InertiaAlerts } from '@/components/inertia-alerts';
import { AlertNotification } from '@/components/alert-notification';
import { useState } from 'react';

export type Product = {
    id: string
    name: string
    type: 'alimentício' | 'limpeza' | 'higiene pessoal' | 'beleza' | 'utensílios'
    status: 'comprando' | 'comprado'
    amount: number
}

interface DashboardProps extends PageProps{
    products: Product[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lista de compras',
        href: '/dashboard',
    },
];

export default function Dashboard({ products }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de compras" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <InertiaAlerts />
                <div className="p-8 relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTable data={products}/>
                </div>
            </div>
        </AppLayout>
    );
}
