"use client"

import { useState } from "react"
import { Search, Edit, Trash2, Plus, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock data for products
const mockProducts = [
  { id: 1, code: "PRD001", description: "Chicken Breast", category: "Poultry", stock: "1,200 units" },
  { id: 2, code: "PRD002", description: "Pork Belly", category: "Pork", stock: "950 units" },
  { id: 3, code: "PRD003", description: "Beef Steak", category: "Beef", stock: "800 units" },
  { id: 4, code: "PRD004", description: "Chicken Wings", category: "Poultry", stock: "650 units" },
  { id: 5, code: "PRD005", description: "Pork Chops", category: "Pork", stock: "750 units" },
]

export default function RegisteredProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const handleNewProduct = () => {
    console.log("New Product clicked")
  }

  const handleEdit = (id: number) => {
    console.log("Edit product:", id)
  }

  const handleDelete = (id: number) => {
    console.log("Delete product:", id)
  }

  const handleAdd = () => {
    console.log("Add new product row")
  }

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
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
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-16">#</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Code</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Description</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{product.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.code}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.description}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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
              <td className="px-6 py-4 text-sm text-gray-400">6</td>
              <td className="px-6 py-4 text-sm text-gray-400">Placeholder</td>
              <td className="px-6 py-4 text-sm text-gray-400">Placeholder</td>
              <td className="px-6 py-4 text-sm text-gray-400">Placeholder</td>
              <td className="px-6 py-4 text-sm text-gray-400">Placeholder</td>
              <td className="px-6 py-4">
                <button onClick={handleAdd} className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handleNewProduct}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Product
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
  )
}
