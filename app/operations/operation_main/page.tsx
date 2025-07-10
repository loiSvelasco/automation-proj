"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const operationsData = [
  {
    title: "Merchants",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    link: "/operations/merchants"
  },
  {
    title: "Products",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    link: "/operations/products"
  },
  {
    title: "Price Adjustments",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    link: "/operations/price-adjustments"
  },
];

export default function OperationsMain() {
  const router = useRouter();
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {operationsData.map((item) => (
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
              <Button 
                className="mt-4 w-fit"
                onClick={() => router.push(item.link)}
              >Go</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
} 