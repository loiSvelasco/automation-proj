"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import Footer from "@/components/ui/footer"

const chartConfig = {
  wholesale: {
    label: "Wholesale",
    color: "#22C55E", // Green
  },
  retail: {
    label: "Retail", 
    color: "#FBBF24", // Yellow
  },
  online: {
    label: "Online",
    color: "#60A5FA", // Blue
  },
  bulk: {
    label: "Bulk Orders",
    color: "#F472B6", // Pink
  },
}

export default function ProfitsDashboard() {
  // Filters
  const [filters, setFilters] = useState({
    wholesale: true,
    retail: false,
    online: false,
    bulk: false,
    majorOnly: false,
  })

  // Big numbers
  const [totalProfits, setTotalProfits] = useState<number | null>(null)
  const [profitMargin, setProfitMargin] = useState<number | null>(null)

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
      setTotalProfits(32180)
      setProfitMargin(38.2)
      setAreaChartData([
        { month: "January", wholesale: 4200, retail: 2800 },
        { month: "February", wholesale: 3800, retail: 3200 },
        { month: "March", wholesale: 4500, retail: 2900 },
        { month: "April", wholesale: 4100, retail: 3100 },
        { month: "May", wholesale: 4800, retail: 3300 },
        { month: "June", wholesale: 4400, retail: 3000 },
        { month: "July", wholesale: 4600, retail: 3400 },
        { month: "August", wholesale: 4200, retail: 2800 },
      ])
      setLineChartData([
        { month: "Jan", value: 7000 },
        { month: "Feb", value: 7200 },
        { month: "Mar", value: 7400 },
        { month: "Apr", value: 7100 },
        { month: "May", value: 8100 },
        { month: "Jun", value: 7400 },
        { month: "Jul", value: 8000 },
        { month: "Aug", value: 7000 },
      ])
      setDualLineChartData([
        { month: "Jan", profits: 7000, revenue: 18000 },
        { month: "Feb", profits: 7200, revenue: 18500 },
        { month: "Mar", profits: 7400, revenue: 19000 },
        { month: "Apr", profits: 7100, revenue: 18200 },
        { month: "May", profits: 8100, revenue: 20000 },
        { month: "Jun", profits: 7400, revenue: 19500 },
        { month: "Jul", profits: 8000, revenue: 21000 },
        { month: "Aug", profits: 7000, revenue: 18000 },
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
      return <circle key={key} cx={cx ?? 0} cy={cy ?? 0} r={2} fill="#22C55E" stroke="#22C55E" strokeWidth={1} />;
    }
    if (value > 7800) {
      return <circle key={key} cx={cx} cy={cy} r={6} fill="#22C55E" stroke="#22C55E" strokeWidth={2} />;
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
                      id="wholesale"
                      checked={filters.wholesale}
                      onCheckedChange={(checked) => handleFilterChange("wholesale", checked as boolean)}
                    />
                    <label htmlFor="wholesale" className={`text-sm font-medium ${filters.wholesale ? "text-gray-900" : "text-gray-400"}`}>Wholesale</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="retail"
                      checked={filters.retail}
                      onCheckedChange={(checked) => handleFilterChange("retail", checked as boolean)}
                    />
                    <label htmlFor="retail" className={`text-sm font-medium ${filters.retail ? "text-gray-900" : "text-gray-400"}`}>Retail</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="online"
                      checked={filters.online}
                      onCheckedChange={(checked) => handleFilterChange("online", checked as boolean)}
                    />
                    <label htmlFor="online" className={`text-sm font-medium ${filters.online ? "text-gray-900" : "text-gray-400"}`}>Online</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bulk"
                      checked={filters.bulk}
                      onCheckedChange={(checked) => handleFilterChange("bulk", checked as boolean)}
                    />
                    <label htmlFor="bulk" className={`text-sm font-medium ${filters.bulk ? "text-gray-900" : "text-gray-400"}`}>Bulk Orders</label>
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
                <h2 className="text-lg font-medium text-gray-700 mb-1">Total Profits</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : `$${(totalProfits || 0).toLocaleString()}`}
                </div>
              </div>
              <div className="flex flex-col items-center flex-1">
                <h2 className="text-lg font-medium text-gray-700 mb-1">Profit Margin</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : `${profitMargin}%`}
                </div>
              </div>
            </div>
          </div>
          {/* Top Right: Area Chart */}
          <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-end gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span>Wholesale</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span>Retail</span>
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
                  <Area key="area-wholesale" type="monotone" dataKey="wholesale" name="Wholesale Area" stroke="#22C55E" fill="#22C55E" fillOpacity={0.5} />
                  <Area key="area-retail" type="monotone" dataKey="retail" name="Retail Area" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.4} />
                  <Line key="line-wholesale" type="monotone" dataKey="wholesale" name="Wholesale Line" stroke="#22C55E" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#22C55E', strokeWidth: 2 }} />
                  <Line key="line-retail" type="monotone" dataKey="retail" name="Retail Line" stroke="#FBBF24" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#FBBF24', strokeWidth: 2 }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {/* Bottom Left: Line Chart with Conditional Styling */}
          <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="text-xs text-gray-500">Monthly Profits Trend</div>
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
                    stroke="#22C55E"
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
              <div className="text-xs text-gray-500">Profits vs Revenue</div>
            </CardHeader>
            <CardContent className="p-2 flex-1 flex flex-col justify-center">
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <LineChart data={dualLineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="profits" stroke="#22C55E" strokeWidth={2} dot={false} name="Profits" />
                  <Line type="monotone" dataKey="revenue" stroke="#60A5FA" strokeWidth={2} dot={false} name="Revenue" />
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