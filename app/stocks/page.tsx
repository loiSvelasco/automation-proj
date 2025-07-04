'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const data = [
  {
    title: "Items",
    description: "Manage all stock items in inventory.",
    link: "/stocks/items",
  },
  {
    title: "Receiving",
    description: "Record incoming stock deliveries.",
    link: "/stocks/receiving",
  },
  {
    title: "Inventory",
    description: "View current inventory levels and movement.",
    link: "/stocks/inventory",
  },
];

export default function Stocks() {
  const router = useRouter();

  return (
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
              <Button
                className="mt-4 w-fit"
                onClick={() => router.push(item.link)}
              >
                View
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* carousel page */}
      {/* <div className="flex justify-center mt-8 gap-2">
        {data.map((_, idx) => (
          <div key={idx} className="w-3 h-3 rounded-full bg-gray-500" />
        ))}
      </div> */}
    </main>
  );
}
