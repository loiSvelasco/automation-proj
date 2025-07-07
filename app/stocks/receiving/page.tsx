"use client";

import { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  List,
  Calendar,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for merchants
const mockItems = [
  { id: 1, item: "Belly", deliveryWeight: "10 Kg", actualWeight: "10 Kg", unitPrice: "200.00", amount: "2000.00" },
  { id: 2, item: "Head", deliveryWeight: "9 Kg", actualWeight: "7 Kg", unitPrice: "300.00", amount: "2100.00" },
  { id: 3, item: "Loin", deliveryWeight: "5 Kg", actualWeight: "10 Kg", unitPrice: "100.00", amount: "1000.00" },
];

export default function RegisteredMerchants() {
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
    <div className="bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="border-l-8 border-l-black text-gray px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <label htmlFor="" className="pr-2.5">
              Date:{" "}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Date"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="text-gray px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <label htmlFor="" className="pr-2.5">
              DR#:{" "}
            </label>
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

          <div className="text-gray px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <label htmlFor="" className="pr-2.5">
              Supplier:{" "}
            </label>
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
        </div>

        <div className="flex justify-around w-43">
          <Button
            onClick={handleNewItem}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </Button>

          <Button
            onClick={handleNewItem}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Delivery Items
          </h1>
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
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-16">
                #
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Item
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Delivery Weight
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Actual Weight
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Unit Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{item.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.item}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.deliveryWeight}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.actualWeight}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  Php {item.unitPrice}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  Php {item.amount}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/* Placeholder row */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-400">4</td>
              <td className="px-6 py-4 text-sm text-gray-400">Placeholder</td>
              <td className="px-6 py-4 text-sm text-gray-400">Placeholder</td>
              <td className="px-6 py-4 text-sm text-gray-400">Placeholder</td>
              <td className="px-6 py-4">
                <button
                  onClick={handleAdd}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex justify-between w-60">
          <Button
            onClick={handleNewItem}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Item
          </Button>

          <Button
            onClick={handleNewItem}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Confirm
          </Button>
        </div>

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
                currentPage === page
                  ? "bg-gray-800 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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

      <div className="flex items-center mt-6">
        <div className="border-l-8 border-l-black text-gray px-2 py-1 rounded text-xs font-medium flex items-center gap-1 h-40 pr-40">
          <div>
            <h1 className="text-xl">Total Actual Weight</h1>
            <h1 className="text-6xl">27.00 kg</h1>
          </div>
        </div>
        <div className="border-l-8 border-l-black text-gray px-2 py-1 rounded text-xs font-medium flex items-center gap-1 h-40">
          <div>
            <h1 className="text-xl">Total Amount</h1>
            <h1 className="text-6xl">Php 5,100.00</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
