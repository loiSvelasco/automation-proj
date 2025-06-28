'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const data = [
  {
    title: "Merchants",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    title: "Products",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    title: "Profit",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
];

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const navItems = [
    "Dashboard",
    "Stocks",
    "Sales",
    "Operations",
    "Reports",
    "Backup/Restore",
    "Logout",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center">
            Logo
          </div>
          <span>Welcome Juan!</span>
        </div>
        <nav className="flex gap-4 border-b w-full justify-center">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={cn(
                "px-3 py-2 border-b-2",
                active === item ? "border-black" : "border-transparent"
              )}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
          {data.map((item) => (
            <Card key={item.title} className="flex flex-col">
              <div className="h-40 bg-gray-300" />
              <CardContent className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
                <Button className="mt-4 w-fit">View</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="w-3 h-3 rounded-full bg-gray-500" />
          ))}
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-gray-600 space-x-4">
        {data.map((item) => (
          <span key={item.title}>{item.title}</span>
        ))}
        <div className="mt-2">© 2025 3S and R Frozen Meat Products Training Inc.</div>
      </footer>
    </div>
  );
}
