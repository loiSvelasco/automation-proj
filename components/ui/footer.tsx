import { Home as HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FooterProps {
  year?: string;
  companyName?: string;
  navLinks?: { name: string; icon?: boolean; active?: boolean }[];
}

const defaultNavLinks = [
  { name: "Merchants", icon: false, active: false },
  { name: "Products", icon: false, active: false },
  { name: "Profit", icon: true, active: true },
  { name: "Loss", icon: false, active: false },
  { name: "Collection", icon: false, active: false },
  { name: "Expenses", icon: false, active: false },
];

export function Footer({ year = "2025", companyName = "Company Name", navLinks }: FooterProps) {
  const links = navLinks ?? defaultNavLinks;
  return (
    <footer className="w-full">
      <nav className="w-full border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 px-2 sm:px-4 py-3 overflow-x-auto">
          <span className="text-gray-500 mr-2">Navigation Controls</span>
          <button className="text-gray-500 hover:text-gray-900 flex items-center justify-center">
            <HomeIcon className="w-5 h-5" />
          </button>
          {links.map((link) => (
            <button
              key={link.name}
              className={cn(
                "px-4 py-2 text-base font-medium rounded transition-colors",
                link.active
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {link.name}
            </button>
          ))}
        </div>
      </nav>
      <div className="text-center text-xs text-gray-500 mt-4 mb-2">© {year} {companyName}</div>
    </footer>
  );
}

export default Footer; 