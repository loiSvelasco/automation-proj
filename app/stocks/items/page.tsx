"use client"

import { useState } from "react"
import { Search, Edit, Trash2, Plus, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock data for merchants
const mockItems = [
  { id: 1, code: "000001", description: "Belly", category: "Fast", reorderLevels: "[100, 20]kls" },
  { id: 2, code: "000002", description: "Head", category: "Slow", reorderLevels: "[100, 5]kls" },
  { id: 3, code: "000003", description: "Loin", category: "Fast", reorderLevels: "[100, 4]kls" },
]

export default function RegisteredMerchants() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const handleNewItem = () => {
    console.log("New Item clicked")
  }

  const handleEdit = (id: number) => {
    console.log("Edit Item:", id)
  }

  const handleDelete = (id: number) => {
    console.log("Delete Item:", id)
  }

  const handleAdd = () => {
    console.log("Add new Item row")
  }

  return (
    <div className="bg-white p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Registered Items</h1>
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
              <th className="px-4 py-2 text-left font-medium text-gray-900 w-12">#</th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">Code</th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">Description</th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">Category</th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">Reorder Levels</th>
              <th className="px-4 py-2 text-left font-medium text-gray-900 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.code}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.reorderLevels}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item.id)} className="text-gray-600 hover:text-gray-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-gray-600 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-400">4</td>
              <td className="px-4 py-2 text-gray-400">Placeholder</td>
              <td className="px-4 py-2 text-gray-400">Placeholder</td>
              <td className="px-4 py-2 text-gray-400">Placeholder</td>
              <td className="px-4 py-2 text-gray-400">Placeholder</td>
              <td className="px-4 py-2">
                <button onClick={handleAdd} className="text-gray-600 hover:text-gray-900">
                  <Plus className="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6">
        <Button onClick={handleNewItem} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full md:w-auto">
          <Plus className="w-4 h-4" />
          New Item
        </Button>

        <div className="flex justify-center md:justify-end gap-2">
          <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
            Prev
          </button>

          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 text-sm rounded ${currentPage === page ? "bg-gray-800 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
            >
              {page}
            </button>
          ))}

          <button onClick={() => setCurrentPage(Math.min(4, currentPage + 1))} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
