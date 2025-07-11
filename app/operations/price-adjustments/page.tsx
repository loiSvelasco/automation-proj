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
  { id: 1, dr: "000001", product: "Belly", actualWeight: "10 kg", boxes: 5, unitCost: 400, sold: 0, sellingPrice: 400, profitMargin: 0 },
  { id: 2, dr: "000001", product: "Head", actualWeight: "9 kg", boxes: 5, unitCost: 200, sold: 0, sellingPrice: 210, profitMargin: 10 },
  { id: 3, dr: "000001", product: "Loin", actualWeight: "5 kg", boxes: 2, unitCost: 500, sold: 0, sellingPrice: 400, profitMargin: 100 },
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
      <div className="max-w-[1400px] w-full mx-auto px-6 py-4">
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
          {/* Find by Product (Combobox) */}
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
        <div className="border border-gray-200 rounded-lg w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-3 py-3 text-left text-sm font-medium text-gray-900 w-12">#</TableHead>
                <TableHead className="px-3 py-3 text-left text-sm font-medium text-gray-900">DR</TableHead>
                <TableHead className="px-3 py-3 text-left text-sm font-medium text-gray-900">Product</TableHead>
                <TableHead className="px-3 py-3 text-left text-sm font-medium text-gray-900">Actual Weight</TableHead>
                <TableHead className="px-3 py-3 text-left text-sm font-medium text-gray-900">Box/es</TableHead>
                <TableHead className="px-3 py-3 text-left text-sm font-medium text-gray-900">Unit Cost</TableHead>
                <TableHead className="px-3 py-3 text-left text-sm font-medium text-gray-900">Sold</TableHead>
                <TableHead className="px-3 py-3 text-left text-sm font-medium text-gray-900">Selling Price</TableHead>
                <TableHead className="px-3 py-3 text-left text-sm font-medium text-gray-900">Profit Margin</TableHead>
                <TableHead className="px-3 py-3 text-left text-sm font-medium text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedItems.filter(item =>
                item.dr.includes(search) ||
                item.product.toLowerCase().includes(search.toLowerCase())
              ).map((item, idx) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="px-3 py-3 text-sm text-gray-900">{(page - 1) * itemsPerPage + idx + 1}</TableCell>
                  <TableCell className="px-3 py-3 text-sm text-gray-900">{item.dr}</TableCell>
                  <TableCell className="px-3 py-3 text-sm text-gray-900">{item.product}</TableCell>
                  <TableCell className="px-3 py-3 text-sm text-gray-900">{item.actualWeight}</TableCell>
                  <TableCell className="px-3 py-3 text-sm text-gray-900">{item.boxes}</TableCell>
                  <TableCell className="px-3 py-3 text-sm text-gray-900">{item.unitCost !== undefined ? item.unitCost.toFixed(2) : ""}</TableCell>
                  <TableCell className="px-3 py-3 text-sm text-gray-900">{item.sold}</TableCell>
                  <TableCell className="px-3 py-3 text-sm text-gray-900">{item.sellingPrice !== undefined ? item.sellingPrice.toFixed(2) : ""}</TableCell>
                  <TableCell className="px-3 py-3 text-sm text-gray-900">{item.profitMargin !== undefined ? item.profitMargin.toFixed(2) : ""}</TableCell>
                  <TableCell className="px-3 py-3">
                    <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Confirm Adjustment and Pagination in a single row */}
        <div className="flex justify-between items-center mt-6">
          <Button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <span className="text-xl">✓</span> Confirm Adjustment
          </Button>
          <div className="flex items-center gap-2">
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
        <div className="flex items-center mt-4 mb-8 sm:mb-12 w-full justify-start">
          <div className="h-12 w-0.5 bg-black mr-4 rounded" />
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500 mb-1 font-medium">Total Profit Adjustment</span>
            <span className="text-3xl font-extrabold text-gray-900">Php {totalProfitAdjustment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 