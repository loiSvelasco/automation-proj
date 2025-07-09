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
    drNumber: "000001",
    item: "Belly",
    availableStocks: "10 Kls",
    status: "High",
  },
  {
    id: 2,
    drNumber: "000002",
    item: "Head",
    availableStocks: "5 Kls",
    status: "Moderate",
  },
  {
    id: 3,
    drNumber: "000003",
    item: "Loin",
    availableStocks: "2 Kls",
    status: "Low",
  },
  {
    id: 4,
    drNumber: "000003",
    item: "Belly",
    availableStocks: "2 Kls",
    status: "High",
  },
];

export default function ReportsInventory() {
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
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">DRs:</label>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <div className="border-l-8 border-black px-4 py-2 flex flex-col justify-center">
            <h1 className="text-lg font-medium">Available Items</h1>
            <p className="text-4xl font-semibold">3</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <div className="border-l-8 border-black px-4 py-2 flex flex-col justify-center">
            <h1 className="text-lg font-medium">Available Stocks</h1>
            <p className="text-4xl font-semibold">22 kls</p>
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
              <th className="px-4 py-2 text-left font-medium text-gray-900 w-12">
                #
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                DR Numbers
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                items
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                Available Stocks
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900 w-24">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.drNumber}</td>
                <td className="px-4 py-2">{item.item}</td>
                <td className="px-4 py-2">{item.availableStocks}</td>
                <td className="px-4 py-2 pl-6">
                  {item.status === "High" && (
                    <BatteryFull className="w-4 h-4 text-gray-700" />
                  )}
                  {item.status === "Moderate" && (
                    <BatteryMedium className="w-4 h-4 text-gray-700" />
                  )}
                  {item.status === "Low" && (
                    <BatteryLow className="w-4 h-4 text-gray-700" />
                  )}
                </td>
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
          <div className="flex items-center space-x-1">
            <BatteryFull className="w-4 h-4 text-gray-700" />
            <label className="text-sm text-gray-700">High</label>
          </div>
          <div className="flex items-center space-x-1">
            <BatteryMedium className="w-4 h-4 text-gray-700" />
            <label className="text-sm text-gray-700">Moderate</label>
          </div>
          <div className="flex items-center space-x-1">
            <BatteryLow className="w-4 h-4 text-gray-700" />
            <label className="text-sm text-gray-700">Low</label>
          </div>
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
