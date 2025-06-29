'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalendarDays, BarChart2, LineChart } from "lucide-react";
import * as React from "react";
import { Select } from "@/components/ui/select";

// Chart placeholders
function AreaChartPlaceholder({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg viewBox="0 0 200 60" className="w-full h-20">
        <polygon points="0,50 20,40 40,45 60,30 80,35 100,20 120,25 140,10 160,20 180,10 200,30 200,60 0,60" fill="#3b82f6" opacity="0.15" />
        <polyline points="0,50 20,40 40,45 60,30 80,35 100,20 120,25 140,10 160,20 180,10 200,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
      </svg>
      {label && <span className="text-gray-500 text-xs mt-1">{label}</span>}
    </div>
  );
}

function BarChartWithLabels({ bars, labels, label }: { bars: number[]; labels: string[]; label?: string }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full items-end justify-between h-24">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-col items-center w-6">
            <div style={{ height: `${h}px` }} className="w-4 bg-blue-400 rounded-t" />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-between text-gray-500 text-xs mt-1 px-1">
        {labels.map((m, i) => (
          <span key={i} className="w-6 text-center">{m}</span>
        ))}
      </div>
      {label && <span className="text-gray-500 text-xs mt-2">{label}</span>}
    </div>
  );
}

// Mock data for sales
const dailySales = [12, 18, 10, 22, 15, 20, 25];
const dailyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthlySales = [300, 450, 200, 600, 500, 800, 400, 700, 550, 650, 350, 900];
const monthlyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const yearlySales = [3200, 4100, 3900, 4700, 5200];
const yearlyLabels = ["2020", "2021", "2022", "2023", "2024"];

export default function CollectionsSalesPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 mt-6 mb-4">
        <Card className="bg-white border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 shadow-sm">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-medium text-gray-700 text-sm">Filters</span>
            <Label className="flex items-center gap-1 text-gray-600 text-xs">
              <Input type="checkbox" className="mr-1 h-3 w-3" defaultChecked /> Daily
            </Label>
            <Label className="flex items-center gap-1 text-gray-600 text-xs">
              <Input type="checkbox" className="mr-1 h-3 w-3" /> Monthly
            </Label>
            <Label className="flex items-center gap-1 text-gray-600 text-xs">
              <Input type="checkbox" className="mr-1 h-3 w-3" /> Yearly
            </Label>
          </div>
          <div className="flex justify-end w-full md:w-auto">
            <Button size="sm" className="h-7 px-3 text-xs">Apply</Button>
          </div>
        </Card>
      </div>
      <div className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {/* Daily Sales */}
          <Card className="bg-white text-gray-900 border-gray-200 flex flex-col justify-between min-h-[220px] col-span-1 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <CalendarDays className="w-7 h-7 text-blue-500" />
              <div>
                <CardDescription className="text-gray-500">Daily Sales</CardDescription>
                <CardTitle className="text-3xl">$2,150</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-blue-600 text-base font-semibold">+5.2% today</span>
              <BarChartWithLabels bars={dailySales} labels={dailyLabels} label="This Week" />
            </CardContent>
          </Card>
          {/* Monthly Sales */}
          <Card className="bg-white text-gray-900 border-gray-200 flex flex-col justify-between min-h-[260px] col-span-1 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <BarChart2 className="w-7 h-7 text-green-500" />
              <div>
                <CardDescription className="text-gray-500">Monthly Sales</CardDescription>
                <CardTitle className="text-3xl">$18,400</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-green-600 text-base font-semibold mb-2 block">+8.1% this year</span>
              <div className="w-full overflow-x-auto">
                <div className="min-w-[350px] sm:min-w-0">
                  <BarChartWithLabels
                    bars={monthlySales}
                    labels={monthlyLabels}
                    label="2024"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Yearly Sales */}
          <Card className="bg-white text-gray-900 border-gray-200 min-h-[220px] col-span-1 md:col-span-2 xl:col-span-1 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <LineChart className="w-7 h-7 text-purple-500" />
              <div>
                <CardDescription className="text-gray-500">Yearly Sales</CardDescription>
                <CardTitle className="text-3xl">$92,000</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-purple-600 text-base font-semibold">+11.3% this year</span>
              <AreaChartPlaceholder label="2020-2024" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
} 