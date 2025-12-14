"use client";

import { ArrowLeft, CreditCard, Lock, Unlock, Eye, EyeOff, Snowflake, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BottomNavigation from "@/components/dashboard/BottomNavigation";

const cards = [
  {
    id: 1,
    name: "Active Cash Card",
    type: "Credit",
    number: "5555 6666 7777 8888",
    expiry: "09/27",
    balance: 1245.8,
    limit: 5000,
    color: "gradient-primary",
    frozen: false,
  },
  {
    id: 2,
    name: "Everyday Checking",
    type: "Debit",
    number: "4111 2222 3333 4444",
    expiry: "12/26",
    balance: 8547.32,
    color: "bg-foreground",
    frozen: false,
  },
];

export default function Cards() {
  const [showNumbers, setShowNumbers] = useState<Record<number, boolean>>({});
  const [frozenCards, setFrozenCards] = useState<Record<number, boolean>>({});

  const toggleNumber = (id: number) => {
    setShowNumbers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFreeze = (id: number) => {
    setFrozenCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatCardNumber = (num: string, show: boolean) => {
    if (show) return num;
    return "•••• •••• •••• " + num.slice(-4);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="px-5 pt-12 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">My Cards</h1>
        </div>
      </header>

      {/* Cards List */}
      <section className="px-5 space-y-4 animate-fade-up stagger-1">
        {cards.map((card) => {
          const isFrozen = frozenCards[card.id];
          const showNumber = showNumbers[card.id];

          return (
            <div
              key={card.id}
              className={`relative rounded-3xl p-6 ${card.color} text-[#da1b28]-foreground overflow-hidden ${
                isFrozen ? "opacity-60" : ""
              }`}
            >
              {isFrozen && (
                <div className="absolute inset-0 bg-muted/30 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="flex items-center gap-2 bg-white text-foreground px-4 py-2 rounded-full">
                    <Snowflake className="w-4 h-4" />
                    <span className="font-medium text-sm">Card Frozen</span>
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-80">{card.type}</p>
                  <p className="font-semibold">{card.name}</p>
                </div>
                <CreditCard className="w-8 h-8 opacity-80" />
              </div>

              <p className="text-xl font-mono tracking-widest mb-6">{formatCardNumber(card.number, showNumber)}</p>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs opacity-80">Expires</p>
                  <p className="font-medium">{card.expiry}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-80">{card.type === "Credit" ? "Balance" : "Available"}</p>
                  <p className="font-semibold text-lg">
                    ${card.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Card Actions */}
      <section className="px-5 py-6 animate-fade-up stagger-2">
        <h2 className="text-lg font-semibold mb-4">Card Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {cards.map((card) => (
            <div key={card.id} className="space-y-2">
              <p className="text-xs text-gray-500font-medium">{card.name}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleNumber(card.id)}
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white transition-all text-sm font-medium"
                >
                  {showNumbers[card.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showNumbers[card.id] ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => toggleFreeze(card.id)}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all text-sm font-medium ${
                    frozenCards[card.id]
                      ? "bg-[#da1b28] text-[#da1b28]-foreground"
                      : "bg-white"
                  }`}
                >
                  {frozenCards[card.id] ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  {frozenCards[card.id] ? "Unfreeze" : "Freeze"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add New Card */}
      <section className="px-5 animate-fade-up stagger-3">
        <button className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#da1b28]/5 transition-all">
          <Plus className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-500">Add New Card</span>
        </button>
      </section>

      <BottomNavigation />
    </div>
  );
}
