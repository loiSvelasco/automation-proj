"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const systemsData = [
  {
    title: "Business Settings",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    title: "Backup",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    title: "Restore",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
	{
    title: "Archive",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
];

const ITEMS_PER_PAGE = 3;

export default function systemMain() {
    const [currentPage, setCurrentPage] = React.useState(0);
  
    const totalPages = Math.ceil(systemsData.length / ITEMS_PER_PAGE);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const visibleItems = systemsData.slice(startIndex, endIndex);
  
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
    <main className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Mobile view: 2 cols x 3 rows, no carousel */}
        <div className="md:hidden w-full max-w-5xl grid grid-cols-2 gap-4">
          {systemsData.map((item) => (
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
  );
} 