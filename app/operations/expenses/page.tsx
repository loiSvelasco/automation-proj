"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Footer from "@/components/ui/footer";
import { Pencil, Trash2, Plus, Calendar, Search, X, List } from "lucide-react";

const mockExpenses = [
  { id: 1, date: "7/5/2025", payee: "Travel ELF", particulars: "Rubber Band", type: "Supplies", amount: 24.0 },
  { id: 2, date: "7/5/2025", payee: "Laoag Auto Supply", particulars: "Motor Oil", type: "Repair", amount: 8170.0 },
  { id: 3, date: "7/5/2025", payee: "Travel Forward", particulars: "Gas", type: "Operating Expenses", amount: 2500.0 },
];

export default function SitExpensesPage() {
  const [date, setDate] = useState("7/5/2025");
  const [search, setSearch] = useState("");
  const [expenses, setExpenses] = useState(mockExpenses);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const pagedExpenses = expenses.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const totalExpenses = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="bg-white">
      {/* Top Row: Date filter (left) and Total Expenses (right), both with vertical lines */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8 w-full">
        {/* Date filter */}
        <div className="flex flex-col w-full md:min-w-[220px] md:max-w-xs border-l-8 border-gray-700 pl-4">
          <label htmlFor="date" className="text-xs text-gray-500 mb-1 font-medium">Date:</label>
          <div className="flex items-center gap-2">
            <Input id="date" value={date} onChange={e => setDate(e.target.value)} className="h-9 text-base" />
            <Calendar className="w-5 h-5 text-gray-900" />
          </div>
        </div>
        {/* Total Expenses (aligned, one line, price-adjustments style) */}
        <div className="flex items-center border-l-2 border-black pl-4 min-h-[56px]">
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500 font-medium">Total Expenses</span>
            <span className="text-3xl font-extrabold text-gray-900 leading-none">Php {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">List of Expenses</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 w-64 border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-16">#</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Payee / PCV#</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Particulars</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Type</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Amount</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedExpenses.filter(item =>
              item.payee.toLowerCase().includes(search.toLowerCase()) ||
              item.particulars.toLowerCase().includes(search.toLowerCase()) ||
              item.type.toLowerCase().includes(search.toLowerCase())
            ).map((item, idx) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-sm text-gray-900">{(page - 1) * itemsPerPage + idx + 1}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{item.date}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{item.payee}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{item.particulars}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{item.type}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" />
                    <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* Placeholder row */}
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-4 text-sm text-gray-400">4</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-6 py-4">
                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-gray-600">
                  <Plus className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-6">
        <Button
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Expense Item
        </Button>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 text-sm rounded transition-colors ${
                page === p ? "bg-gray-800 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 