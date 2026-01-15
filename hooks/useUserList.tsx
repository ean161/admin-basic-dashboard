"use client"

import { Badge } from "@/components/ui/badge";
import { UsersContext } from "@/contexts/UsersContext";
import { User } from "@/types/User";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
} from "@tanstack/react-table";
import { useContext, useState } from "react";

const columns: ColumnDef<User>[] = [
    {
        id: "id",
        accessorKey: "id",
        header: () => <p>ID</p>,
        cell: ({ row, }) => (
            <p>{row.getValue("id")}</p>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "username",
        accessorKey: "username",
        header: () => <p>Username</p>,
        cell: ({ row, }) => (
            <p>{row.getValue("username")}</p>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "role",
        accessorKey: "role",
        header: () => <p>Role</p>,
        cell: (({ row, }) => {
            const role = String(row.getValue("role"));
            return (
                <Badge
                    variant={role === "ADMIN" ? "destructive" : "secondary"}>
                    {role.toUpperCase()}
                </Badge>
            );
        }),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "balance",
        accessorKey: "balance",
        header: () => <p>Balance</p>,
        cell: ({ row, }) => (
            <p>{parseFloat(row.getValue("balance")).toLocaleString()} vnd</p>
        ),
        enableSorting: false,
        enableHiding: false,
    }
];

export default function UserPage() {
    const list = useContext(UsersContext)?.userList;
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: list ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setSearch,
        onColumnFiltersChange: setFilter,
        state: {
            globalFilter: search,
            columnFilters: filter
        }
    });

    return {
        table,
        columns
    }
}