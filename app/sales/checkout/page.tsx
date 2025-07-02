"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaCalendarAlt, FaCheck, FaTimes, FaList, FaCreditCard, FaCartPlus } from "react-icons/fa";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

const merchantOptions = [
  "Melchora B. Aquino",
  "Juancho A. Melchor",
  "Valery D. De Guzman",
];

const initialOrders = [
  { dr: "000001", description: "Belly", unitCost: "200.00/kl", quantity: 2, amount: 400.0, discount: 0 },
  { dr: "000002", description: "Head", unitCost: "100.00/kl", quantity: 2, amount: 200.0, discount: 0 },
  { dr: "000003", description: "Loin", unitCost: "500.00/kl", quantity: 1, amount: 500.0, discount: 0 },
];

export default function CheckoutPage() {
  const [orders] = useState(initialOrders);
  const [merchant, setMerchant] = useState("");
  const [showMerchantDropdown, setShowMerchantDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const filteredMerchants = merchantOptions.filter((m) =>
    m.toLowerCase().includes(merchant.toLowerCase())
  );

  const amountDue = orders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Merchant, Load Order, Amount Due */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div className="flex items-center gap-4 flex-1 min-w-[220px] relative">
          <span className="font-medium">Merchant:</span>
          <div className="relative w-full max-w-xs">
            <input
              className="border rounded px-3 py-2 text-base w-full"
              placeholder="Type to search..."
              value={merchant}
              onChange={e => {
                setMerchant(e.target.value);
                setShowMerchantDropdown(true);
              }}
              onFocus={() => setShowMerchantDropdown(true)}
              onBlur={() => setTimeout(() => setShowMerchantDropdown(false), 150)}
            />
            {showMerchantDropdown && merchant && (
              <div className="absolute left-0 top-full mt-1 bg-white border rounded shadow-md z-50 w-full">
                {filteredMerchants.length > 0 ? (
                  filteredMerchants.map((m) => (
                    <div
                      key={m}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onMouseDown={() => {
                        setMerchant(m);
                        setShowMerchantDropdown(false);
                      }}
                    >
                      {m}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-400 text-sm">No results</div>
                )}
              </div>
            )}
          </div>
          <Button className="bg-gray-800 text-white flex gap-2 items-center px-6 py-2 text-base">Load Order</Button>
        </div>
        <div className="flex flex-col items-end flex-1 min-w-[220px] md:items-end">
          <span className="font-medium text-lg text-gray-600">Amount Due</span>
          <span className="text-3xl font-extrabold text-gray-900">Php {amountDue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
      </div>
      {/* List Icon, Order Title, Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-xl border-2 border-gray-200 text-gray-900 font-bold text-lg px-6 py-2 bg-white flex items-center justify-center shadow-none"><FaList className="text-2xl" /></Button>
          <h1 className="text-3xl font-extrabold text-gray-900">Order Details</h1>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="inline-flex items-center px-3 py-2 bg-gray-800 text-white rounded-l-md"><FaSearch /></span>
          <input
            className="border border-l-0 rounded-r-md px-3 py-2 text-base w-full max-w-xs focus:outline-none"
            placeholder="Search"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Table */}
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
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Discount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.filter(o =>
              o.dr.includes(search) ||
              o.description.toLowerCase().includes(search.toLowerCase())
            ).map((order, idx) => (
              <TableRow key={order.dr} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-sm text-gray-900 font-bold">{idx + 1}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.dr}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.description}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.unitCost}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.quantity}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.amount.toFixed(2)}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.discount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  
      <div className="flex flex-wrap flex-col md:flex-row md:items-center md:justify-between gap-6 mt-8">
        <div className="flex gap-4 flex-wrap">
          <Button className="bg-gray-900 text-white flex gap-2 items-center px-8 py-3 text-lg"><FaCartPlus className="text-xl" /> Check Out</Button>
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