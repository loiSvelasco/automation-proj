"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

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
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
            <Link href="/">
              <Image
                src="/logo.jpg"
                width={100}
                height={100}
                alt="3sandrlogo"
              />
            </Link>
          </div>
          <span>Welcome Juan!</span>
        </div>
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
                <Link href="#">Sales</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="#">Operations</Link>
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
                <Link href="#">Backup/Restore</Link>
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
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
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

        <div className="flex justify-center mt-8 gap-2">
          {data.map((_, idx) => (
            <div key={idx} className="w-3 h-3 rounded-full bg-gray-500" />
          ))}
        </div>
      </main>
      <footer className="p-4 text-sm text-gray-600 flex flex-col items-center">
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
                <Link href="#">Collection</Link>
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
