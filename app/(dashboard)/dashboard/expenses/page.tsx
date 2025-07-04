"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import Footer from "@/components/ui/footer"

const chartConfig = {
  utilities: {
    label: "Utilities",
    color: "#F87171", // Red
  },
  salaries: {
    label: "Salaries", 
    color: "#FBBF24", // Yellow
  },
  supplies: {
    label: "Supplies",
    color: "#34D399", // Green
  },
  overhead: {
    label: "Overhead",
    color: "#60A5FA", // Blue
  },
}

export default function ExpensesDashboard() {
  // Filters
  const [filters, setFilters] = useState({
    utilities: true,
    salaries: false,
    supplies: false,
    overhead: false,
    majorOnly: false,
  })

  // Big numbers
  const [totalExpenses, setTotalExpenses] = useState<number | null>(null)
  const [expenseRatio, setExpenseRatio] = useState<number | null>(null)

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
      setTotalExpenses(18400)
      setExpenseRatio(24.7)
      setAreaChartData([
        { month: "January", utilities: 1200, salaries: 3500 },
        { month: "February", utilities: 1100, salaries: 3500 },
        { month: "March", utilities: 1300, salaries: 3500 },
        { month: "April", utilities: 1000, salaries: 3500 },
        { month: "May", utilities: 1400, salaries: 3500 },
        { month: "June", utilities: 1200, salaries: 3500 },
        { month: "July", utilities: 1100, salaries: 3500 },
        { month: "August", utilities: 1300, salaries: 3500 },
      ])
      setLineChartData([
        { month: "Jan", value: 4700 },
        { month: "Feb", value: 4600 },
        { month: "Mar", value: 4800 },
        { month: "Apr", value: 4500 },
        { month: "May", value: 4900 },
        { month: "Jun", value: 4700 },
        { month: "Jul", value: 4600 },
        { month: "Aug", value: 4800 },
      ])
      setDualLineChartData([
        { month: "Jan", expenses: 4700, budget: 5000 },
        { month: "Feb", expenses: 4600, budget: 5000 },
        { month: "Mar", expenses: 4800, budget: 5000 },
        { month: "Apr", expenses: 4500, budget: 5000 },
        { month: "May", expenses: 4900, budget: 5000 },
        { month: "Jun", expenses: 4700, budget: 5000 },
        { month: "Jul", expenses: 4600, budget: 5000 },
        { month: "Aug", expenses: 4800, budget: 5000 },
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
    if (value > 4800) {
      return <circle key={key} cx={cx} cy={cy} r={6} fill="#F87171" stroke="#F87171" strokeWidth={2} />;
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
                      id="utilities"
                      checked={filters.utilities}
                      onCheckedChange={(checked) => handleFilterChange("utilities", checked as boolean)}
                    />
                    <label htmlFor="utilities" className={`text-sm font-medium ${filters.utilities ? "text-gray-900" : "text-gray-400"}`}>Utilities</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="salaries"
                      checked={filters.salaries}
                      onCheckedChange={(checked) => handleFilterChange("salaries", checked as boolean)}
                    />
                    <label htmlFor="salaries" className={`text-sm font-medium ${filters.salaries ? "text-gray-900" : "text-gray-400"}`}>Salaries</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="supplies"
                      checked={filters.supplies}
                      onCheckedChange={(checked) => handleFilterChange("supplies", checked as boolean)}
                    />
                    <label htmlFor="supplies" className={`text-sm font-medium ${filters.supplies ? "text-gray-900" : "text-gray-400"}`}>Supplies</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="overhead"
                      checked={filters.overhead}
                      onCheckedChange={(checked) => handleFilterChange("overhead", checked as boolean)}
                    />
                    <label htmlFor="overhead" className={`text-sm font-medium ${filters.overhead ? "text-gray-900" : "text-gray-400"}`}>Overhead</label>
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
                <h2 className="text-lg font-medium text-gray-700 mb-1">Total Expenses</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : `$${(totalExpenses || 0).toLocaleString()}`}
                </div>
              </div>
              <div className="flex flex-col items-center flex-1">
                <h2 className="text-lg font-medium text-gray-700 mb-1">Expense Ratio</h2>
                <div className="text-5xl md:text-7xl font-bold text-gray-900 leading-none">
                  {loading ? "--" : `${expenseRatio}%`}
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
                  <span>Utilities</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span>Salaries</span>
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
                  <Area key="area-utilities" type="monotone" dataKey="utilities" name="Utilities Area" stroke="#F87171" fill="#F87171" fillOpacity={0.5} />
                  <Area key="area-salaries" type="monotone" dataKey="salaries" name="Salaries Area" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.4} />
                  <Line key="line-utilities" type="monotone" dataKey="utilities" name="Utilities Line" stroke="#F87171" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#F87171', strokeWidth: 2 }} />
                  <Line key="line-salaries" type="monotone" dataKey="salaries" name="Salaries Line" stroke="#FBBF24" strokeWidth={2} dot={{ r: 6, fill: '#fff', stroke: '#FBBF24', strokeWidth: 2 }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {/* Bottom Left: Line Chart with Conditional Styling */}
          <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="text-xs text-gray-500">Monthly Expenses Trend</div>
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
              <div className="text-xs text-gray-500">Expenses vs Budget</div>
            </CardHeader>
            <CardContent className="p-2 flex-1 flex flex-col justify-center">
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <LineChart data={dualLineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="expenses" stroke="#F87171" strokeWidth={2} dot={false} name="Expenses" />
                  <Line type="monotone" dataKey="budget" stroke="#34D399" strokeWidth={2} dot={false} name="Budget" />
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