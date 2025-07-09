"use client";

import { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  List,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  Calendar,
  Printer,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for merchants
const mockItems = [
  {
    id: 1,
    date: "7/5/2025",
    bcb: "50,000.00",
    expenses: "49,000.00",
    eodc: "1,000.00",
  },
  {
    id: 2,
    date: "7/5/2025",
    bcb: "20,000.00",
    expenses: "19,000.00",
    eodc: "1,000.00",
  },
  {
    id: 3,
    date: "7/5/2025",
    bcb: "10,000.00",
    expenses: "9,000.00",
    eodc: "1,000.00",
  },
];

export default function ReportsExpenses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleNewItem = () => {
    console.log("New Item clicked");
  };

  const handleEdit = (id: number) => {
    console.log("Edit Item:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete Item:", id);
  };

  const handleAdd = () => {
    console.log("Add new Item row");
  };

  return (
    <div className="bg-white p-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row flex-wrap gap-4 justify-around items-start mb-8 w-6xl">
        <div className="flex flex-col gap-2 border-l-8 border-black pl-2">
          <div className="flex items-center gap-2 h-21">
            <label className="text-sm font-medium">Dates:</label>
            <div className="relative w-full max-w-xs">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Date"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <div className="border-l-8 border-black px-4 py-2 flex flex-col justify-center">
            <h1 className="text-lg font-medium">Total Expenses</h1>
            <p className="text-4xl font-semibold">Php 77,000.00</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <div className="border-l-8 border-black px-4 py-2 flex flex-col justify-center">
            <h1 className="text-lg font-medium">Total End-of-Day Cash</h1>
            <p className="text-4xl font-semibold">Php 3,000.00</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Registered Items
          </h1>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                #
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                Date
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                BCB
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                Expenses
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                EODC
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.bcb}</td>
                <td className="px-4 py-2">{item.expenses}</td>
                <td className="px-4 py-2">{item.eodc}</td>
              </tr>
            ))}

            {/* <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-400">4</td>
              <td className="px-4 py-2 text-gray-400">Placeholder</td>
              <td className="px-4 py-2 text-gray-400">Placeholder</td>
              <td className="px-4 py-2 text-gray-400">Placeholder</td>
              <td className="px-4 py-2">
                <button
                  onClick={handleAdd}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6">
        <div className="flex items-center space-x-4 max-w-64">
          <Button className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2">
            <Download className="w-4 h-4" /> Download
          </Button>
        </div>

        <div className="flex justify-center md:justify-end gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            Prev
          </button>

          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 text-sm rounded ${
                currentPage === page
                  ? "bg-gray-800 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
