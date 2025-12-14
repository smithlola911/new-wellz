import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface AccountCardProps {
  type: "checking" | "savings" | "credit";
  name: string;
  accountNumber: string;
  balance: number;
  available?: number;
  isPrimary?: boolean;
}

const AccountCard = ({ type, name, accountNumber, balance, available, isPrimary }: AccountCardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const maskedAccount = `••••${accountNumber.slice(-4)}`;

  const cardStyles = isPrimary
    ? "gradient-primary text-white"
    : "bg-white text-card-foreground shadow-card";

  const labelStyles = isPrimary ? "text-white/70" : "text-gray-500";
  const chevronBg = isPrimary ? "bg-white/20" : "bg-[#da1b28]";

  return (
    <div className={`banking-card min-w-[280px] ${cardStyles} ${isPrimary ? "shadow-none" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wider ${labelStyles}`}>{type}</p>
          <p className="font-semibold mt-0.5">{name}</p>
        </div>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className={`p-1.5 rounded-full ${chevronBg} transition-colors`}
        >
          {showBalance ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="mb-4">
        <p className={`text-xs ${labelStyles}`}>Current Balance</p>
        <p className="text-3xl font-bold text-balance">
          {showBalance ? formatCurrency(balance) : "••••••"}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-current/10">
        <div>
          <p className={`text-xs ${labelStyles}`}>Account</p>
          <p className="text-sm font-medium">{maskedAccount}</p>
        </div>
        {available !== undefined && (
          <div className="text-right">
            <p className={`text-xs ${labelStyles}`}>Available</p>
            <p className="text-sm font-medium">
              {showBalance ? formatCurrency(available) : "••••"}
            </p>
          </div>
        )}
        {/* <button className={`p-2 rounded-full ${chevronBg} ml-2`}>
          <ChevronRight className="w-4 h-4" />
        </button> */}
      </div>
    </div>
  );
};

export default AccountCard;
