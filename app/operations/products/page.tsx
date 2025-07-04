"use client"

import { useState } from "react"
import { Search, Edit, Trash2, Plus, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

// Mock data for products
const mockProducts = [
  { id: 1, code: "PRD001", description: "Chicken Breast", short_description: "BRST", unit: "Kilo" },
  { id: 2, code: "PRD002", description: "Pork Belly", short_description: "BLY", unit: "Kilo" },
  { id: 3, code: "PRD003", description: "Beef Steak", short_description: "STK", unit: "Kilo" },
  { id: 4, code: "PRD004", description: "Chicken Wings", short_description: "WNG", unit: "Kilo" },
  { id: 5, code: "PRD005", description: "Pork Chops", short_description: "CHPS", unit: "Kilo" },
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
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Code</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Description</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Short Description</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Unit</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.id}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.code}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.description}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.short_description}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{product.unit}</TableCell>
                <TableCell className="px-6 py-4">
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
