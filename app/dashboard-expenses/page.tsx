import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Home as HomeIcon, TrendingDown, Percent } from "lucide-react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

function AreaChartPlaceholder({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg viewBox="0 0 200 60" className="w-full h-20">
        <polygon points="0,50 20,40 40,45 60,30 80,35 100,20 120,25 140,10 160,20 180,10 200,30 200,60 0,60" fill="#fbbf24" opacity="0.15" />
        <polyline points="0,50 20,40 40,45 60,30 80,35 100,20 120,25 140,10 160,20 180,10 200,30" fill="none" stroke="#fbbf24" strokeWidth="2" />
      </svg>
      {label && <span className="text-gray-500 text-xs mt-1">{label}</span>}
    </div>
  );
}

function BarChartWithLabels({ bars, months, label }: { bars: number[]; months: string[]; label?: string }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full items-end justify-between h-24">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-col items-center w-6">
            <div style={{ height: `${h}px` }} className="w-4 bg-yellow-400 rounded-t" />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-between text-gray-500 text-xs mt-1 px-1">
        {months.map((m, i) => (
          <span key={i} className="w-6 text-center">{m}</span>
        ))}
      </div>
      {label && <span className="text-gray-500 text-xs mt-2">{label}</span>}
    </div>
  );
}

const topExpenses = [
  { name: "Utilities", amount: "$1,200" },
  { name: "Salaries", amount: "$3,500" },
  { name: "Supplies", amount: "$2,100" },
];
const recentExpenses = [
  { id: "EXP-001", date: "2024-06-01", amount: "-$500", desc: "Electricity Bill" },
  { id: "EXP-002", date: "2024-06-02", amount: "-$1,200", desc: "Salary Payment" },
  { id: "EXP-003", date: "2024-06-03", amount: "-$300", desc: "Office Supplies" },
  { id: "EXP-004", date: "2024-06-04", amount: "-$400", desc: "Internet Bill" },
];
const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const barHeights = [40, 55, 30, 70, 60, 90, 50, 80, 65, 75, 45, 100];

export default function DashboardExpensesPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 mt-6 mb-4">
        <Card className="bg-white border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 shadow-sm">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-medium text-gray-700 text-sm">Filters</span>
            <Label className="flex items-center gap-1 text-gray-600 text-xs">
              <Input type="checkbox" className="mr-1 h-3 w-3" /> Last 30 days
            </Label>
            <Label className="flex items-center gap-1 text-gray-600 text-xs">
              <Input type="checkbox" className="mr-1 h-3 w-3" /> This year
            </Label>
            <Label className="flex items-center gap-1 text-gray-600 text-xs">
              <Input type="checkbox" className="mr-1 h-3 w-3" defaultChecked /> Major only
            </Label>
          </div>
          <div className="flex justify-end w-full md:w-auto">
            <Button size="sm" className="h-7 px-3 text-xs">Apply</Button>
          </div>
        </Card>
      </div>
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {/* Total Expenses */}
          <Card className="bg-white text-gray-900 border-gray-200 flex flex-col justify-between min-h-[220px] col-span-1 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <TrendingDown className="w-7 h-7 text-red-500" />
              <div>
                <CardDescription className="text-gray-500">Total Expenses</CardDescription>
                <CardTitle className="text-3xl">$18,400</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-red-600 text-base font-semibold">+8.2% this month</span>
              <AreaChartPlaceholder className="mt-2" label="Total Expenses" />
            </CardContent>
          </Card>
          {/* Expense Ratio */}
          <Card className="bg-white text-gray-900 border-gray-200 flex flex-col justify-between min-h-[220px] col-span-1 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Percent className="w-7 h-7 text-blue-500" />
              <div>
                <CardDescription className="text-gray-500">Expense Ratio</CardDescription>
                <CardTitle className="text-3xl">24.7%</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-blue-600 text-base font-semibold">-1.3% from last month</span>
              <AreaChartPlaceholder className="mt-2" label="Expense Ratio" />
            </CardContent>
          </Card>
          {/* Expenses Trend Chart */}
          <Card className="bg-white text-gray-900 border-gray-200 min-h-[260px] col-span-1 md:col-span-2 xl:col-span-1 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Expenses Trend</CardTitle>
              <CardDescription className="text-gray-500">Last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChartPlaceholder label="" />
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Expenses by Month */}
          <Card className="bg-white text-gray-900 border-gray-200 min-h-[280px] md:col-span-2 shadow-sm">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">Expenses by Month</CardTitle>
                <CardDescription className="text-gray-500">2024</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <BarChartWithLabels bars={barHeights} months={monthsArr} label="Monthly Expenses" />
            </CardContent>
          </Card>
          {/* Top Expenses */}
          <Card className="bg-white text-gray-900 border-gray-200 min-h-[220px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Top Expenses</CardTitle>
              <CardDescription className="text-gray-500">Top 3</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {topExpenses.map((p, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span className="font-medium text-gray-800 text-lg">{p.name}</span>
                    <span className="text-red-600 font-semibold text-lg">{p.amount}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {/* Recent Expenses */}
          <Card className="bg-white text-gray-900 border-gray-200 min-h-[220px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Recent Expenses</CardTitle>
              <CardDescription className="text-gray-500">Last 7 Days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-lg">
                  <thead>
                    <tr className="text-gray-500">
                      <th className="text-left font-normal">ID</th>
                      <th className="text-left font-normal">Date</th>
                      <th className="text-left font-normal">Description</th>
                      <th className="text-right font-normal">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentExpenses.map((txn, i) => (
                      <tr key={i} className="border-b border-gray-200 last:border-0">
                        <td>{txn.id}</td>
                        <td>{txn.date}</td>
                        <td>{txn.desc}</td>
                        <td className="text-red-600 text-right">{txn.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
} 