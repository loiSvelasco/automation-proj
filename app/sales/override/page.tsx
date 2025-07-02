"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaCalendarAlt, FaCheck, FaTimes, FaList, FaExchangeAlt } from "react-icons/fa";

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

const itemOptions = ["Ribs", "Leg", "Ham"];

export default function OverridePage() {
  const [orders, setOrders] = useState(initialOrders);
  const [merchant, setMerchant] = useState("");
  const [showMerchantDropdown, setShowMerchantDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(["Ribs"]);

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
      {/* List Icon, Override Title, Search */}
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
      <div className="overflow-x-auto border-2 border-blue-400 rounded mb-8">
        <table className="min-w-full bg-white text-base">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">DR</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Unit Cost</th>
              <th className="px-6 py-4 text-left">Quantity</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Discount</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.filter(o =>
              o.dr.includes(search) ||
              o.description.toLowerCase().includes(search.toLowerCase())
            ).map((order, idx) => (
              <tr key={order.dr} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-bold">{idx + 1}</td>
                <td className="px-6 py-3">{order.dr}</td>
                <td className="px-6 py-3">{order.description}</td>
                <td className="px-6 py-3">{order.unitCost}</td>
                <td className="px-6 py-3">{order.quantity}</td>
                <td className="px-6 py-3">{order.amount.toFixed(2)}</td>
                <td className="px-6 py-3">{order.discount.toFixed(2)}</td>
                <td className="px-6 py-3 flex gap-3">
                  <button className="text-gray-800 hover:text-blue-600"><FaEdit /></button>
                  <button className="text-gray-800 hover:text-red-600"><FaTrash /></button>
                </td>
              </tr>
            ))}
            {/* Add Item Row */}
            <tr>
              <td className="px-2 py-2">
                <input className="border rounded px-2 py-1 w-16 text-base" placeholder="00" />
              </td>
              <td className="px-2 py-2">
                <input className="border rounded px-2 py-1 w-24 text-base" placeholder="Item" />
              </td>
              <td className="px-2 py-2">
                {/* Dropdown for item selection below the button */}
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
              </td>
              <td className="px-2 py-2">
                <input className="border rounded px-2 py-1 w-20 text-base" placeholder="1" />
              </td>
              <td className="px-2 py-2">
                <input className="border rounded px-2 py-1 w-16 text-base" placeholder="1" />
              </td>
              <td className="px-2 py-2">
                <input className="border rounded px-2 py-1 w-16 text-base" placeholder="0.00" />
              </td>
              <td className="px-2 py-2 flex gap-3 items-center">
                <button className="text-green-600 text-xl"><FaCheck /></button>
                <button className="text-red-600 text-xl"><FaTimes /></button>
              </td>
            </tr>
          </tbody>
        </table>
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