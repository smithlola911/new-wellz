import { ArrowLeft, Search, User, Star, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BottomNavigation from "@/components/dashboard/BottomNavigation";

const recentContacts = [
  { id: 1, name: "John Smith", email: "john.s@email.com", avatar: "JS", favorite: true },
  { id: 2, name: "Emily Davis", email: "emily.d@email.com", avatar: "ED", favorite: true },
  { id: 3, name: "Mike Wilson", email: "mike.w@email.com", avatar: "MW", favorite: false },
  { id: 4, name: "Sarah Connor", email: "sarah.c@email.com", avatar: "SC", favorite: false },
  { id: 5, name: "Alex Johnson", email: "alex.j@email.com", avatar: "AJ", favorite: true },
];

const Send = () => {
  const [amount, setAmount] = useState("");
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = recentContacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favorites = filteredContacts.filter((c) => c.favorite);
  const others = filteredContacts.filter((c) => !c.favorite);

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-12 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Send Money</h1>
        </div>
      </header>

      <section className="px-5 mb-6 animate-fade-up stagger-1">
        <div className="banking-card text-center">
          <p className="text-sm text-gray-500mb-2">Amount to Send</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-3xl font-bold text-foreground">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-4xl font-bold text-foreground bg-transparent border-none outline-none w-40 text-center"
            />
          </div>
          <p className="text-xs text-gray-500mt-2">Available: $8,547.32</p>
        </div>
      </section>

      <section className="px-5 mb-4 animate-fade-up stagger-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary outline-none transition-colors"
          />
        </div>
      </section>

      {favorites.length > 0 && (
        <section className="px-5 mb-4 animate-fade-up stagger-3">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-warning" />
            <h2 className="text-sm font-medium text-gray-500">Favorites</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {favorites.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl min-w-[80px] transition-all ${
                  selectedContact === contact.id
                    ? "bg-[#da1b28] text-[#da1b28]-foreground"
                    : "bg-white hover:bg-[#da1b28]"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                    selectedContact === contact.id
                      ? "bg-[#da1b28]-foreground/20"
                      : "gradient-primary text-[#da1b28]-foreground"
                  }`}
                >
                  {contact.avatar}
                </div>
                <span className="text-xs font-medium truncate w-full text-center">
                  {contact.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 animate-fade-up stagger-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-medium text-gray-500">Recent</h2>
        </div>
        <div className="banking-card !p-0 overflow-hidden divide-y divide-border">
          {others.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`w-full flex items-center gap-4 p-4 transition-colors text-left ${
                selectedContact === contact.id ? "bg-[#da1b28]/10" : "hover:bg-[#da1b28]/50"
              }`}
            >
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-[#da1b28]-foreground font-bold">
                {contact.avatar}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.email}</p>
              </div>
              {selectedContact === contact.id && (
                <div className="w-6 h-6 rounded-full bg-[#da1b28] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#da1b28]-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 py-6 animate-fade-up stagger-5">
        <button
          disabled={!selectedContact || !amount}
          className="w-full py-4 rounded-2xl gradient-primary text-[#da1b28]-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Send Money
        </button>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Send;
