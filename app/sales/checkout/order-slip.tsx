"use client";

import { useState } from "react";
import { Printer, ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderItem {
  dr: string;
  description: string;
  unitCost: string;
  quantity: number;
  amount: number;
  discount: number;
  boxes?: number; // Added for summary calculation
}

interface OrderSlipProps {
  onBack?: () => void;
  isModal?: boolean;
}

const sampleOrder = {
  orderNumber: "ORD-2025-001",
  date: new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }),
  merchant: "Melchora B. Aquino",
  merchantAddress: "123 Main Street, Quezon City, Philippines",
  merchantPhone: "+63 912 345 6789",
  items: [
    { dr: "000001", description: "Chicken Breast", unitCost: "200.00/kl", quantity: 2, amount: 400.0, discount: 0 },
    { dr: "000002", description: "Pork Belly", unitCost: "100.00/kl", quantity: 2, amount: 200.0, discount: 10.0 },
    { dr: "000003", description: "Beef Steak", unitCost: "500.00/kl", quantity: 1, amount: 500.0, discount: 0 },
  ] as OrderItem[],
  subtotal: 1100.0,
  totalDiscount: 10.0,
  tax: 110.0,
  total: 1200.0,
  paymentMethod: "Cash",
  cashier: "Juan Dela Cruz",
  storeInfo: {
    name: "3S and R Frozen Meat Trading Inc.",
    address: "456 Business District, Manila, Philippines",
    phone: "+63 2 8123 4567",
    email: "info@3sandrfrozen.com",
    website: "www.3sandrfrozen.com"
  }
};

export default function OrderSlipPage({ onBack, isModal = false }: OrderSlipProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading order slip as PDF...");
  };

  const calculateSubtotal = () => {
    return sampleOrder.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTotalDiscount = () => {
    return sampleOrder.items.reduce((sum, item) => sum + item.discount, 0);
  };

  const calculateTax = (subtotal: number, discount: number) => {
    return (subtotal - discount) * 0.10; // 10% tax
  };

  const subtotal = calculateSubtotal();
  const totalDiscount = calculateTotalDiscount();
  const tax = calculateTax(subtotal, totalDiscount);
  const total = subtotal - totalDiscount + tax;

  // Calculate summary totals from items
  const totalBoxes = sampleOrder.items.reduce((sum, o) => sum + (o.boxes || o.quantity || 0), 0); // fallback to quantity if boxes not present
  const totalWeight = sampleOrder.items.reduce((sum, o) => sum + (o.quantity || 0), 0);
  const totalAmount = sampleOrder.items.reduce((sum, o) => sum + (o.amount || 0), 0);

  return (
    <>
      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 20px;
            background: white;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 1cm;
          }
        }
      `}</style>

      <div className={`${isModal ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' : 'bg-white'}`}>
        <div className={`${isModal ? 'bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto' : 'bg-white'} print-content`}>
          {/* Header - Hidden when printing */}
          <div className="flex justify-between items-center p-6 border-b no-print">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Checkout
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button
                onClick={handlePrint}
                disabled={isPrinting}
                className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                {isPrinting ? "Printing..." : "Print"}
              </Button>
            </div>
          </div>

          {/* Order Slip Content */}
          <div className="p-6 print:p-0">
            {/* Store Header */}
            <div className="text-center mb-6 print:mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {sampleOrder.storeInfo.name}
              </h1>
              <p className="text-sm text-gray-600 mb-1">{sampleOrder.storeInfo.address}</p>
              <p className="text-sm text-gray-600 mb-1">
                Tel: {sampleOrder.storeInfo.phone} | Email: {sampleOrder.storeInfo.email}
              </p>
              <p className="text-sm text-gray-600">Website: {sampleOrder.storeInfo.website}</p>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-2 gap-6 mb-6 print:mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Information</h2>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Order #:</span> {sampleOrder.orderNumber}</p>
                  <p><span className="font-medium">Date:</span> {sampleOrder.date}</p>
                  <p><span className="font-medium">Cashier:</span> {sampleOrder.cashier}</p>
                  <p><span className="font-medium">Payment:</span> {sampleOrder.paymentMethod}</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Customer Information</h2>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Name:</span> {sampleOrder.merchant}</p>
                  <p><span className="font-medium">Address:</span> {sampleOrder.merchantAddress}</p>
                  <p><span className="font-medium">Phone:</span> {sampleOrder.merchantPhone}</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6 print:mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">#</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">DR</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Unit Cost</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Qty</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Discount</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sampleOrder.items.map((item, index) => (
                      <tr key={item.dr}>
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.dr}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.unitCost}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          {item.discount > 0 ? `₱${item.discount.toFixed(2)}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                          ₱{item.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

            {/* Totals */}
            <div className="flex justify-end mb-6 print:mb-4">
              <div className="w-80 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount:</span>
                  <span>-₱{totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (10%):</span>
                  <span>₱{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>₱{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600 border-t pt-6 print:pt-4">
              <p className="mb-2">Thank you for your business!</p>
              <p>Please keep this receipt for your records.</p>
              <p className="mt-4 text-xs">
                This is a computer-generated receipt. No signature required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 