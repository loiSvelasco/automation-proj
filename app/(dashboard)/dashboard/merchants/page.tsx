"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import Footer from "@/components/ui/footer"

const chartConfig = {
  active: {
    label: "Active Merchants",
    color: "#60A5FA", // Blue
  },
  inactive: {
    label: "Inactive Merchants",
    color: "#F472B6", // Pink
  },
  sales: {
    label: "Sales",
    color: "#34D399", // Green
  },
  registrations: {
    label: "Registrations",
    color: "#FBBF24", // Yellow
  },
}

export default function MerchantDashboard() {
  // Filters
  const [filters, setFilters] = useState({
    active: true,
    inactive: false,
    new: false,
    topRated: false,
    withIssues: false,
  })

  // Big numbers
  const [merchantsCount, setMerchantsCount] = useState<number | null>(null)
  const [coverageCount, setCoverageCount] = useState<number | null>(null)

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
      setMerchantsCount(121)
      setCoverageCount(50)
      setAreaChartData([
        { month: "January", active: 80, inactive: -40 },
        { month: "February", active: 90, inactive: 80 },
        { month: "March", active: 40, inactive: -70 },
        { month: "April", active: 85, inactive: 60 },
        { month: "May", active: -10, inactive: 40 },
        { month: "June", active: 90, inactive: -60 },
        { month: "July", active: -30, inactive: -80 },
        { month: "August", active: 40, inactive: 20 },
      ])
      setLineChartData([
        { month: "Jan", value: 60 },
        { month: "Feb", value: 62 },
        { month: "Mar", value: 58 },
        { month: "Apr", value: 54 },
        { month: "May", value: 50 },
        { month: "Jun", value: 46 },
        { month: "Jul", value: 42 },
        { month: "Aug", value: 55 },
      ])
      setDualLineChartData([
        { month: "Jan", sales: 100, registrations: 30 },
        { month: "Feb", sales: 120, registrations: 40 },
        { month: "Mar", sales: 110, registrations: 35 },
        { month: "Apr", sales: 130, registrations: 50 },
        { month: "May", sales: 140, registrations: 60 },
        { month: "Jun", sales: 150, registrations: 70 },
        { month: "Jul", sales: 160, registrations: 80 },
        { month: "Aug", sales: 170, registrations: 90 },
      ])
      setLoading(false)
    }, 800)
  }, [])

  const handleFilterChange = (filterId: string, checked: boolean) => {
    setFilters((prev) => ({ ...prev, [filterId]: checked }))
  }

  // Custom dot for conditional styling in line chart
  const CustomDot = (props: any) => {
    const { cx, cy, value } = props;
    if (typeof value !== "number" || cx == null || cy == null) {
      // Always return a valid SVG element
      return <circle cx={cx ?? 0} cy={cy ?? 0} r={2} fill="#34D399" stroke="#34D399" strokeWidth={1} />;
    }
    if (value < 50) {
      return <circle cx={cx} cy={cy} r={6} fill="#F87171" stroke="#F87171" strokeWidth={2} />;
    }
    return <circle cx={cx} cy={cy} r={4} fill="#34D399" stroke="#34D399" strokeWidth={1} />;
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
                      id="active"
                      checked={filters.active}
                      onCheckedChange={(checked) => handleFilterChange("active", checked as boolean)}
                    />
                    <label htmlFor="active" className={`text-sm font-medium ${filters.active ? "text-gray-900" : "text-gray-400"}`}>Active</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inactive"
                      checked={filters.inactive}
                      onCheckedChange={(checked) => handleFilterChange("inactive", checked as boolean)}
                    />
                    <label htmlFor="inactive" className={`text-sm font-medium ${filters.inactive ? "text-gray-900" : "text-gray-400"}`}>Inactive</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new"
                      checked={filters.new}
                      onCheckedChange={(checked) => handleFilterChange("new", checked as boolean)}
                    />
                    <label htmlFor="new" className={`text-sm font-medium ${filters.new ? "text-gray-900" : "text-gray-400"}`}>New</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="topRated"
                      checked={filters.topRated}
                      onCheckedChange={(checked) => handleFilterChange("topRated", checked as boolean)}
                    />
                    <label htmlFor="topRated" className={`text-sm font-medium ${filters.topRated ? "text-gray-900" : "text-gray-400"}`}>Top Rated</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="withIssues"
                      checked={filters.withIssues}
                      onCheckedChange={(checked) => handleFilterChange("withIssues", checked as boolean)}
                    />
                    <label htmlFor="withIssues" className={`text-sm font-medium ${filters.withIssues ? "text-gray-900" : "text-gray-400"}`}>With Issues</label>
                  </div>
                </div>
              </div>
            </div>
            {/* Big Numbers */}
            <div className="flex flex-row gap-8 justify-between items-center">
              <div className="flex flex-col items-center flex-1">
                <h2 className="text-lg font-medium text-gray-700 mb-1">Merchants</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : merchantsCount}
                </div>
              </div>
              <div className="flex flex-col items-center flex-1">
                <h2 className="text-lg font-medium text-gray-700 mb-1">Coverage</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : coverageCount}
                </div>
              </div>
            </div>
          </div>
          {/* Top Right: Area Chart */}
          <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-end gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-400 rounded"></div>
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-pink-400 rounded"></div>
                  <span>Inactive</span>
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
                  <Area key="area-active" type="monotone" dataKey="active" name="Active Area" stroke="#ff6384" fill="#ff6384" fillOpacity={0.5} />
                  <Area key="area-inactive" type="monotone" dataKey="inactive" name="Inactive Area" stroke="#36a2eb" fill="#36a2eb" fillOpacity={0.4} />
                  <Line key="line-active" type="monotone" dataKey="active" name="Active Line" stroke="#ff6384" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#ff6384', strokeWidth: 2 }} />
                  <Line key="line-inactive" type="monotone" dataKey="inactive" name="Inactive Line" stroke="#36a2eb" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#36a2eb', strokeWidth: 2 }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {/* Bottom Left: Line Chart with Conditional Styling */}
          <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="text-xs text-gray-500">Merchant Activity Trend</div>
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
                    stroke="#34D399"
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
              <div className="text-xs text-gray-500">Sales vs Registrations</div>
            </CardHeader>
            <CardContent className="p-2 flex-1 flex flex-col justify-center">
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <LineChart data={dualLineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="sales" stroke="#34D399" strokeWidth={2} dot={false} name="Sales" />
                  <Line type="monotone" dataKey="registrations" stroke="#FBBF24" strokeWidth={2} dot={false} name="Registrations" />
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
