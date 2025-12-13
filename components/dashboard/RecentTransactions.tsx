"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TransactionItem from "./TransactionItem";
import { useAuthStore } from "@/store/authStore";

export default function RecentTransactions() {
  const { transactions } = useAuthStore();
  const recentTransactions = transactions.slice(0, 7);

  if (recentTransactions.length === 0) {
    return (
      <section className="px-5 py-4 animate-fade-up stagger-3">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Recent Transactions
        </h2>
        <div className="banking-card p-6! text-center">
          <p className="text-gray-500">No transactions yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 py-4 animate-fade-up stagger-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Recent Transactions
        </h2>

        <Link
          href="/transactions"
          className="flex items-center gap-1 text-sm font-medium text-[#da1b28] hover:text-[#da1b28]/80 transition-colors"
        >
          See All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="banking-card p-4!">
        {recentTransactions.map((tx) => (
          <TransactionItem
            key={tx.id}
            merchant={tx.merchant}
            category={tx.category}
            date={tx.date}
            amount={tx.amount}
            status={tx.status}
          />
        ))}
      </div>
    </section>
  );
}