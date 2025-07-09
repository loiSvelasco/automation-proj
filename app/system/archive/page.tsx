"use client"

import { Info, Download, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function SystemArchive() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 6, 5), // July 5, 2025
    to: new Date(2025, 6, 6), // July 6, 2025
  })

  const handleSelectRecords = () => {
    console.log("Select Records clicked")
  }

  const handleExportSelection = () => {
    console.log("Export Selection clicked")
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
            <h1 className="text-3xl sm:text-4xl font-medium text-gray-800 leading-tight">System Archive</h1>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-gray-800 text-white rounded-full p-2 flex-shrink-0 mt-1">
              <Info className="w-4 h-4" />
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              This module archives a portion of database and saves the rows in the archive path. Selected rows are
              exported and removed from the local database. Exported records can always be restored using the System
              Restore function.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Date:</span>
              <div className="flex-1 max-w-xs">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-gray-300",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "M/d/yyyy")} - {format(date.to, "M/d/yyyy")}
                          </>
                        ) : (
                          format(date.from, "M/d/yyyy")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleSelectRecords}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Select Records
              </Button>
              <Button
                onClick={handleExportSelection}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Selection
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
