"use client"

import { ArrowLeft, ArrowDownLeft, ArrowUpRight, Building2, Landmark, Check, XCircle, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import BottomNavigation from "@/components/dashboard/BottomNavigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/authStore";
import { banks } from "@/lib/bankList";
const fallbackAccounts = [
  { id: "1", name: "Everyday Checking", accountNumber: "12347890", balance: 8547.32 },
  { id: "2", name: "Way2Save Savings", accountNumber: "12344321", balance: 24892.50 },
];

const Transfer = () => {
  const { accounts: userAccounts } = useAuthStore();
  const displayAccounts = userAccounts.length > 0 ? userAccounts : fallbackAccounts;
  
  const [transferType, setTransferType] = useState<"send" | "request">("send");
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState(displayAccounts[0]?.id || "");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [memo, setMemo] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFailedDialog, setShowFailedDialog] = useState(false);
  const [insufficientFundsError, setInsufficientFundsError] = useState(false);

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    if (cleaned.split(".").length <= 2) {
      setAmount(cleaned);
    }
  };

  const handleAccountNumberChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "").slice(0, 17);
    setAccountNumber(cleaned);
  };

  const handleRoutingNumberChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "").slice(0, 9);
    setRoutingNumber(cleaned);
  };

  const selectedFromAccount = displayAccounts.find(acc => acc.id === fromAccount);
  const selectedBankInfo = banks.find(bank => bank.id === selectedBank);
  
  const transferAmount = parseFloat(amount) || 0;
  const hasInsufficientFunds = transferType === "send" && selectedFromAccount && transferAmount > selectedFromAccount.balance;

  const isFormValid = 
    amount && 
    transferAmount > 0 && 
    selectedBank && 
    accountNumber.length >= 8 && 
    routingNumber.length === 9 &&
    !hasInsufficientFunds;

  const handleContinue = () => {
    if (hasInsufficientFunds) {
      setInsufficientFundsError(true);
      return;
    }
    setInsufficientFundsError(false);
    if (isFormValid) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmTransfer = () => {
    setIsProcessing(true);
    // Simulate processing then show failure
    setTimeout(() => {
      setIsProcessing(false);
      setShowFailedDialog(true);
    }, 2500);
  };

  const handleCloseFailedDialog = () => {
    setShowFailedDialog(false);
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <header className="px-5 pt-5 pb-6 animate-fade-up">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowConfirmation(false)} 
              className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Confirm Transfer</h1>
          </div>
        </header>

        <section className="px-5 mb-6 animate-fade-up stagger-1">
          <div className="banking-card text-center py-8">
            <p className="text-sm text-gray-500mb-2">You're sending</p>
            <p className="text-4xl font-bold text-foreground">
              ${parseFloat(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </section>

        <section className="px-5 mb-6 animate-fade-up stagger-2">
          <div className="bg-white rounded-2xl p-5 shadow-card space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-500">From</span>
              <div className="text-right">
                <p className="font-medium">{selectedFromAccount?.name}</p>
                <p className="text-sm text-gray-500">••••{selectedFromAccount?.accountNumber?.slice(-4) || ''}</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-500">To Bank</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedBankInfo?.logo}</span>
                <span className="font-medium">{selectedBankInfo?.name}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-500">Account Number</span>
              <span className="font-medium">••••{accountNumber.slice(-4)}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-500">Routing Number</span>
              <span className="font-medium">{routingNumber}</span>
            </div>

            {memo && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-500">Memo</span>
                <span className="font-medium">{memo}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500">Transfer Fee</span>
              <span className="font-medium text-[#1fad53]">Free</span>
            </div>
          </div>
        </section>

        <section className="px-5 mb-4 animate-fade-up stagger-3">
          <div className="bg-[#da1b28]/10 rounded-2xl p-4 flex items-start gap-3">
            <div className="p-1 rounded-full bg-[#da1b28]">
              <Check className="w-4 h-4 text-[#da1b28]-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Estimated Arrival</p>
              <p className="text-sm text-gray-500">1-3 business days</p>
            </div>
          </div>
        </section>

        <section className="px-5 space-y-3 animate-fade-up stagger-4">
          <button
            onClick={handleConfirmTransfer}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl gradient-primary text-[#da1b28]-foreground font-semibold text-lg transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm & Transfer"
            )}
          </button>
          <button
            onClick={() => setShowConfirmation(false)}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-[#da1b28] text-foreground font-semibold text-lg transition-colors hover:bg-[#da1b28]/80 active:scale-[0.98] disabled:opacity-50"
          >
            Cancel
          </button>
        </section>

        <Dialog open={showFailedDialog} onOpenChange={setShowFailedDialog}>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader className="text-center items-center">
              <div className="p-4 rounded-full bg-[#ef4343]/10 mb-4">
                <XCircle className="w-12 h-12 text-[#ef4343]" />
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">Transfer Failed</DialogTitle>
              <DialogDescription className="text-gray-500mt-2">
                We couldn't complete your transfer at this time.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-[#da1b28] rounded-md p-4 mt-4">
              <p className="text-sm font-medium text-foreground mb-1">Reason:</p>
              <p className="text-sm text-gray-500">
                The recipient's bank account could not be verified. Please double-check the account number and routing number, then try again.
              </p>
            </div>
            <button
              onClick={handleCloseFailedDialog}
              className="w-full mt-6 py-4 rounded-2xl gradient-primary text-[#da1b28]-foreground font-semibold text-lg transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              Try Again
            </button>
          </DialogContent>
        </Dialog>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-5 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Bank Transfer</h1>
        </div>
      </header>

      <section className="px-5 mb-6 animate-fade-up stagger-2">
        <div className={`banking-card text-center py-8 ${hasInsufficientFunds ? 'border-2 border-destructive' : ''}`}>
          <p className="text-sm text-gray-500mb-2">Enter Amount</p>
          <div className="flex items-center justify-center gap-1">
            <span className={`text-4xl font-bold ${hasInsufficientFunds ? 'text-[#ef4343]' : 'text-foreground'}`}>$</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                handleAmountChange(e.target.value);
                setInsufficientFundsError(false);
              }}
              placeholder="0.00"
              className={`text-4xl font-bold bg-transparent outline-none w-40 text-center placeholder:text-gray-500/50 ${hasInsufficientFunds ? 'text-[#ef4343]' : 'text-foreground'}`}
            />
          </div>
          {hasInsufficientFunds && (
            <div className="flex items-center justify-center gap-2 mt-3 text-[#ef4343]">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm font-medium">Insufficient balance. Available: ${selectedFromAccount?.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-3">
        <h2 className="text-sm font-medium text-gray-500mb-3">From Account</h2>
        <div className="space-y-2 mt-3">
          {displayAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => {
                setFromAccount(account.id);
                setInsufficientFundsError(false);
              }}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${
                fromAccount === account.id
                  ? "bg-[#da1b28]/10 border-2 border-[#da1b28]"
                  : "bg-white shadow-card border-2 border-transparent"
              }`}
            >
              <div className={`p-2.5 rounded-md ${fromAccount === account.id ? "bg-[#da1b28] text-white" : "bg-[#da1b28] text-white"}`}>
                <Building2 className="w-5 h-5" />
              </div>
              <div className={`flex-1 text-left`}>
                <p className="font-medium">{account.name}</p>
                <p className="text-sm text-gray-500">••••{account.accountNumber.slice(-4)}</p>
              </div>
              <p className={`font-semibold`}>
                ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-4">
        <h2 className="text-sm font-medium text-gray-500mb-3">Recipient Details</h2>
        <div className="space-y-4 mt-3">
          <div>
            <label className="text-xs font-medium text-gray-500mb-1.5 block mb-2">Select Bank</label>
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger className="w-full py-5 rounded-md bg-white border-gray-200">
                <div className="flex items-center gap-3">
                  <Landmark className="w-5 h-5 text-gray-500" />
                  <SelectValue placeholder="Choose recipient's bank" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 z-50">
                {banks.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id} className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{bank.logo}</span>
                      <span>{bank.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500mb-1.5 block mb-2">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => handleAccountNumberChange(e.target.value)}
              placeholder="Enter account number"
              className="w-full px-4 py-3.5 rounded-md bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500mb-1.5 block mb-2">Routing Number</label>
            <input
              type="text"
              value={routingNumber}
              onChange={(e) => handleRoutingNumberChange(e.target.value)}
              placeholder="9-digit routing number"
              maxLength={9}
              className="w-full px-4 py-3.5 rounded-md bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-gray-500"
            />
            {routingNumber && routingNumber.length < 9 && (
              <p className="text-xs text-gray-500mt-1">{9 - routingNumber.length} digits remaining</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500mb-1.5 block mb-2">Memo (Optional)</label>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="What's this transfer for?"
              className="w-full px-4 py-3.5 rounded-md bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-gray-500"
            />
          </div>
        </div>
      </section>

      <section className="px-5 animate-fade-up stagger-5">
        <button
          onClick={handleContinue}
          disabled={!isFormValid}
          className="w-full py-4 rounded-2xl text-white gradient-primary font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          Continue
        </button>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Transfer;
