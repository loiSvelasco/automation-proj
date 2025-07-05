"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import Footer from "@/components/ui/footer"

const chartConfig = {
  cash: {
    label: "Cash",
    color: "#22C55E", // Green
  },
  card: {
    label: "Card", 
    color: "#FBBF24", // Yellow
  },
  bank: {
    label: "Bank Transfer",
    color: "#60A5FA", // Blue
  },
  digital: {
    label: "Digital",
    color: "#F472B6", // Pink
  },
}

export default function CollectionsDashboard() {
  // Filters
  const [filters, setFilters] = useState({
    cash: true,
    card: false,
    bank: false,
    digital: false,
    majorOnly: false,
  })

  // Big numbers
  const [totalCollections, setTotalCollections] = useState<number | null>(null)
  const [collectionRate, setCollectionRate] = useState<number | null>(null)

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
      setTotalCollections(18400)
      setCollectionRate(92.5)
      setAreaChartData([
        { month: "January", cash: 4200, card: 2800 },
        { month: "February", cash: 3800, card: 3200 },
        { month: "March", cash: 4500, card: 2900 },
        { month: "April", cash: 4100, card: 3100 },
        { month: "May", cash: 4800, card: 3300 },
        { month: "June", cash: 4400, card: 3000 },
        { month: "July", cash: 4600, card: 3400 },
        { month: "August", cash: 4200, card: 2800 },
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
        { month: "Jan", collections: 7000, targets: 7500 },
        { month: "Feb", collections: 7200, targets: 7500 },
        { month: "Mar", collections: 7400, targets: 7500 },
        { month: "Apr", collections: 7100, targets: 7500 },
        { month: "May", collections: 8100, targets: 7500 },
        { month: "Jun", collections: 7400, targets: 7500 },
        { month: "Jul", collections: 8000, targets: 7500 },
        { month: "Aug", collections: 7000, targets: 7500 },
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
                      id="cash"
                      checked={filters.cash}
                      onCheckedChange={(checked) => handleFilterChange("cash", checked as boolean)}
                    />
                    <label htmlFor="cash" className={`text-sm font-medium ${filters.cash ? "text-gray-900" : "text-gray-400"}`}>Cash</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="card"
                      checked={filters.card}
                      onCheckedChange={(checked) => handleFilterChange("card", checked as boolean)}
                    />
                    <label htmlFor="card" className={`text-sm font-medium ${filters.card ? "text-gray-900" : "text-gray-400"}`}>Card</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bank"
                      checked={filters.bank}
                      onCheckedChange={(checked) => handleFilterChange("bank", checked as boolean)}
                    />
                    <label htmlFor="bank" className={`text-sm font-medium ${filters.bank ? "text-gray-900" : "text-gray-400"}`}>Bank Transfer</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="digital"
                      checked={filters.digital}
                      onCheckedChange={(checked) => handleFilterChange("digital", checked as boolean)}
                    />
                    <label htmlFor="digital" className={`text-sm font-medium ${filters.digital ? "text-gray-900" : "text-gray-400"}`}>Digital</label>
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
                <h2 className="text-lg font-medium text-gray-700 mb-1">Total Collections</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : `$${(totalCollections || 0).toLocaleString()}`}
          </div>
      </div>
              <div className="flex flex-col items-center flex-1">
                <h2 className="text-lg font-medium text-gray-700 mb-1">Collection Rate</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : `${collectionRate}%`}
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
                  <span>Cash</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span>Card</span>
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
                  <Area key="area-cash" type="monotone" dataKey="cash" name="Cash Area" stroke="#22C55E" fill="#22C55E" fillOpacity={0.5} />
                  <Area key="area-card" type="monotone" dataKey="card" name="Card Area" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.4} />
                  <Line key="line-cash" type="monotone" dataKey="cash" name="Cash Line" stroke="#22C55E" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#22C55E', strokeWidth: 2 }} />
                  <Line key="line-card" type="monotone" dataKey="card" name="Card Line" stroke="#FBBF24" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#FBBF24', strokeWidth: 2 }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {/* Bottom Left: Line Chart with Conditional Styling */}
          <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="text-xs text-gray-500">Monthly Collections Trend</div>
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
              <div className="text-xs text-gray-500">Collections vs Targets</div>
            </CardHeader>
            <CardContent className="p-2 flex-1 flex flex-col justify-center">
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <LineChart data={dualLineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="collections" stroke="#22C55E" strokeWidth={2} dot={false} name="Collections" />
                  <Line type="monotone" dataKey="targets" stroke="#60A5FA" strokeWidth={2} dot={false} name="Targets" />
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