"use client";

import { useState } from "react";
import { Search, Edit, Trash2, Plus, List, ArrowBigRightDash, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar";
import EditOrderModal from "./EditOrderModal";
import DeleteOrderModal from "./DeleteOrderModal";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const initialOrders = [
  { dr: "000001", description: "Belly", unitCost: "200.00/kl", quantity: 2, boxes: 2, amount: 400.0, date: new Date(2024, 3, 1) },
  { dr: "000002", description: "Head", unitCost: "100.00/kl", quantity: 2, boxes: 2, amount: 200.0, date: new Date(2024, 3, 2) },
  { dr: "000003", description: "Loin", unitCost: "500.00/kl", quantity: 1, boxes: 1, amount: 500.0, date: new Date(2024, 3, 3) },
];

const itemOptions = ["Ribs", "Leg", "Ham"];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [merchant, setMerchant] = useState("");
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(["Ribs", "Ham"]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<any>(null);
  const [orderToDelete, setOrderToDelete] = useState<any>(null);
  const [dateInput, setDateInput] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleNewOrder = () => {
    console.log("New Order clicked")
  }

  const handleEdit = (dr: string) => {
    const order = orders.find(o => o.dr === dr);
    setOrderToEdit(order);
    setEditModalOpen(true);
  };

  const handleDelete = (dr: string) => {
    const order = orders.find(o => o.dr === dr);
    setOrderToDelete(order);
    setDeleteModalOpen(true);
  };

  const handleAdd = () => {
    console.log("Add new order row")
  }

  const filteredOrders = selectedDate
    ? orders.filter(order =>
        order.date &&
        order.date.getFullYear() === selectedDate.getFullYear() &&
        order.date.getMonth() === selectedDate.getMonth() &&
        order.date.getDate() === selectedDate.getDate()
      )
    : orders;

  // Pagination logic
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSaveEdit = (updatedOrder: any) => {
    setOrders(orders =>
      orders.map(o => (o.dr === updatedOrder.dr ? { ...updatedOrder, date: o.date } : o))
    );
  };

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      setOrders(orders => orders.filter(o => o.dr !== orderToDelete.dr));
      setDeleteModalOpen(false);
      setOrderToDelete(null);
    }
  };

  // Set button applies the filter
  const handleSetDate = () => {
    if (dateInput) {
      const parsed = new Date(dateInput);
      if (!isNaN(parsed.getTime())) setSelectedDate(parsed);
    } else {
      setSelectedDate(undefined);
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      setDateInput(date.toISOString().slice(0, 10));
      setCalendarOpen(false);
    }
  };

  // Calculate summary totals from filteredOrders
  const totalBoxes = filteredOrders.reduce((sum, o) => sum + (o.boxes || 0), 0);
  const totalWeight = filteredOrders.reduce((sum, o) => sum + (o.quantity || 0), 0);
  const totalAmount = filteredOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

  return (
    <div className="bg-white">
      {/* Controls Row - aligned horizontally and spaced evenly */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div className="flex items-center flex-1 min-w-[220px]">
          {/* Vertical line */}
          <div className="h-12 w-1 bg-black mr-4" />
          <span className="font-medium text-gray-600 mr-2">Merchant:</span>
          <Input
            className="w-full max-w-xs mr-2"
            placeholder="Melchora B. Aquino"
            value={merchant}
            onChange={e => setMerchant(e.target.value)}
          />
          <Button className="bg-gray-800 hover:bg-gray-900 text-white flex gap-2 items-center mr-2">
            <Plus className="w-4 h-4" /> Add
          </Button>
          <Button className="bg-gray-800 hover:bg-gray-900 text-white flex gap-2 items-center">
            <Search className="w-4 h-4" /> Search
          </Button>
        </div>
        <div className="flex items-center gap-4 flex-1 min-w-[220px] justify-end">
          <span className="font-medium">Date:</span>
          <div className="flex items-center w-full max-w-xs gap-2">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Input
                  className="cursor-pointer bg-white"
                  readOnly
                  value={dateInput}
                  placeholder="Select date"
                  onClick={() => setCalendarOpen(true)}
                />
              </PopoverTrigger>
              <PopoverContent align="start" className="p-2 w-auto">
                <Calendar
                  mode="single"
                  selected={dateInput ? new Date(dateInput) : undefined}
                  onSelect={handleCalendarSelect}
                  className="border-none shadow-none"
                />
              </PopoverContent>
            </Popover>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white flex gap-2 items-center" onClick={handleSetDate}>
              <CalendarIcon className="w-4 h-4" />
              Set
            </Button>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Add Cart</h1>
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
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">DR</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Items</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Unit Cost</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Quantity</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Box/es</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Amount</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order, idx) => (
              <TableRow key={order.dr} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-sm text-gray-900">{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.dr}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.description}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.unitCost}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.quantity}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.boxes}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.amount.toFixed(2)}</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(order.dr)}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(order.dr)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* Placeholder row */}
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <Input className="w-16 text-sm" placeholder="00" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <Input className="w-24 text-sm" placeholder="Item" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <div className="relative">
                  <Button variant="outline" className="w-full font-semibold" onClick={() => setDropdownOpen(v => !v)}>
                    Select Items ▼
                  </Button>
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 bg-white border rounded shadow-md p-4 z-50 min-w-[180px]">
                      {itemOptions.map(option => (
                        <div key={option} className="flex items-center gap-2 py-1">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(option)}
                            onChange={() => setSelectedItems(sel => sel.includes(option) ? sel.filter(i => i !== option) : [...sel, option])}
                          />
                          <span className="text-sm">{option}</span>
                        </div>
                      ))}
                      <div className="flex justify-end mt-4">
                        <Button size="sm" className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-1" onClick={() => setDropdownOpen(false)}>Close</Button>
                      </div>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <Input className="w-20 text-sm" placeholder="1" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <Input className="w-16 text-sm" placeholder="1" />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-400">
                <Input className="w-16 text-sm" placeholder="0.00" />
              </TableCell>
              <TableCell className="px-6 py-4">
                <button onClick={handleAdd} className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Bottom Section: Buttons and Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-4">
          <Button
            onClick={handleNewOrder}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
          <Button
            onClick={handleNewOrder}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <ArrowBigRightDash className="w-4 h-4" />
            Finalize
          </Button>
        </div>
        {/* Pagination */}
        <div className="flex items-center">
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {/* Summary Row */}
      <div className="flex justify-start items-end gap-16 mt-8 mb-4">
        <div className="flex items-center">
          <div className="h-12 w-1 bg-black mr-4" />
          <div className="flex flex-col items-start">
            <div className="text-base text-gray-600 mb-1 font-medium">Total Number of Box</div>
            <div className="text-4xl font-extrabold text-gray-900">{totalBoxes}</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-12 w-1 bg-black mr-4" />
          <div className="flex flex-col items-start">
            <div className="text-base text-gray-600 mb-1 font-medium">Total Actual Weight</div>
            <div className="flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900">{totalWeight}</span>
              <span className="text-xl text-gray-700 ml-1 font-semibold">kg</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-12 w-1 bg-black mr-4" />
          <div className="flex flex-col items-start">
            <div className="text-base text-gray-600 mb-1 font-medium">Total Amount</div>
            <div className="text-4xl font-extrabold text-gray-900">Php {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      </div>
      <EditOrderModal
        open={editModalOpen}
        order={orderToEdit}
        onSave={handleSaveEdit}
        onClose={() => setEditModalOpen(false)}
      />
      <DeleteOrderModal
        open={deleteModalOpen}
        order={orderToDelete}
        onDelete={handleConfirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
} 