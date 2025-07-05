"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const data = [
  {
    title: "Merchants",
    description:
      "Registered merchant supplying quality meat products to our network of clients.",
  },
  {
    title: "Products",
    description:
      "Manage and track all available frozen meat products, including inventory details and product information",
  },
  {
    title: "Profit",
    description:
      "View and analyze profit data to monitor business growth and performance overtime",
  },
  {
    title: "Loss",
    description:
      "Track and review inventory losses to identify waste, spoilage, or shrinkage, helping improve efficiency and reduce costs.",
  },
  {
    title: "Collection",
    description:
      "Monitor and manage customer payments and collections to ensure steady cash flow and accurate financial records.",
  },
  {
    title: "Expenses",
    description:
      "Keep track of all operational costs to manage budgets effectively and maintain profitability.",
  },
];

const ITEMS_PER_PAGE = 3;

export default function LandingPage() {
  const [currentPage, setCurrentPage] = React.useState(0);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleItems = data.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-8 py-4 border-b">
        <div className="flex items-center gap-4 w-full justify-between sm:justify-start">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300 flex items-center justify-center">
              <Link href="/">
                <Image
                  src="/logo.jpg"
                  width={100}
                  height={100}
                  alt="3sandrlogo"
                />
              </Link>
            </div>
            <span className="text-sm sm:text-base">Welcome Juan!</span>
          </div>

          <div className="flex sm:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Menu</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerTitle className="sr-only">Menu</DrawerTitle>
                <nav className="flex flex-col gap-4 p-4">
                  <Link href="#" className="text-gray-800 text-lg">
                    Dashboard
                  </Link>
                  <Link href="/stocks" className="text-gray-800 text-lg">
                    Stocks
                  </Link>
                  <Link href="#" className="text-gray-800 text-lg">
                    Sales
                  </Link>
                  <Link href="#" className="text-gray-800 text-lg">
                    Operations
                  </Link>
                  <Link href="#" className="text-gray-800 text-lg">
                    Reports
                  </Link>
                  <Link href="#" className="text-gray-800 text-lg">
                    System
                  </Link>
                  <Link href="#" className="text-gray-800 text-lg">
                    Logout
                  </Link>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className="hidden sm:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/stocks">Stocks</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/sales">Sales</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/operations/operation_main">Operations</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#">Reports</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#">System</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#">Logout</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Mobile view: 2 cols x 3 rows, no carousel */}
        <div className="md:hidden w-full max-w-5xl grid grid-cols-2 gap-4">
          {data.map((item) => (
            <Card key={item.title} className="flex flex-col">
              <div className="h-40 overflow-hidden relative bg-gray-300">
                <Image
                  src="/logo.jpg"
                  alt="3sandrlogo"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
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

        {/* Desktop view: carousel */}
        <div className="hidden md:block relative w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 ease-in-out">
            {visibleItems.map((item) => (
              <Card key={item.title} className="flex flex-col">
                <div className="h-40 overflow-hidden relative bg-gray-300">
                  <Image
                    src="/logo.jpg"
                    alt="3sandrlogo"
                    width={500}
                    height={500}
                    className="object-contain"
                  />
                </div>
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

          <div className="absolute -left-14 top-1/2 transform -translate-y-1/2">
            <Button
              size="icon"
              className="w-14 h-14"
              variant="ghost"
              onClick={handlePrev}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
          </div>
          <div className="absolute -right-14 top-1/2 transform -translate-y-1/2">
            <Button
              size="icon"
              className="w-14 h-14"
              variant="ghost"
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentPage ? "bg-black" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="p-4 text-sm text-gray-600 flex flex-col items-center border-t">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/dashboard/merchants">Merchants</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/dashboard/products">Products</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/dashboard/profits">Profit</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/dashboard/loss">Loss</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/dashboard/collections">Collection</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/dashboard/expenses">Expenses</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="mt-2 text-center">
          © 2025 3S and R Frozen Meat Trading Inc.
        </div>
      </footer>
    </div>
  );
}
