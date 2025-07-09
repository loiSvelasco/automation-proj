"use client"

import { Info, Upload, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SystemRestore() {
  const handleUploadBackupFile = () => {
    console.log("Upload Backup File clicked")
  }

  const handlePropagateLocalDatabase = () => {
    console.log("Propagate Local Database clicked")
  }

  const metrics = [
    { label: "Max Merchants", value: "00" },
    { label: "Max Employees", value: "00" },
    { label: "Max Suppliers", value: "00" },
    { label: "Max Deliveries", value: "00" },
    { label: "Max Products", value: "000" },
    { label: "Max Transactions", value: "00000" },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-1 bg-gray-800 h-16 rounded-full flex-shrink-0"></div>
            <h1 className="text-3xl sm:text-4xl font-medium text-gray-800 leading-tight">System Restore</h1>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-gray-800 text-white rounded-full p-2 flex-shrink-0 mt-1">
              <Info className="w-4 h-4" />
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              This module restores the state of a database backup file from data storage.
            </p>
          </div>

          <div className="pt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleUploadBackupFile}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Backup File
              </Button>
              <Button
                onClick={handlePropagateLocalDatabase}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                Propagate Local Database
              </Button>
            </div>
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
