"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import Footer from "@/components/ui/footer"

const chartConfig = {
  spoilage: {
    label: "Spoilage",
    color: "#F87171", // Red
  },
  returns: {
    label: "Returns", 
    color: "#FBBF24", // Yellow
  },
  damages: {
    label: "Damages",
    color: "#60A5FA", // Blue
  },
  theft: {
    label: "Theft",
    color: "#F472B6", // Pink
  },
}

export default function LossDashboard() {
  // Filters
  const [filters, setFilters] = useState({
    spoilage: true,
    returns: false,
    damages: false,
    theft: false,
    majorOnly: false,
  })

  // Big numbers
  const [totalLosses, setTotalLosses] = useState<number | null>(null)
  const [lossRatio, setLossRatio] = useState<number | null>(null)

  // Chart data
  const [areaChartData, setAreaChartData] = useState<any[]>([])
  const [lineChartData, setLineChartData] = useState<any[]>([])
  const [dualLineChartData, setDualLineChartData] = useState<any[]>([])

  // Loading state
  const [loading, setLoading] = useState(true)

  // Placeholder for API fetch
  useEffect(() => {
    setLoading(true)
    // Simulate API fetch
    setTimeout(() => {
      setTotalLosses(6200)
      setLossRatio(7.8)
      setAreaChartData([
        { month: "January", spoilage: 800, returns: 1100 },
        { month: "February", spoilage: 750, returns: 1200 },
        { month: "March", spoilage: 850, returns: 1050 },
        { month: "April", spoilage: 700, returns: 1150 },
        { month: "May", spoilage: 900, returns: 1250 },
        { month: "June", spoilage: 800, returns: 1100 },
        { month: "July", spoilage: 850, returns: 1300 },
        { month: "August", spoilage: 750, returns: 1000 },
      ])
      setLineChartData([
        { month: "Jan", value: 1900 },
        { month: "Feb", value: 1950 },
        { month: "Mar", value: 1900 },
        { month: "Apr", value: 1850 },
        { month: "May", value: 2150 },
        { month: "Jun", value: 1900 },
        { month: "Jul", value: 2150 },
        { month: "Aug", value: 1750 },
      ])
      setDualLineChartData([
        { month: "Jan", losses: 1900, inventory: 25000 },
        { month: "Feb", losses: 1950, inventory: 25500 },
        { month: "Mar", losses: 1900, inventory: 26000 },
        { month: "Apr", losses: 1850, inventory: 25200 },
        { month: "May", losses: 2150, inventory: 27000 },
        { month: "Jun", losses: 1900, inventory: 26500 },
        { month: "Jul", losses: 2150, inventory: 28000 },
        { month: "Aug", losses: 1750, inventory: 25000 },
      ])
      setLoading(false)
    }, 800)
  }, [])

  const handleFilterChange = (filterId: string, checked: boolean) => {
    setFilters((prev) => ({ ...prev, [filterId]: checked }))
  }

  // Custom dot for conditional styling in line chart
  const CustomDot = (props: any) => {
    const { cx, cy, value, index } = props;
    const key = `dot-${index}-${value}`;
    if (typeof value !== "number" || cx == null || cy == null) {
      return <circle key={key} cx={cx ?? 0} cy={cy ?? 0} r={2} fill="#F87171" stroke="#F87171" strokeWidth={1} />;
    }
    if (value > 2000) {
      return <circle key={key} cx={cx} cy={cy} r={6} fill="#F87171" stroke="#F87171" strokeWidth={2} />;
    }
    return <circle key={key} cx={cx} cy={cy} r={4} fill="#FBBF24" stroke="#FBBF24" strokeWidth={1} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 py-6">
        {/* Responsive 4-grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Top Left: Filters + Big Numbers */}
          <div className="flex flex-col gap-6 bg-white rounded-lg border border-gray-200 p-6 h-full">
            {/* Filters */}
            <div className="mb-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-gray-700 font-medium">Filters</span>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="spoilage"
                      checked={filters.spoilage}
                      onCheckedChange={(checked) => handleFilterChange("spoilage", checked as boolean)}
                    />
                    <label htmlFor="spoilage" className={`text-sm font-medium ${filters.spoilage ? "text-gray-900" : "text-gray-400"}`}>Spoilage</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="returns"
                      checked={filters.returns}
                      onCheckedChange={(checked) => handleFilterChange("returns", checked as boolean)}
                    />
                    <label htmlFor="returns" className={`text-sm font-medium ${filters.returns ? "text-gray-900" : "text-gray-400"}`}>Returns</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="damages"
                      checked={filters.damages}
                      onCheckedChange={(checked) => handleFilterChange("damages", checked as boolean)}
                    />
                    <label htmlFor="damages" className={`text-sm font-medium ${filters.damages ? "text-gray-900" : "text-gray-400"}`}>Damages</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="theft"
                      checked={filters.theft}
                      onCheckedChange={(checked) => handleFilterChange("theft", checked as boolean)}
                    />
                    <label htmlFor="theft" className={`text-sm font-medium ${filters.theft ? "text-gray-900" : "text-gray-400"}`}>Theft</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="majorOnly"
                      checked={filters.majorOnly}
                      onCheckedChange={(checked) => handleFilterChange("majorOnly", checked as boolean)}
                    />
                    <label htmlFor="majorOnly" className={`text-sm font-medium ${filters.majorOnly ? "text-gray-900" : "text-gray-400"}`}>Major Only</label>
                  </div>
                </div>
              </div>
            </div>
            {/* Big Numbers */}
            <div className="flex flex-row gap-8 justify-between items-center">
              <div className="flex flex-col items-center flex-1">
                <h2 className="text-lg font-medium text-gray-700 mb-1">Total Losses</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : `$${(totalLosses || 0).toLocaleString()}`}
                </div>
              </div>
              <div className="flex flex-col items-center flex-1">
                <h2 className="text-lg font-medium text-gray-700 mb-1">Loss Ratio</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : `${lossRatio}%`}
                </div>
              </div>
            </div>
          </div>
          {/* Top Right: Area Chart */}
          <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-end gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span>Spoilage</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span>Returns</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col justify-center">
              <ChartContainer config={chartConfig} className="h-[260px] w-full">
                <AreaChart data={areaChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={['auto', 'auto']} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area key="area-spoilage" type="monotone" dataKey="spoilage" name="Spoilage Area" stroke="#F87171" fill="#F87171" fillOpacity={0.5} />
                  <Area key="area-returns" type="monotone" dataKey="returns" name="Returns Area" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.4} />
                  <Line key="line-spoilage" type="monotone" dataKey="spoilage" name="Spoilage Line" stroke="#F87171" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#F87171', strokeWidth: 2 }} />
                  <Line key="line-returns" type="monotone" dataKey="returns" name="Returns Line" stroke="#FBBF24" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#FBBF24', strokeWidth: 2 }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {/* Bottom Left: Line Chart with Conditional Styling */}
          <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="text-xs text-gray-500">Monthly Losses Trend</div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col justify-center">
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <LineChart data={lineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#F87171"
                    strokeWidth={2}
                    dot={CustomDot}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {/* Bottom Right: Dual Line Chart */}
          <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="text-xs text-gray-500">Losses vs Inventory</div>
            </CardHeader>
            <CardContent className="p-2 flex-1 flex flex-col justify-center">
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <LineChart data={dualLineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="losses" stroke="#F87171" strokeWidth={2} dot={false} name="Losses" />
                  <Line type="monotone" dataKey="inventory" stroke="#60A5FA" strokeWidth={2} dot={false} name="Inventory" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
} 