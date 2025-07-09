"use client"

import { Info, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SystemBackup() {
  const handleExportDatabase = () => {
    console.log("Export Database clicked")
  }

  const metrics = [
    { label: "Max Merchants", value: "50" },
    { label: "Max Employees", value: "10" },
    { label: "Max Suppliers", value: "50" },
    { label: "Max Deliveries", value: "10" },
    { label: "Max Products", value: "199" },
    { label: "Max Transactions", value: "10,000" },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-1 bg-gray-800 h-16 rounded-full flex-shrink-0"></div>
            <h1 className="text-3xl sm:text-4xl font-medium text-gray-800 leading-tight">System Backup</h1>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-gray-800 text-white rounded-full p-2 flex-shrink-0 mt-1">
              <Info className="w-4 h-4" />
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              This module exports the complete state of the database. The dumped compilation is saved in the backup
              path.
            </p>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleExportDatabase}
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Database
            </Button>
          </div>
        </div>

        {/* Right Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-1 bg-gray-800 h-20 sm:h-24 rounded-full flex-shrink-0"></div>
              <div>
                <p className="text-gray-600 text-sm mb-2">{metric.label}</p>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-none">
                  {metric.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
