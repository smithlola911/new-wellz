import { useRef } from "react";
import AccountCard from "./AccountCard";
import { useAuthStore } from "@/store/authStore";

const AccountsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { accounts } = useAuthStore();

  if (accounts.length === 0) {
    return (
      <section className="py-4 px-5 animate-fade-up stagger-1">
        <h2 className="text-lg font-semibold text-foreground mb-4">My Accounts</h2>
        <div className="banking-card p-6! text-center">
          <p className="text-gray-500">No accounts found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 animate-fade-up stagger-1">
      <div className="px-5 flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">My Accounts</h2>
        <div className="flex gap-1.5">
          {accounts.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === 0 ? "bg-[#da1b28]" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-5 pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {accounts.map((account) => (
          <div key={account.id} className="snap-start shrink-0 pl-5">
            <AccountCard
              type={account.type}
              name={account.name}
              accountNumber={account.accountNumber}
              balance={account.balance}
              // available={account.available}
              isPrimary={account.isPrimary}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccountsCarousel;
