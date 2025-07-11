"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus, Search, X, List, ArrowRight, ArrowLeft, CheckSquare, XSquare, Box, Undo2, ClipboardCheck, Clipboard, XCircle, ClipboardPlus } from "lucide-react";

const mockSupplierReturns = [
  { id: 1, srid: "000001", date: "7/5/2025", dr: "000001", product: "Belly", quantity: "10 kg", boxes: 5, price: 400.00, amount: 4000, supplier: "Atkins", status: ["shipped"] },
  { id: 2, srid: "000002", date: "7/6/2025", dr: "000001", product: "Head", quantity: "9 kg", boxes: 3, price: 200.00, amount: 1800, supplier: "Agromet", status: ["returned", "condemned"] },
];
const mockMerchantReturns = [
  { id: 1, mrid: "000001", date: "7/5/2025", dr: "000001", product: "Belly", quantity: "10 kg", boxes: 5, price: 400.00, amount: 4000, merchant: "Juan", status: ["added"] },
  { id: 2, mrid: "000002", date: "7/6/2025", dr: "000001", product: "Head", quantity: "9 kg", boxes: 3, price: 200.00, amount: 1800, merchant: "Melchor", status: ["returned"] },
];

// Helper to render status icons/labels
const statusMap: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  shipped: { icon: ClipboardCheck, label: "Shipped to Supplier" },
  returned: { icon: Clipboard, label: "Product Returned" },
  condemned: { icon: XCircle, label: "Condemned" },
  added: { icon: ClipboardPlus, label: "Product Added Back" },
};
function StatusCell({ status }: { status: string | string[] }) {
  const statuses = Array.isArray(status) ? status : [status];
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {statuses.map((s, i) => {
        const SIcon = statusMap[s as keyof typeof statusMap]?.icon;
        return SIcon ? (
          <SIcon key={i} className="w-5 h-5 text-gray-700" />
        ) : null;
      })}
    </div>
  );
}

export default function ReturnsPage() {
  // Supplier Returns
  const [supplierReturns, setSupplierReturns] = useState(mockSupplierReturns);
  const [supplierSearch, setSupplierSearch] = useState("");
  const [supplierPage, setSupplierPage] = useState(1);
  const supplierItemsPerPage = 3;
  const supplierTotalPages = Math.ceil(supplierReturns.length / supplierItemsPerPage);
  const pagedSupplierReturns = supplierReturns.slice((supplierPage - 1) * supplierItemsPerPage, supplierPage * supplierItemsPerPage);

  // Merchant Returns
  const [merchantReturns, setMerchantReturns] = useState(mockMerchantReturns);
  const [merchantSearch, setMerchantSearch] = useState("");
  const [merchantPage, setMerchantPage] = useState(1);
  const merchantItemsPerPage = 3;
  const merchantTotalPages = Math.ceil(merchantReturns.length / merchantItemsPerPage);
  const pagedMerchantReturns = merchantReturns.slice((merchantPage - 1) * merchantItemsPerPage, merchantPage * merchantItemsPerPage);

  // Placeholder API-ready handlers
  const handleSupplierAction = (id: string | number, action: string) => {
    // Plug in your API call here
    alert(`Supplier Return ${id}: ${action}`);
  };
  const handleMerchantAction = (id: string | number, action: string) => {
    // Plug in your API call here
    alert(`Merchant Return ${id}: ${action}`);
  };

  return (
    <div className="bg-white">
      {/* Supplier Returns Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Supplier Returns</h1>
        </div>
        <div className="flex justify-end mb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={supplierSearch}
              onChange={e => setSupplierSearch(e.target.value)}
              className="pl-10 w-64 border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="overflow-x-auto border border-gray-200 rounded-lg w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">#</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">SR ID</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Date</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">DR</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Product</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Quantity</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Box/es</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Selling Price</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Amount</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Supplier</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Status</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedSupplierReturns.filter(item =>
                item.srid.includes(supplierSearch) ||
                item.product.toLowerCase().includes(supplierSearch.toLowerCase()) ||
                item.supplier.toLowerCase().includes(supplierSearch.toLowerCase())
              ).map((item, idx) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{(supplierPage - 1) * supplierItemsPerPage + idx + 1}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.srid}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.date}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.dr}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.product}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.quantity}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.boxes}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.price.toFixed(2)}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.amount}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.supplier}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">
                    <StatusCell status={item.status} />
                  </TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => handleSupplierAction(item.id, 'edit')} />
                      <ClipboardCheck className="w-4 h-4 text-gray-700 cursor-pointer" onClick={() => handleSupplierAction(item.id, 'shipped')} />
                      <Clipboard className="w-4 h-4 text-gray-700 cursor-pointer" onClick={() => handleSupplierAction(item.id, 'returned')} />
                      <XCircle className="w-4 h-4 text-gray-700 cursor-pointer" onClick={() => handleSupplierAction(item.id, 'condemned')} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {/* Placeholder row */}
              <TableRow className="hover:bg-gray-50">
                <TableCell className="px-2 py-3 text-sm text-gray-400">3</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">DR</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">Product</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">Qty</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">Supplier</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
          <div className="flex gap-2 mb-2 md:mb-0">
            <Button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Supplier Return
            </Button>
            <div className="flex gap-6 items-center text-gray-800 text-sm font-medium">
              <span className="flex items-center gap-1"><ClipboardCheck className="w-5 h-5" /> Shipped to Supplier</span>
              <span className="flex items-center gap-1"><Clipboard className="w-5 h-5" /> Product Returned</span>
              <span className="flex items-center gap-1"><XCircle className="w-5 h-5" /> Condemned</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setSupplierPage(Math.max(1, supplierPage - 1))}
              disabled={supplierPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: supplierTotalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setSupplierPage(p)}
                className={`w-8 h-8 text-sm rounded transition-colors ${
                  supplierPage === p ? "bg-gray-800 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setSupplierPage(Math.min(supplierTotalPages, supplierPage + 1))}
              disabled={supplierPage === supplierTotalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Merchant Returns Section */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Merchant Returns</h1>
        </div>
        <div className="flex justify-end mb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={merchantSearch}
              onChange={e => setMerchantSearch(e.target.value)}
              className="pl-10 w-64 border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="overflow-x-auto border border-gray-200 rounded-lg w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">#</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">MR ID</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Date</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">DR</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Product</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Quantity</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Box/es</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Selling Price</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Amount</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Merchant</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Status</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-semibold text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedMerchantReturns.filter(item =>
                item.mrid.includes(merchantSearch) ||
                item.product.toLowerCase().includes(merchantSearch.toLowerCase()) ||
                item.merchant.toLowerCase().includes(merchantSearch.toLowerCase())
              ).map((item, idx) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{(merchantPage - 1) * merchantItemsPerPage + idx + 1}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.mrid}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.date}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.dr}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.product}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.quantity}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.boxes}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.price.toFixed(2)}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.amount}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">{item.merchant}</TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">
                    <StatusCell status={item.status} />
                  </TableCell>
                  <TableCell className="px-2 py-3 text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => handleMerchantAction(item.id, 'edit')} />
                      <Clipboard className="w-4 h-4 text-gray-700 cursor-pointer" onClick={() => handleMerchantAction(item.id, 'returned')} />
                      <ClipboardPlus className="w-4 h-4 text-gray-700 cursor-pointer" onClick={() => handleMerchantAction(item.id, 'added')} />
                      <XCircle className="w-4 h-4 text-gray-700 cursor-pointer" onClick={() => handleMerchantAction(item.id, 'condemned')} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {/* Placeholder row */}
              <TableRow className="hover:bg-gray-50">
                <TableCell className="px-2 py-3 text-sm text-gray-400">3</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">DR</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">Product</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">Qty</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">Merchant</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
                <TableCell className="px-2 py-3 text-sm text-gray-400">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
          <div className="flex gap-2 mb-2 md:mb-0">
            <Button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Merchant Return
            </Button>
            <div className="flex gap-6 items-center text-gray-800 text-sm font-medium">
              <span className="flex items-center gap-1"><Clipboard className="w-5 h-5" /> Product Returned</span>
              <span className="flex items-center gap-1"><ClipboardPlus className="w-5 h-5" /> Product Added Back</span>
              <span className="flex items-center gap-1"><XCircle className="w-5 h-5" /> Condemned</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMerchantPage(Math.max(1, merchantPage - 1))}
              disabled={merchantPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: merchantTotalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setMerchantPage(p)}
                className={`w-8 h-8 text-sm rounded transition-colors ${
                  merchantPage === p ? "bg-gray-800 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMerchantPage(Math.min(merchantTotalPages, merchantPage + 1))}
              disabled={merchantPage === merchantTotalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 