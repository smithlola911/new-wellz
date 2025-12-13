import { ArrowLeft, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import BottomNavigation from "@/components/dashboard/BottomNavigation";

const spendingCategories = [
  { name: "Food & Dining", amount: 842.50, percentage: 35, color: "bg-[#da1b28]" },
  { name: "Shopping", amount: 456.20, percentage: 19, color: "bg-accent" },
  { name: "Transportation", amount: 312.80, percentage: 13, color: "bg-[#1fad53]" },
  { name: "Entertainment", amount: 245.00, percentage: 10, color: "bg-[#da1b28]/60" },
  { name: "Utilities", amount: 198.50, percentage: 8, color: "bg-accent/60" },
  { name: "Other", amount: 356.00, percentage: 15, color: "text-gray-500" },
];

const monthlyData = [
  { month: "Jul", income: 6500, spending: 4200 },
  { month: "Aug", income: 6500, spending: 3800 },
  { month: "Sep", income: 7200, spending: 4500 },
  { month: "Oct", income: 6500, spending: 4100 },
  { month: "Nov", income: 6800, spending: 3900 },
  { month: "Dec", income: 7500, spending: 2411 },
];

const Insights = () => {
  const totalSpending = spendingCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const maxBarValue = Math.max(...monthlyData.map((d) => Math.max(d.income, d.spending)));

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-12 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Insights</h1>
        </div>
      </header>

      <section className="px-5 mb-6 animate-fade-up stagger-1">
        <div className="grid grid-cols-2 gap-3">
          <div className="banking-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-[#1fad53]/10">
                <TrendingUp className="w-4 h-4 text-[#1fad53]" />
              </div>
              <span className="text-xs font-medium text-gray-500">Income</span>
            </div>
            <p className="text-2xl font-bold text-foreground">$7,500</p>
            <p className="text-xs text-[#1fad53] font-medium">+12% from last month</p>
          </div>
          <div className="banking-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-[#da1b28]/10">
                <TrendingDown className="w-4 h-4 text-[#da1b28]" />
              </div>
              <span className="text-xs font-medium text-gray-500">Spending</span>
            </div>
            <p className="text-2xl font-bold text-foreground">$2,411</p>
            <p className="text-xs text-[#1fad53] font-medium">-38% from last month</p>
          </div>
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-2">
        <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
        <div className="banking-card">
          <div className="flex items-end justify-between gap-2 h-40">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 h-28 items-end">
                  <div
                    className="flex-1 bg-[#1fad53]/20 rounded-t"
                    style={{ height: `${(data.income / maxBarValue) * 100}%` }}
                  />
                  <div
                    className="flex-1 bg-[#da1b28]/40 rounded-t"
                    style={{ height: `${(data.spending / maxBarValue) * 100}%` }}
                  />
                </div>
                <span className={`text-xs ${index === monthlyData.length - 1 ? "font-semibold text-[#da1b28]" : "text-gray-500"}`}>
                  {data.month}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#1fad53]/20" />
              <span className="text-xs text-gray-500">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#da1b28]/40" />
              <span className="text-xs text-gray-500">Spending</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 animate-fade-up stagger-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Spending by Category</h2>
          <span className="text-sm text-gray-500">December</span>
        </div>
        <div className="banking-card space-y-4">
          {spendingCategories.map((category) => (
            <div key={category.name} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${category.color}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm font-semibold">${category.amount.toFixed(2)}</span>
                </div>
                <div className="h-1.5 bg-[#da1b28] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color} rounded-full transition-all`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
            <span className="font-medium">Total Spending</span>
            <span className="font-bold text-lg">${totalSpending.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Insights;
