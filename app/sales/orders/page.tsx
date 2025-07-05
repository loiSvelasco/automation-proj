"use client";

import { useState } from "react";
import { Search, Edit, Trash2, Plus, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

const initialOrders = [
  { dr: "000001", description: "Belly", unitCost: "200.00/kl", quantity: 2, amount: 400.0 },
  { dr: "000002", description: "Head", unitCost: "100.00/kl", quantity: 2, amount: 200.0 },
  { dr: "000003", description: "Loin", unitCost: "500.00/kl", quantity: 1, amount: 500.0 },
];

const itemOptions = ["Ribs", "Leg", "Ham"];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [merchant, setMerchant] = useState("");
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(["Ribs", "Ham"]);

  const handleNewOrder = () => {
    console.log("New Order clicked")
  }

  const handleEdit = (dr: string) => {
    console.log("Edit order:", dr)
  }

  const handleDelete = (dr: string) => {
    console.log("Delete order:", dr)
  }

  const handleAdd = () => {
    console.log("Add new order row")
  }

  return (
    <div className="bg-white">
      {/* Controls Row - aligned horizontally and spaced evenly */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div className="flex items-center gap-4 flex-1 min-w-[220px]">
          <span className="font-medium">Merchant:</span>
          <Input
            className="w-full max-w-xs"
            placeholder="Melchora B. Aquino"
            value={merchant}
            onChange={e => setMerchant(e.target.value)}
          />
          <Button className="bg-gray-800 hover:bg-gray-900 text-white flex gap-2 items-center">
            <Plus className="w-4 h-4" /> Add
          </Button>
        </div>
        <div className="flex items-center gap-4 flex-1 min-w-[220px] justify-end">
          <Button variant="outline" className="flex gap-2 items-center">
            <Search className="w-4 h-4" /> Search
          </Button>
          <span className="font-medium">Date:</span>
          <Input
            className="w-full max-w-xs"
            placeholder="Placeholder"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <Button className="bg-gray-800 hover:bg-gray-900 text-white flex gap-2 items-center">Set</Button>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Add Cart</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">DR</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Description</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Unit Cost</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Quantity</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Amount</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, idx) => (
              <TableRow key={order.dr} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-sm text-gray-900">{idx + 1}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.dr}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.description}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.unitCost}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.quantity}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.amount.toFixed(2)}</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(order.dr)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(order.dr)}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* Placeholder row */}
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <Input className="w-16 text-sm" placeholder="00" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <Input className="w-24 text-sm" placeholder="Item" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <div className="relative">
                  <Button variant="outline" className="w-full font-semibold" onClick={() => setDropdownOpen(v => !v)}>
                    Select Items ▼
                  </Button>
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 bg-white border rounded shadow-md p-4 z-50 min-w-[180px]">
                      {itemOptions.map(option => (
                        <div key={option} className="flex items-center gap-2 py-1">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(option)}
                            onChange={() => setSelectedItems(sel => sel.includes(option) ? sel.filter(i => i !== option) : [...sel, option])}
                          />
                          <span className="text-sm">{option}</span>
                        </div>
                      ))}
                      <div className="flex justify-end mt-4">
                        <Button size="sm" className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-1" onClick={() => setDropdownOpen(false)}>Close</Button>
                      </div>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <Input className="w-20 text-sm" placeholder="1" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <Input className="w-16 text-sm" placeholder="1" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <Input className="w-16 text-sm" placeholder="0.00" />
              </TableCell>
              <TableCell className="px-6 py-4">
                <button onClick={handleAdd} className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handleNewOrder}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Order
        </Button>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            Prev
          </button>

          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 text-sm rounded transition-colors ${
                currentPage === page ? "bg-gray-800 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 