"use client"

import { useState } from "react"
import { Search, Edit, Trash2, Plus, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

// Mock data for products
const mockProducts = [
  { id: 1, productId: "000001", description: "Belly", shortDescription: "BLY", category: "Fast", unit: "Kilo", reorderLevels: "[100, 20] kls" },
  { id: 2, productId: "000002", description: "Loin", shortDescription: "LN", category: "Slow", unit: "Kilo", reorderLevels: "[100, 5] kls" },
  { id: 3, productId: "000003", description: "Ribs", shortDescription: "RB", category: "Fast", unit: "Kilo", reorderLevels: "[100, 4] kls" },
];

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
          <h1 className="text-2xl font-semibold text-gray-900">Registered Products</h1>
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
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Product ID</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Description</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Short Description</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Category</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Unit</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Reorder Levels</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product, idx) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-sm text-gray-900 font-bold">{idx + 1}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.productId}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.description}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.shortDescription}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.category}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.unit}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.reorderLevels}</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
           
          </TableBody>
        </Table>
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
