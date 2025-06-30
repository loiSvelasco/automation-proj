"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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

      <main
        className={`flex-1 ${
          pathname === "/stocks"
            ? "flex flex-col items-center justify-center p-4"
            : "flex justify-center px-4 sm:px-6 lg:px-8"
        }`}
      >
        <div className="w-full max-w-7xl py-4 sm:py-8">{children}</div>
      </main>
      
      <footer className="p-4 text-sm text-gray-600 flex flex-col items-center gap-2">
      {pathname !== '/stocks' && (

        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap justify-center gap-2">
            {/* {["Items", "Receiving", "Inventory"].map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#">{item}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))} */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/stocks/items">Items</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/stocks/receiving">Receiving</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/stocks/receiving">Inventory</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      )}
        <div className="text-center">
          © 2025 3S and R Frozen Meat Trading Inc.
        </div>
      </footer>
    </div>
  );
}
