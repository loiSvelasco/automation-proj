"use client";

import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Plus, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import AddSupplierModal from "./add-supplier-modal";
import EditSupplierModal from "./edit-supplier-modal";
import DeleteSupplierModal from "./delete-supplier-modal";

export interface Supplier {
  id: number;
  supplierId: string;
  companyName: string;
  address: string;
  contactNumber: string;
}

// API placeholder functions
async function fetchSuppliers(): Promise<Supplier[]> {
  // Simulate API call
  return [
    { id: 1, supplierId: "000001", companyName: "Atkins", address: "Meycauayan", contactNumber: "09012344564, ..." },
    { id: 2, supplierId: "000002", companyName: "Agromet", address: "Laoag City", contactNumber: "09012344564, ..." },
    { id: 3, supplierId: "000003", companyName: "Pigrolac", address: "Ilocos Sur", contactNumber: "09012344564, ..." },
  ];
}
async function addSupplier(supplier: Supplier) { return supplier; }
async function updateSupplier(supplier: Supplier) { return supplier; }
async function deleteSupplier(id: number) { return id; }

export default function RegisteredSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    fetchSuppliers().then(setSuppliers);
  }, []);

  const handleNewSupplier = () => setShowAdd(true);
  const handleEdit = (supplier: Supplier) => { setSelectedSupplier(supplier); setShowEdit(true); };
  const handleDelete = (supplier: Supplier) => { setSelectedSupplier(supplier); setShowDelete(true); };

  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Registered Suppliers</h1>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-64 border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900 w-10">#</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Supplier ID</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Company Name</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Address</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Contact Number</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900 w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.filter(s => s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || s.address.toLowerCase().includes(searchTerm.toLowerCase())).map((supplier, idx) => (
              <TableRow key={supplier.id} className="hover:bg-gray-50">
                <TableCell className="px-4 py-4 text-sm text-gray-900 font-bold">{idx + 1}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{supplier.supplierId}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{supplier.companyName}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{supplier.address}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{supplier.contactNumber}</TableCell>
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(supplier)} className="text-gray-600 hover:text-gray-900 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(supplier)} className="text-gray-600 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* Placeholder row */}
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-4 py-4 text-sm text-gray-400 font-bold">4</TableCell>
              <TableCell className="px-4 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-4 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-4 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-4 py-4 text-sm text-gray-400">Placeholder</TableCell>
              <TableCell className="px-4 py-4">
                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-gray-600">
                  <Plus className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-gray-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <Button onClick={handleNewSupplier} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"><Plus className="w-4 h-4" />New Supplier</Button>
        {/* Pagination (static for now) */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>Prev</button>
          {[1, 2, 3, 4].map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 text-sm rounded transition-colors ${currentPage === page ? "bg-gray-800 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}>{page}</button>
          ))}
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}>Next</button>
        </div>
      </div>
      {/* Modals */}
      <AddSupplierModal open={showAdd} onClose={() => setShowAdd(false)} onAdd={async (sup: Supplier) => { await addSupplier(sup); setShowAdd(false); fetchSuppliers().then(setSuppliers); }} />
      <EditSupplierModal open={showEdit} supplier={selectedSupplier} onClose={() => setShowEdit(false)} onEdit={async (sup: Supplier) => { await updateSupplier(sup); setShowEdit(false); fetchSuppliers().then(setSuppliers); }} />
      <DeleteSupplierModal open={showDelete} supplier={selectedSupplier} onClose={() => setShowDelete(false)} onDelete={async (id: number) => { await deleteSupplier(id); setShowDelete(false); fetchSuppliers().then(setSuppliers); }} />
    </div>
  );
} 