"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaCalendarAlt, FaCheck, FaTimes, FaList } from "react-icons/fa";
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
  const [addItem, setAddItem] = useState({ dr: "", description: "", unitCost: "", quantity: 1 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(["Ribs", "Ham"]);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Controls Row - aligned horizontally and spaced evenly */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div className="flex items-center gap-4 flex-1 min-w-[220px]">
          <span className="font-medium">Merchant:</span>
          <input
            className="border rounded px-3 py-2 text-base w-full max-w-xs"
            placeholder="Melchora B. Aquino"
            value={merchant}
            onChange={e => setMerchant(e.target.value)}
          />
          <Button className="bg-gray-800 text-white flex gap-2 items-center px-6 py-2 text-base"><FaPlus /> Add</Button>
        </div>
        <div className="flex items-center gap-4 flex-1 min-w-[220px] justify-end">
          <Button variant="outline" className="flex gap-2 items-center px-6 py-2 text-base"><FaSearch /> Search</Button>
          <span className="font-medium">Date:</span>
          <input
            className="border rounded px-3 py-2 text-base w-full max-w-xs"
            placeholder="Placeholder"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <Button className="bg-gray-800 text-white flex gap-2 items-center px-6 py-2 text-base"><FaCalendarAlt /> Set</Button>
        </div>
      </div>
      {/* List Icon and Add Cart Title + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-xl border-2 border-gray-200 text-gray-900 font-bold text-lg px-6 py-2 bg-white flex items-center justify-center shadow-none"><FaList className="text-2xl" /></Button>
          <h1 className="text-3xl font-extrabold text-gray-900">Add Cart</h1>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="inline-flex items-center px-3 py-2 bg-gray-800 text-white rounded-l-md"><FaSearch /></span>
          <input
            className="border border-l-0 rounded-r-md px-3 py-2 text-base w-full max-w-xs focus:outline-none"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
      <div className="overflow-x-auto border border-gray-200 rounded-lg mb-8">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">#</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">DR</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Description</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Unit Cost</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Quantity</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Amount</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, idx) => (
              <TableRow key={order.dr} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-sm text-gray-900 font-bold">{idx + 1}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.dr}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.description}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.unitCost}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.quantity}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.amount.toFixed(2)}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900 flex gap-3">
                  <button className="text-gray-800 hover:text-blue-600"><FaEdit /></button>
                  <button className="text-gray-800 hover:text-red-600"><FaTrash /></button>
                </TableCell>
              </TableRow>
            ))}
            {/* Add Item Row */}
            <TableRow>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <input className="border rounded px-2 py-1 w-16 text-sm" placeholder="00" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <input className="border rounded px-2 py-1 w-24 text-sm" placeholder="Item" />
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
                          <span className="text-base">{option}</span>
                        </div>
                      ))}
                      <div className="flex justify-end mt-4">
                        <Button size="sm" className="bg-gray-900 text-white px-4 py-1" onClick={() => setDropdownOpen(false)}>Close</Button>
                      </div>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <input className="border rounded px-2 py-1 w-20 text-sm" placeholder="1" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <input className="border rounded px-2 py-1 w-16 text-sm" placeholder="1" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <input className="border rounded px-2 py-1 w-16 text-sm" placeholder="0.00" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400 flex gap-3 items-center">
                <button className="text-green-600 text-xl"><FaCheck /></button>
                <button className="text-red-600 text-xl"><FaTimes /></button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Controls and Pagination on the same line */}
      <div className="flex flex-wrap flex-col md:flex-row md:items-center md:justify-between gap-6 mt-8">
        <div className="flex gap-4 flex-wrap">
           <Button className="bg-gray-900 text-white flex gap-2 items-center px-8 py-3 text-lg"><FaPlus className="text-xl" /> Add Item</Button>
           <Button className="bg-gray-900 text-white flex gap-2 items-center px-8 py-3 text-lg"><FaCheck className="text-xl" /> Finalize</Button>
        </div>
        <div className="flex gap-4 items-center mt-4 md:mt-0">
          <span className="text-lg">Prev</span>
          <Button variant="outline" className="px-5 py-2 text-lg">1</Button>
          <span className="text-lg">2</span>
          <span className="text-lg">3</span>
          <span className="text-lg">4</span>
          <span className="text-lg">Next</span>
        </div>
      </div>
    </div>
  );
} 