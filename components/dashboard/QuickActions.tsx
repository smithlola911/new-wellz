"use client";

import Link from "next/link";
import {
  ArrowLeftRight,
  CreditCard,
  Wallet,
} from "lucide-react";

const actions = [
  // { icon: Send, label: "Send", color: "bg-[#da1b28]/10 text-[#da1b28]", path: "/send" },
  { icon: ArrowLeftRight, label: "Transfer", color: "bg-[#e7b00833] text-accent-foreground", path: "/transfer" },
  // { icon: Receipt, label: "Pay Bills", color: "bg-[#1fad53]/10 text-[#1fad53]", path: "/pay-bills" },
  { icon: CreditCard, label: "Cards", color: "bg-[#e7b00833] text-accent-foreground", path: "/cards" },
  { icon: Wallet, label: "Budget", color: "bg-[#da1b28]/10 text-[#da1b28]", path: "/budget" },
];

export default function QuickActions() {
  return (
    <section className="px-5 py-4 animate-fade-up stagger-2">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>

      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <Link
            key={action.label}
            href={action.path}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white transition-all hover:-translate-y-0.5 active:scale-95"
            style={{ animationDelay: `${index * 0.03}s` }}
          >
            <div className={`p-3 rounded-xl ${action.color}`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
