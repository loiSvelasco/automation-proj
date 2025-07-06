"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { List, Search, Plus, Pencil, X, Loader2 } from "lucide-react";

const mockDeliveries = [
  { id: 1, item: "Belly", deliveryWeight: 10, actualWeight: 10, unitPrice: 200, amount: 2000, profitMargin: "-", sellingPrice: "", },
  { id: 2, item: "Head", deliveryWeight: 9, actualWeight: 7, unitPrice: 300, amount: 2100, profitMargin: "-", sellingPrice: "", },
  { id: 3, item: "Loin", deliveryWeight: 5, actualWeight: 10, unitPrice: 100, amount: 1000, profitMargin: "-", sellingPrice: "", },
];
const mockNewDeliveries = [
  { id: 1, dr: "DR 00001", supplier: "Agromet" },
  { id: 2, dr: "DR 00002", supplier: "Pigrolac" },
];

export default function DeliveriesPage() {
  const [date, setDate] = useState("07/06/2025");
  const [dr, setDr] = useState("000003");
  const [supplier, setSupplier] = useState("Atkins");
  const [search, setSearch] = useState("");
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const pagedDeliveries = deliveries.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(deliveries.length / itemsPerPage);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // API-ready placeholder
  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };
  const handleReset = () => {
    setDate("");
    setDr("");
    setSupplier("");
  };
  const handleEdit = (id: number) => {
    // API-ready
    alert(`Edit delivery item ${id}`);
  };
  const handleConfirm = () => {
    setShowModal(true);
  };
  const handleModalClose = () => setShowModal(false);
  const handleModalProceed = () => {
    setShowModal(false);
    // API call here
  };

  // Summary
  const totalWeight = deliveries.reduce((sum, d) => sum + (d.actualWeight || 0), 0);
  const totalAmount = deliveries.reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <div className="bg-white">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 w-full">
        {/* Left: vertical line + Date/DR# group + Supplier/Buttons */}
        <div className="flex flex-row items-center flex-1 min-w-0">
          {/* Vertical line flush left */}
          <div className="w-2 h-[72px] bg-black mr-4" />
          <div className="flex flex-col justify-between gap-2 min-w-[180px]">
            <div className="flex items-center gap-2 mb-1">
              <label className="text-xs text-gray-500 font-medium min-w-[40px]">Date:</label>
              <Input value={date} onChange={e => setDate(e.target.value)} className="h-9 text-base w-[160px]" placeholder="MM/DD/YYYY" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 font-medium min-w-[30px]">DR#:</label>
              <Input value={dr} onChange={e => setDr(e.target.value)} className="h-9 text-base w-[160px]" placeholder="000000" />
            </div>
          </div>
          {/* Supplier, Load, Reset in a row */}
          <div className="flex items-center gap-2 ml-6">
            <label className="text-xs text-gray-500 font-medium min-w-[60px]">Supplier:</label>
            <Input value={supplier} onChange={e => setSupplier(e.target.value)} className="h-9 text-base max-w-[120px]" placeholder="Supplier" />
            <Button className="bg-gray-800 hover:bg-gray-900 text-white flex gap-2 items-center px-6 py-2 rounded-md font-semibold ml-4" onClick={handleLoad} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Load
            </Button>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white flex gap-2 items-center px-6 py-2 rounded-md font-semibold" onClick={handleReset}>
              <X className="w-4 h-4" /> Reset
            </Button>
          </div>
        </div>
        {/* Right: New Deliveries aligned with top controls */}
        <div className="flex items-center gap-2 min-w-[320px] justify-end">
          <div className="w-2 h-[48px] bg-black mr-4" />
          <span className="font-medium text-sm">New Deliveries</span>
          <div className="flex gap-2 flex-wrap">
            {mockNewDeliveries.map(d => (
              <span key={d.id} className="bg-blue-600 text-white px-4 py-1 rounded-full font-semibold text-xs flex items-center gap-2">
                <List className="w-4 h-4" /> {d.dr} {d.supplier}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
              <List className="w-3 h-3" />
              List
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Delivery Items</h1>
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
        <div className="overflow-x-auto border border-gray-200 rounded-lg w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900">#</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Item</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Delivery Weight</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Actual Weight</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Unit Price</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Amount</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Profit Margin</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Selling Price</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedDeliveries.filter(item =>
                item.item.toLowerCase().includes(search.toLowerCase())
              ).map((item, idx) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="px-4 py-3 text-sm text-gray-900">{(page - 1) * itemsPerPage + idx + 1}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-900">{item.item}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-900">{item.deliveryWeight} kg</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-900">{item.actualWeight} kg</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-900">Php {item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-900">Php {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-900">{item.profitMargin}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-400">Placeholder</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-900">
                    <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => handleEdit(item.id)} />
                  </TableCell>
                </TableRow>
              ))}
              {/* Placeholder row */}
              <TableRow className="hover:bg-gray-50">
                <TableCell className="px-4 py-3 text-sm text-gray-400">{pagedDeliveries.length + 1}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-400">Placeholder</TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-400">Placeholder</TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-400">Placeholder</TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-400">Placeholder</TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-400">Placeholder</TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-400">Placeholder</TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-400">Placeholder</TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-400">Placeholder</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {/* Confirm and Start Selling Button and Pagination Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <Button
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
            onClick={handleConfirm}
          >
            Confirm and Start Selling
          </Button>
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
      </div> {/* <-- This closes the .mb-8 Table Section */}
      {/* Summary Section */}
      <div className="flex flex-col md:flex-row md:justify-between gap-8 mt-8 mb-8 w-full">
        <div className="flex items-center gap-4 min-w-[220px]">
          <div className="w-2 h-16 bg-black" />
          <div>
            <span className="text-xs text-gray-500 font-medium">Total Weight</span>
            <div className="text-5xl font-extrabold text-gray-900">{totalWeight.toFixed(2)} <span className="text-2xl font-normal">kg</span></div>
          </div>
        </div>
        <div className="flex items-center gap-4 min-w-[220px] justify-end">
          <div className="w-2 h-16 bg-black" />
          <div>
            <span className="text-xs text-gray-500 font-medium">Total Amount</span>
            <div className="text-5xl font-extrabold text-gray-900">Php {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
              onClick={handleModalClose}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">Are you sure you want to proceed?</h2>
            <p className="mb-6 text-gray-600">This will confirm the delivery and start selling. This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Button
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md flex items-center gap-2 font-semibold"
                onClick={handleModalProceed}
              >
                Proceed
              </Button>
              <Button
                variant="outline"
                className="px-6 py-2 rounded-md font-semibold"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 