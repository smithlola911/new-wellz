import { ArrowLeft, Zap, Wifi, Droplets, Phone, Home, CreditCard, Plus, Calendar } from "lucide-react";
import { useState } from "react";
import BottomNavigation from "@/components/dashboard/BottomNavigation";
import Link from "next/link";

const billers = [
  { id: 1, name: "Electric Company", icon: Zap, amount: 124.50, dueDate: "Dec 15", category: "Utilities" },
  { id: 2, name: "Internet Provider", icon: Wifi, amount: 89.99, dueDate: "Dec 18", category: "Utilities" },
  { id: 3, name: "Water Services", icon: Droplets, amount: 45.00, dueDate: "Dec 20", category: "Utilities" },
  { id: 4, name: "Phone Bill", icon: Phone, amount: 65.00, dueDate: "Dec 22", category: "Telecom" },
  { id: 5, name: "Rent", icon: Home, amount: 1500.00, dueDate: "Jan 1", category: "Housing" },
  { id: 6, name: "Credit Card", icon: CreditCard, amount: 350.00, dueDate: "Dec 25", category: "Finance" },
];

const scheduledPayments = [
  { id: 1, name: "Netflix", amount: 15.99, date: "Dec 10" },
  { id: 2, name: "Spotify", amount: 9.99, date: "Dec 12" },
  { id: 3, name: "Gym Membership", amount: 49.00, date: "Dec 15" },
];

const PayBills = () => {
  const [selectedBill, setSelectedBill] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-12 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Pay Bills</h1>
        </div>
      </header>

      <section className="px-5 mb-6 animate-fade-up stagger-1">
        <div className="banking-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Total Due This Month</h2>
            <span className="text-xs text-gray-500">6 bills</span>
          </div>
          <p className="text-3xl font-bold text-foreground">
            ${billers.reduce((sum, b) => sum + b.amount, 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <button className="mt-4 w-full py-3 rounded-xl gradient-primary text-[#da1b28]-foreground font-medium">
            Pay All Bills
          </button>
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-500">Upcoming Bills</h2>
          <button className="text-sm text-[#da1b28] font-medium">See All</button>
        </div>
        <div className="space-y-3">
          {billers.map((bill) => (
            <button
              key={bill.id}
              onClick={() => setSelectedBill(selectedBill === bill.id ? null : bill.id)}
              className={`w-full banking-card flex items-center gap-4 text-left transition-all ${
                selectedBill === bill.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="p-3 rounded-xl bg-[#da1b28]/10">
                <bill.icon className="w-5 h-5 text-[#da1b28]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{bill.name}</p>
                <p className="text-sm text-gray-500">Due {bill.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  ${bill.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#da1b28] text-gray-500">
                  {bill.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-3">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-medium text-gray-500">Scheduled Payments</h2>
        </div>
        <div className="banking-card !p-0 overflow-hidden divide-y divide-border">
          {scheduledPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-foreground">{payment.name}</p>
                <p className="text-sm text-gray-500">{payment.date}</p>
              </div>
              <p className="font-medium text-foreground">${payment.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 animate-fade-up stagger-4">
        <button className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#da1b28]/5 transition-all">
          <Plus className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-500">Add New Biller</span>
        </button>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default PayBills;
