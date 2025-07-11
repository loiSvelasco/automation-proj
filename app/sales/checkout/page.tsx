"use client";

import { useState } from "react";
import { Search, Plus, List, ShoppingBagIcon, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import OrderSlipPage from "./order-slip";

const merchantOptions = [
  "Melchora B. Aquino",
  "Juancho A. Melchor",
  "Valery D. De Guzman",
];

const initialOrders = [
  { dr: "000001", items: "Belly", unitCost: "200.00/kl", quantity: 2, amount: 400.0, discount: 0 },
  { dr: "000002", items: "Head", unitCost: "100.00/kl", quantity: 2, amount: 200.0, discount: 0 },
  { dr: "000003", items: "Loin", unitCost: "500.00/kl", quantity: 1, amount: 500.0, discount: 0 },
];

export default function CheckoutPage() {
  const [orders] = useState(initialOrders);
  const [merchant, setMerchant] = useState("");
  const [showMerchantDropdown, setShowMerchantDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOrders = orders.filter(o =>
    o.dr.includes(searchTerm) ||
    o.items.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Pagination logic
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const [showOrderSlip, setShowOrderSlip] = useState(false);
  const [paymentOption, setPaymentOption] = useState("Cash");
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const filteredMerchants = merchantOptions.filter((m) =>
    m.toLowerCase().includes(merchant.toLowerCase())
  );

  const amountDue = orders.reduce((sum, o) => sum + o.amount, 0);

  // Calculate summary totals from orders
  const totalBoxes = filteredOrders.reduce((sum, o) => sum + (o.quantity || 0), 0); // use quantity for boxes
  const totalWeight = filteredOrders.reduce((sum, o) => sum + (o.quantity || 0), 0);
  const totalAmount = filteredOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

  const handleCheckout = () => {
    console.log("Checkout clicked")
    setShowOrderSlip(true);
  }

  const handleBackFromOrderSlip = () => {
    setShowOrderSlip(false);
  }

  // If order slip is showing, render it as a modal
  if (showOrderSlip) {
    return (
      <OrderSlipPage 
        onBack={handleBackFromOrderSlip} 
        isModal={true} 
      />
    );
  }

  return (
    <div className="bg-white">
      {/* Merchant, Load Order, Amount Due */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div className="flex items-center gap-4 flex-1 min-w-[220px] relative">
          {/*  Merchant */}
          <div className="h-12 w-1 bg-black mr-4" />
          <span className="font-medium">Merchant:</span>
          <div className="relative w-full max-w-xs">
            <Input
              className="w-full"
              placeholder="Type to search..."
              value={merchant}
              onChange={e => {
                setMerchant(e.target.value);
                setShowMerchantDropdown(true);
              }}
              onFocus={() => setShowMerchantDropdown(true)}
              onBlur={() => setTimeout(() => setShowMerchantDropdown(false), 150)}
            />
            {showMerchantDropdown && merchant && (
              <div className="absolute left-0 top-full mt-1 bg-white border rounded shadow-md z-50 w-full">
                {filteredMerchants.length > 0 ? (
                  filteredMerchants.map((m) => (
                    <div
                      key={m}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onMouseDown={() => {
                        setMerchant(m);
                        setShowMerchantDropdown(false);
                      }}
                    >
                      {m}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-400 text-sm">No results</div>
                )}
              </div>
            )}
          </div>
          <Button className="bg-gray-800 hover:bg-gray-900 text-white flex gap-2 items-center">Load Order</Button>
        </div>
        {/* Amount Due Section  */}
        <div className="flex items-center flex-1 min-w-[220px] md:justify-end">
          <div className="h-12 w-1 bg-black mr-4" />
          <div className="flex flex-col justify-center">
            <span className="font-medium text-lg text-gray-600 mb-0">Amount Due</span>
            <span className="text-3xl font-extrabold text-gray-900 leading-tight">Php {amountDue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
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
          <h1 className="text-2xl font-semibold text-gray-900">Order Details</h1>
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
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Amount</TableHead>
              <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900">Discount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order, idx) => (
              <TableRow key={order.dr} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-sm text-gray-900">{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.dr}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.items}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.unitCost}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.quantity}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.amount.toFixed(2)}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900">{order.discount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-1 bg-black mr-4" />
          <span className="font-medium">Payment Option:</span>
          <div className="relative">
            <Button
              type="button"
              className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2 px-6 py-2 rounded-md font-semibold h-12"
              style={{ minWidth: '140px' }}
              onClick={() => setShowPaymentDropdown((v) => !v)}
            >
              {paymentOption} <ChevronDown className="w-4 h-4" />
            </Button>
            {showPaymentDropdown && (
              <div className="absolute left-0 top-full mt-2 bg-white border rounded shadow-md z-50 min-w-[160px]">
                {["Cash", "Online", "Purchase Order"].map(option => (
                  <div
                    key={option}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm ${paymentOption === option ? "font-bold text-gray-900" : "text-gray-700"}`}
                    onMouseDown={() => {
                      setPaymentOption(option);
                      setShowPaymentDropdown(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            onClick={handleCheckout}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md flex items-center gap-2 font-semibold h-12"
            style={{ minWidth: '140px' }}
          >
            <ShoppingCart className="w-5 h-5" />
            Checkout
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
    </div>
  );
} 