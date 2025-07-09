"use client";

import { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  List,
  Calendar,
  Printer,
  Download,
  ChevronUpCircle,
  ChevronDownCircle,
  CircleMinus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockItems = [
  {
    id: 1,
    item: "Belly",
    deliveryWeight: "10 Kg",
    actualWeight: "10 Kg",
    unitPrice: "200.00",
    amount: "2000.00",
  },
  {
    id: 2,
    item: "Head",
    deliveryWeight: "9 Kg",
    actualWeight: "7 Kg",
    unitPrice: "300.00",
    amount: "2100.00",
  },
  {
    id: 3,
    item: "Loin",
    deliveryWeight: "5 Kg",
    actualWeight: "10 Kg",
    unitPrice: "100.00",
    amount: "1000.00",
  },
];

export default function ReportsSales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-lg font-medium">Total Actual Weight</h1>
            <p className="text-4xl font-semibold">27.00 kg</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <div className="border-l-8 border-black px-4 py-2 flex flex-col justify-center">
            <h1 className="text-lg font-medium">Total Amount</h1>
            <p className="text-4xl font-semibold">Php 5,100.00</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" /> List
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
        </div>
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

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {[
                "#",
                "Item",
                "Delivery Weight",
                "Actual Weight",
                "Unit Price",
                "Amount",
                "Actions",
              ].map((head, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{item.id}</td>
                <td className="px-4 py-3">{item.item}</td>
                <td className="px-4 py-3">{item.deliveryWeight}</td>
                <td className="px-4 py-3">{item.actualWeight}</td>
                <td className="px-4 py-3">Php {item.unitPrice}</td>
                <td className="px-4 py-3">Php {item.amount}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4 text-gray-600 hover:text-gray-900 cursor-pointer" />
                    <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mt-6 mb-10">
        <div className="flex gap-2">
          <Button className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2">
            <Download className="w-4 h-4" /> Download
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button className="bg-white hover:bg-gray-900 text-black hover:text-white flex items-center gap-2">
            <ChevronUpCircle className="w-4 h-4 text-black" /> Profit
          </Button>
          <Button className="bg-white hover:bg-gray-900 text-black hover:text-white flex items-center gap-2">
            <ChevronDownCircle className="w-4 h-4 text-black" /> Loss
          </Button>
          <Button className="bg-white hover:bg-gray-900 text-black hover:text-white flex items-center gap-2">
            <CircleMinus className="w-4 h-4 text-black" /> Break Even
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            Prev
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 text-sm rounded transition-colors ${
                currentPage === page
                  ? "bg-gray-800 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-wrap gap-4 justify-around items-start mb-8 w-6xl">
        <div className="border-l-8 border-black px-4 py-2 flex flex-col">
          <h1 className="text-xl font-medium">Total Cash Sales</h1>
          <p className="text-3xl font-semibold">Php 150,000.00</p>
        </div>
        <div className="border-l-8 border-black px-4 py-2 flex flex-col">
          <h1 className="text-xl font-medium">Total Online Sales</h1>
          <p className="text-3xl font-semibold">Php 156,000.00</p>
        </div>
        <div className="border-l-8 border-black px-4 py-2 flex flex-col">
          <h1 className="text-xl font-medium">Total Purchase Order Sales</h1>
          <p className="text-3xl font-semibold">Php 180,000.00</p>
        </div>
      </div>
    </div>
  );
}
