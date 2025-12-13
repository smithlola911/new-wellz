"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  ArrowLeftRight,
  BarChart3,
  User
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CreditCard, label: "Cards", path: "/cards" },
  { icon: ArrowLeftRight, label: "Transfer", path: "/transfer" },
  { icon: BarChart3, label: "Insights", path: "/insights" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 px-2 pb-6 pt-2 backdrop-blur-lg bg-white/95 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.label}
              href={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? "text-[#da1b28]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? "bg-[#da1b28]/10" : ""
                }`}
              >
                <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={`text-xs ${isActive ? "font-semibold" : "font-medium"}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
