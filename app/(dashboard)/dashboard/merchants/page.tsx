"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"

// Data for the top area chart
const areaChartData = [
  { month: "January", dataset1: 80, dataset2: 45 },
  { month: "February", dataset2: 85, dataset1: 30 },
  { month: "March", dataset1: 35, dataset2: 90 },
  { month: "April", dataset1: 90, dataset2: 40 },
  { month: "May", dataset1: 65, dataset2: 75 },
  { month: "June", dataset1: 95, dataset2: 25 },
  { month: "July", dataset1: 40, dataset2: 85 },
  { month: "August", dataset1: 75, dataset2: 60 },
]

// Data for bottom left declining chart
const declineChartData = [
  { month: "January", value: 65 },
  { month: "February", value: 62 },
  { month: "March", value: 58 },
  { month: "April", value: 54 },
  { month: "May", value: 50 },
  { month: "June", value: 46 },
  { month: "July", value: 42 },
]

// Data for bottom right complex chart
const complexChartData = [
  { x: 0, blue: 100, pink: 95 },
  { x: 100, blue: 85, pink: 110 },
  { x: 200, blue: 120, pink: 125 },
  { x: 300, blue: 95, pink: 140 },
  { x: 400, blue: 140, pink: 155 },
  { x: 500, blue: 180, pink: 170 },
  { x: 600, blue: 215, pink: 185 },
  { x: 700, blue: 250, pink: 200 },
  { x: 800, blue: 220, pink: 180 },
  { x: 900, blue: 190, pink: 160 },
  { x: 1000, blue: 160, pink: 150 },
]

const chartConfig = {
  dataset1: {
    label: "Dataset 1",
    color: "#F472B6", // Pink
  },
  dataset2: {
    label: "Dataset 2",
    color: "#60A5FA", // Blue
  },
  value: {
    label: "My First Dataset",
    color: "#EF4444", // Red
  },
  blue: {
    label: "Blue Line",
    color: "#60A5FA",
  },
  pink: {
    label: "Pink Line",
    color: "#F472B6",
  },
}

export default function MerchantDashboard() {
  const [filters, setFilters] = useState({
    filter1: false,
    filter2: false,
    filter3: true,
    filter4: true,
    filter5: false,
  })

  const handleFilterChange = (filterId: string, checked: boolean) => {
    setFilters((prev) => ({ ...prev, [filterId]: checked }))
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Filters Section */}
      <div className="mb-8">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-8">
            <span className="text-gray-700 font-medium">Filters</span>
            <div className="flex items-center gap-6">
              {Object.entries(filters).map(([key, checked]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={checked}
                    onCheckedChange={(checked) => handleFilterChange(key, checked as boolean)}
                  />
                  <label
                    htmlFor={key}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      checked ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    Label
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-12 gap-6 h-[600px]">
        {/* Left Side - Metrics */}
        <div className="col-span-3 space-y-12">
          <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Merchants</h2>
            <div className="text-8xl font-bold text-gray-900 leading-none">121</div>
          </div>
          <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Coverage</h2>
            <div className="text-8xl font-bold text-gray-900 leading-none">50</div>
          </div>
        </div>

        {/* Right Side - Charts */}
        <div className="col-span-9 grid grid-rows-2 gap-6">
          {/* Top Chart - Area Chart */}
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-end gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-pink-400 rounded"></div>
                  <span>Dataset 1</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-400 rounded"></div>
                  <span>Dataset 2</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <AreaChart data={areaChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickFormatter={(value) => value.slice(0, 3)}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="dataset1"
                    stackId="1"
                    stroke="#F472B6"
                    fill="#F472B6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="dataset2"
                    stackId="1"
                    stroke="#60A5FA"
                    fill="#60A5FA"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Bottom Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Bottom Left Chart - Declining Line */}
            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <div className="text-xs text-gray-500">My First Dataset</div>
              </CardHeader>
              <CardContent className="p-0">
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <LineChart data={declineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => value.slice(0, 3)}
                      angle={-45}
                      textAnchor="end"
                      height={40}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#EF4444"
                      strokeWidth={2}
                      dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Bottom Right Chart - Complex Lines */}
            <Card className="border-gray-200">
              <CardContent className="p-2">
                <ChartContainer config={chartConfig} className="h-[220px] w-full">
                  <LineChart data={complexChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis domain={[50, 300]} />
                    <ChartTooltip content={<ChartTooltipContent />} labelFormatter={(value) => `X: ${value}`} />
                    <Line type="monotone" dataKey="blue" stroke="#60A5FA" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="pink" stroke="#F472B6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
