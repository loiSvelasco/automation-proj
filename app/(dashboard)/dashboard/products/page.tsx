"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import Footer from "@/components/ui/footer"

const chartConfig = {
  beef: {
    label: "Beef",
    color: "#DC2626", // Red
  },
  pork: {
    label: "Pork", 
    color: "#F472B6", // Pink
  },
  chicken: {
    label: "Chicken",
    color: "#FBBF24", // Yellow
  },
  lamb: {
    label: "Lamb",
    color: "#34D399", // Green
  },
}

export default function ProductsDashboard() {
  // Filters
  const [filters, setFilters] = useState({
    beef: true,
    pork: false,
    chicken: false,
    lamb: false,
    inStock: false,
  })

  // Big numbers
  const [totalProducts, setTotalProducts] = useState<number | null>(null)
  const [avgPrice, setAvgPrice] = useState<number | null>(null)

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
      setTotalProducts(2847)
      setAvgPrice(156.80)
      setAreaChartData([
        { month: "January", beef: 450, pork: 320 },
        { month: "February", beef: 480, pork: 350 },
        { month: "March", beef: 420, pork: 380 },
        { month: "April", beef: 500, pork: 340 },
        { month: "May", beef: 460, pork: 360 },
        { month: "June", beef: 520, pork: 390 },
        { month: "July", beef: 490, pork: 370 },
        { month: "August", beef: 540, pork: 400 },
      ])
      setLineChartData([
        { month: "Jan", value: 770 },
        { month: "Feb", value: 830 },
        { month: "Mar", value: 800 },
        { month: "Apr", value: 840 },
        { month: "May", value: 820 },
        { month: "Jun", value: 910 },
        { month: "Jul", value: 860 },
        { month: "Aug", value: 940 },
      ])
      setDualLineChartData([
        { month: "Jan", products: 770, demand: 800 },
        { month: "Feb", products: 830, demand: 850 },
        { month: "Mar", products: 800, demand: 820 },
        { month: "Apr", products: 840, demand: 880 },
        { month: "May", products: 820, demand: 860 },
        { month: "Jun", products: 910, demand: 950 },
        { month: "Jul", products: 860, demand: 900 },
        { month: "Aug", products: 940, demand: 980 },
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
      return <circle key={key} cx={cx ?? 0} cy={cy ?? 0} r={2} fill="#DC2626" stroke="#DC2626" strokeWidth={1} />;
    }
    if (value > 900) {
      return <circle key={key} cx={cx} cy={cy} r={6} fill="#DC2626" stroke="#DC2626" strokeWidth={2} />;
    }
    return <circle key={key} cx={cx} cy={cy} r={4} fill="#34D399" stroke="#34D399" strokeWidth={1} />;
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
                      id="beef"
                      checked={filters.beef}
                      onCheckedChange={(checked) => handleFilterChange("beef", checked as boolean)}
                    />
                    <label htmlFor="beef" className={`text-sm font-medium ${filters.beef ? "text-gray-900" : "text-gray-400"}`}>Beef</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pork"
                      checked={filters.pork}
                      onCheckedChange={(checked) => handleFilterChange("pork", checked as boolean)}
                    />
                    <label htmlFor="pork" className={`text-sm font-medium ${filters.pork ? "text-gray-900" : "text-gray-400"}`}>Pork</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="chicken"
                      checked={filters.chicken}
                      onCheckedChange={(checked) => handleFilterChange("chicken", checked as boolean)}
                    />
                    <label htmlFor="chicken" className={`text-sm font-medium ${filters.chicken ? "text-gray-900" : "text-gray-400"}`}>Chicken</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lamb"
                      checked={filters.lamb}
                      onCheckedChange={(checked) => handleFilterChange("lamb", checked as boolean)}
                    />
                    <label htmlFor="lamb" className={`text-sm font-medium ${filters.lamb ? "text-gray-900" : "text-gray-400"}`}>Lamb</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) => handleFilterChange("inStock", checked as boolean)}
                    />
                    <label htmlFor="inStock" className={`text-sm font-medium ${filters.inStock ? "text-gray-900" : "text-gray-400"}`}>In Stock</label>
                  </div>
                </div>
              </div>
            </div>
            {/* Big Numbers */}
            <div className="flex flex-row gap-8 justify-between items-center">
              <div className="flex flex-col items-center flex-1">
                <h2 className="text-lg font-medium text-gray-700 mb-1">Total Products</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : (totalProducts || 0).toLocaleString()}
                </div>
              </div>
              <div className="flex flex-col items-center flex-1">
                <h2 className="text-lg font-medium text-gray-700 mb-1">Avg Price</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : `$${avgPrice?.toFixed(2)}`}
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
                  <span>Beef</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-pink-400 rounded"></div>
                  <span>Pork</span>
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
                  <Area key="area-beef" type="monotone" dataKey="beef" name="Beef Area" stroke="#DC2626" fill="#DC2626" fillOpacity={0.5} />
                  <Area key="area-pork" type="monotone" dataKey="pork" name="Pork Area" stroke="#F472B6" fill="#F472B6" fillOpacity={0.4} />
                  <Line key="line-beef" type="monotone" dataKey="beef" name="Beef Line" stroke="#DC2626" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#DC2626', strokeWidth: 2 }} />
                  <Line key="line-pork" type="monotone" dataKey="pork" name="Pork Line" stroke="#F472B6" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#F472B6', strokeWidth: 2 }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {/* Bottom Left: Line Chart with Conditional Styling */}
          <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="text-xs text-gray-500">Monthly Products Trend</div>
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
                    stroke="#DC2626"
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
              <div className="text-xs text-gray-500">Products vs Demand</div>
            </CardHeader>
            <CardContent className="p-2 flex-1 flex flex-col justify-center">
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <LineChart data={dualLineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="products" stroke="#DC2626" strokeWidth={2} dot={false} name="Products" />
                  <Line type="monotone" dataKey="demand" stroke="#34D399" strokeWidth={2} dot={false} name="Demand" />
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