"use client";

import { ArrowLeft, Plus, TrendingUp, TrendingDown, Target } from "lucide-react";
import Link from "next/link";
import BottomNavigation from "@/components/dashboard/BottomNavigation";

const budgets = [
  { id: 1, category: "Groceries", allocated: 600, spent: 423.5, color: "bg-[#1fad53]" },
  { id: 2, category: "Dining Out", allocated: 300, spent: 287.0, color: "bg-warning" },
  { id: 3, category: "Transportation", allocated: 200, spent: 156.8, color: "bg-[#da1b28]" },
  { id: 4, category: "Entertainment", allocated: 150, spent: 180.0, color: "bg-[#ef4343]" },
  { id: 5, category: "Shopping", allocated: 400, spent: 312.45, color: "bg-accent" },
  { id: 6, category: "Utilities", allocated: 250, spent: 189.99, color: "text-gray-500" },
];

export default function Budget() {
  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalAllocated - totalSpent;

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="px-5 pt-12 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Budget</h1>
        </div>
      </header>

      {/* Summary Card */}
      <section className="px-5 mb-6 animate-fade-up stagger-1">
        <div className="banking-card gradient-primary text-[#da1b28]-foreground">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span className="font-medium">December Budget</span>
            </div>
            <span className="text-sm opacity-80">
              {Math.round((totalSpent / totalAllocated) * 100)}% used
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs opacity-80">Allocated</p>
              <p className="text-lg font-bold">${totalAllocated.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Spent</p>
              <p className="text-lg font-bold">${totalSpent.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Remaining</p>
              <p className="text-lg font-bold">${remaining.toLocaleString()}</p>
            </div>
          </div>

          <div className="h-2 bg-[#da1b28]-foreground/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#da1b28]-foreground rounded-full transition-all"
              style={{ width: `${Math.min((totalSpent / totalAllocated) * 100, 100)}%` }}
            />
          </div>
        </div>
      </section>

      {/* Budget Categories */}
      <section className="px-5 mb-6 animate-fade-up stagger-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button className="text-sm text-[#da1b28] font-medium">Edit</button>
        </div>

        <div className="space-y-3">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.allocated) * 100;
            const isOver = percentage > 100;

            return (
              <div key={budget.id} className="banking-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${budget.color}`} />
                    <span className="font-medium text-foreground">{budget.category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isOver ? (
                      <TrendingUp className="w-4 h-4 text-[#ef4343]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-[#1fad53]" />
                    )}
                    <span className={`text-sm font-medium ${isOver ? "text-[#ef4343]" : "text-[#1fad53]"}`}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-end justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    ${budget.spent.toFixed(2)} of ${budget.allocated}
                  </span>

                  <span className={`text-sm font-medium ${isOver ? "text-[#ef4343]" : "text-foreground"}`}>
                    {isOver
                      ? `-$${(budget.spent - budget.allocated).toFixed(2)}`
                      : `$${(budget.allocated - budget.spent).toFixed(2)} left`}
                  </span>
                </div>

                <div className="h-2 bg-[#da1b28] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isOver ? "bg-[#ef4343]" : budget.color
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Add Category */}
      <section className="px-5 animate-fade-up stagger-3">
        <button className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 
        border-dashed border-gray-200 hover:border-primary hover:bg-[#da1b28]/5 transition-all">
          <Plus className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-500">Add Budget Category</span>
        </button>
      </section>

      <BottomNavigation />
    </div>
  );
}
