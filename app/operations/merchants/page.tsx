"use client"

import { useState } from "react"
import { Search, Edit, Trash2, Plus, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

// Mock data for registered merchants (matching screenshot)
const mockMerchants = [
  { id: 1, customerId: "000001", firstName: "Juan", lastName: "Dela Cruz", businessName: "Agromet", address: "Laoag City" },
  { id: 2, customerId: "000002", firstName: "Melchora", lastName: "Aquino", businessName: "Pinakbet", address: "San Nicolas" },
  { id: 3, customerId: "000003", firstName: "Juancho", lastName: "Melchor", businessName: "Kaluguran", address: "None" },
]

export default function RegisteredMerchants() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const handleNewMerchant = () => {
    console.log("New Merchant clicked")
  }

  const handleEdit = (id: number) => {
    console.log("Edit merchant:", id)
  }

  const handleDelete = (id: number) => {
    console.log("Delete merchant:", id)
  }

  const handleAdd = () => {
    console.log("Add new merchant row")
  }

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Registered Merchants</h1>
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
      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-16">#</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Customer ID</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">First Name</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Last Name</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Business Name</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Address</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMerchants.map((merchant) => (
              <TableRow key={merchant.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-sm text-gray-900 font-bold">{merchant.id}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{merchant.customerId}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{merchant.firstName}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{merchant.lastName}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{merchant.businessName}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{merchant.address}</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(merchant.id)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(merchant.id)}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* Placeholder row */}
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-4 text-sm text-gray-400 font-bold">4</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-6 py-4">
                <button onClick={handleAdd} className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handleNewMerchant}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Merchant
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
