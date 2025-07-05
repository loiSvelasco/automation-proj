"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Footer from "@/components/ui/footer";
import { Pencil, Search } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";

const initialItems = [
  { id: 1, dr: "000001", description: "Belly", actualWeight: "10 kg", unitCost: 400, sold: 0, retailPrice: 400, profitMargin: 0 },
  { id: 2, dr: "000001", description: "Head", actualWeight: "9 kg", unitCost: 200, sold: 0, retailPrice: 210, profitMargin: 10 },
  { id: 3, dr: "000001", description: "Loin", actualWeight: "5 kg", unitCost: 500, sold: 0, retailPrice: 400, profitMargin: 100 },
];

export default function PriceAdjustmentsPage() {
  const [dr, setDr] = useState("");
  const [product, setProduct] = useState("");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);

  // Pagination logic (static for now)
  const itemsPerPage = 3;
  const pagedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Total profit adjustment calculation
  const totalProfitAdjustment = items.reduce((sum, item) => sum + (item.profitMargin || 0), 0);

  // Static options for DRs and Products (API-ready structure)
  const drOptions: ComboboxOption[] = [
    { value: "000001", label: "000001" },
    { value: "000002", label: "000002" },
    { value: "000003", label: "000003" },
  ];
  const productOptions: ComboboxOption[] = [
    { value: "Belly", label: "Belly" },
    { value: "Head", label: "Head" },
    { value: "Loin", label: "Loin" },
  ];

  return (
    <div className="flex flex-col bg-white">
      <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 py-2">
        {/* Top search/filter row */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-4 md:gap-6 mb-8 w-full">
          {/* Find by DRs (Combobox) */}
          <div className="flex flex-col w-full md:min-w-[220px] md:max-w-xs border-l-2 border-black pl-4">
            <label htmlFor="dr" className="text-xs text-gray-500 mb-1 font-medium">Find by DRs</label>
            <div className="flex gap-2">
              <Combobox
                options={drOptions}
                value={dr}
                onChange={setDr}
                placeholder="Select DR..."
                className="h-9 w-full md:w-[220px]"
              />
              <Button className="h-9 px-4 text-base flex gap-2 items-center"><Search className="w-4 h-4" />Load Delivery</Button>
            </div>
          </div>
          {/* Find by Product (Combobox) - aligned right */}
          <div className="flex flex-col w-full md:min-w-[220px] md:max-w-xs border-l-2 border-black pl-4">
            <label htmlFor="product" className="text-xs text-gray-500 mb-1 font-medium">Find by Product</label>
            <div className="flex gap-2">
              <Combobox
                options={productOptions}
                value={product}
                onChange={setProduct}
                placeholder="Select prod..."
                className="h-9 w-full md:w-[220px]"
              />
              <Button className="h-9 px-4 text-base flex gap-2 items-center"><Search className="w-4 h-4" />Load Products</Button>
            </div>
          </div>
        </div>

        {/* Table header and search */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs bg-gray-800 text-white hover:bg-gray-900 hover:text-white">List</Button>
            <h1 className="text-2xl font-semibold text-gray-900">Items</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 w-64 border-gray-300 rounded-md h-8"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">#</TableHead>
                <TableHead>DR</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actual Weight</TableHead>
                <TableHead>Unit Cost</TableHead>
                <TableHead>Sold</TableHead>
                <TableHead>Retail Price</TableHead>
                <TableHead>Profit Margin</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedItems.filter(item =>
                item.dr.includes(search) ||
                item.description.toLowerCase().includes(search.toLowerCase())
              ).map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * itemsPerPage + idx + 1}</TableCell>
                  <TableCell>{item.dr}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.actualWeight}</TableCell>
                  <TableCell>{item.unitCost.toFixed(2)}</TableCell>
                  <TableCell>{item.sold}</TableCell>
                  <TableCell>{item.retailPrice.toFixed(2)}</TableCell>
                  <TableCell>{item.profitMargin.toFixed(2)}</TableCell>
                  <TableCell><Pencil className="w-4 h-4 text-gray-500 cursor-pointer" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Confirm Adjustment and Pagination in a single row */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full mt-6 gap-4 md:gap-0">
          <Button className="h-12 px-8 text-lg font-semibold flex items-center gap-2 bg-gray-800 hover:bg-gray-900 w-full md:w-auto">
            <span className="text-xl">✓</span> Confirm Adjustment
          </Button>
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              className="px-3 py-1 text-base text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-base rounded transition-colors ${
                  page === p ? "bg-gray-800 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              className="px-3 py-1 text-base text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        {/* Total Profit Adjustment below the button, left-aligned */}
        <div className="flex items-center mt-4 mb-8 sm:mb-12 w-full">
          <div className="h-12 w-0.5 bg-black mr-4 rounded" />
          <div className="flex flex-col items-start">
            <span className="text-gray-500 text-base mb-1">Total Profit Adjustment</span>
            <span className="text-5xl font-bold text-gray-900">Php {totalProfitAdjustment.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 