import { cn } from "@/lib/utils";

export interface HeaderProps {
  welcomeMessage?: string;
  navLinks?: { name: string; active: boolean }[];
}

const defaultNavLinks = [
  { name: "Dashboard", active: true },
  { name: "Stocks", active: false },
  { name: "Sales", active: false },
  { name: "Operations", active: false },
  { name: "Reports", active: false },
  { name: "Backup/Restore", active: false },
  { name: "Logout", active: false },
];

export function Header({ welcomeMessage = "Welcome Juan!", navLinks = defaultNavLinks }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 border-b bg-white">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center">Logo</div>
        <span className="text-gray-700 text-lg font-medium">{welcomeMessage}</span>
      </div>
      <nav className="flex gap-4 border-b w-full justify-center">
        {navLinks.map((link) => (
          <button
            key={link.name}
            className={cn(
              "px-3 py-2 border-b-2 text-base font-medium transition-colors",
              link.active ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
            )}
          >
            {link.name}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header; 