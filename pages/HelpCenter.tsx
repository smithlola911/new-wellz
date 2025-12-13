"use client"

import { ArrowLeft, Search, MessageCircle, Phone, Mail, ChevronRight, HelpCircle, CreditCard, ArrowLeftRight, Shield, Smartphone } from "lucide-react";
import { useState } from "react";
import BottomNavigation from "@/components/dashboard/BottomNavigation";
import Link from "next/link";

const faqCategories = [
  { id: 1, icon: CreditCard, title: "Cards & Payments", count: 12 },
  { id: 2, icon: ArrowLeftRight, title: "Transfers", count: 8 },
  { id: 3, icon: Shield, title: "Security", count: 15 },
  { id: 4, icon: Smartphone, title: "App & Account", count: 10 },
];

const popularQuestions = [
  { id: 1, question: "How do I freeze my card?", category: "Cards" },
  { id: 2, question: "What are the transfer limits?", category: "Transfers" },
  { id: 3, question: "How do I enable Face ID?", category: "Security" },
  { id: 4, question: "How do I dispute a transaction?", category: "Payments" },
  { id: 5, question: "How do I update my phone number?", category: "Account" },
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-12 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/more" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
        </div>
      </header>

      <section className="px-5 mb-6 animate-fade-up stagger-1">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary outline-none transition-colors"
          />
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-2">
        <h2 className="text-sm font-medium text-gray-500mb-3">Contact Us</h2>
        <div className="grid grid-cols-3 gap-3">
          <button className="banking-card flex flex-col items-center gap-2 py-4">
            <div className="p-3 rounded-xl bg-[#da1b28]/10">
              <MessageCircle className="w-5 h-5 text-[#da1b28]" />
            </div>
            <span className="text-sm font-medium text-foreground">Chat</span>
          </button>
          <button className="banking-card flex flex-col items-center gap-2 py-4">
            <div className="p-3 rounded-xl bg-[#1fad53]/10">
              <Phone className="w-5 h-5 text-[#1fad53]" />
            </div>
            <span className="text-sm font-medium text-foreground">Call</span>
          </button>
          <button className="banking-card flex flex-col items-center gap-2 py-4">
            <div className="p-3 rounded-xl bg-warning/10">
              <Mail className="w-5 h-5 text-warning" />
            </div>
            <span className="text-sm font-medium text-foreground">Email</span>
          </button>
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-3">
        <h2 className="text-sm font-medium text-gray-500mb-3">Browse Topics</h2>
        <div className="grid grid-cols-2 gap-3">
          {faqCategories.map((category) => (
            <button key={category.id} className="banking-card flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-[#da1b28]">
                <category.icon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{category.title}</p>
                <p className="text-sm text-gray-500">{category.count} articles</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 animate-fade-up stagger-4">
        <h2 className="text-sm font-medium text-gray-500mb-3">Popular Questions</h2>
        <div className="banking-card !p-0 overflow-hidden divide-y divide-border">
          {popularQuestions.map((faq) => (
            <button
              key={faq.id}
              className="w-full flex items-center justify-between p-4 hover:bg-[#da1b28]/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-foreground">{faq.question}</p>
                  <p className="text-sm text-gray-500">{faq.category}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          ))}
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default HelpCenter;
