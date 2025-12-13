import { ArrowLeft, Camera, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import BottomNavigation from "@/components/dashboard/BottomNavigation";
import Link from "next/link";

const accounts = [
  { id: 1, name: "Everyday Checking", number: "****4444", balance: 8547.32 },
  { id: 2, name: "Savings Account", number: "****7890", balance: 15234.50 },
];

const Deposit = () => {
  const [step, setStep] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [frontCaptured, setFrontCaptured] = useState(false);
  const [backCaptured, setBackCaptured] = useState(false);

  const handleCapture = (side: "front" | "back") => {
    if (side === "front") setFrontCaptured(true);
    else setBackCaptured(true);
  };

  const canSubmit = selectedAccount && amount && frontCaptured && backCaptured;

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-12 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Mobile Deposit</h1>
        </div>
      </header>

      <section className="px-5 mb-6 animate-fade-up stagger-1">
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${
                s <= step ? "bg-[#da1b28]" : "bg-border"
              }`}
            />
          ))}
        </div>
      </section>

      {step === 1 && (
        <>
          <section className="px-5 mb-6 animate-fade-up stagger-2">
            <h2 className="text-lg font-semibold mb-4">Select Account</h2>
            <div className="space-y-3">
              {accounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => setSelectedAccount(account.id)}
                  className={`w-full banking-card flex items-center justify-between text-left transition-all ${
                    selectedAccount === account.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium text-foreground">{account.name}</p>
                    <p className="text-sm text-gray-500">{account.number}</p>
                  </div>
                  <p className="font-semibold text-foreground">
                    ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section className="px-5 mb-6 animate-fade-up stagger-3">
            <h2 className="text-lg font-semibold mb-4">Enter Amount</h2>
            <div className="banking-card text-center">
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
              <p className="text-xs text-gray-500mt-2">Daily limit: $10,000</p>
            </div>
          </section>

          <section className="px-5 animate-fade-up stagger-4">
            <button
              onClick={() => setStep(2)}
              disabled={!selectedAccount || !amount}
              className="w-full py-4 rounded-2xl gradient-primary text-[#da1b28]-foreground font-semibold disabled:opacity-50"
            >
              Continue
            </button>
          </section>
        </>
      )}

      {step === 2 && (
        <>
          <section className="px-5 mb-6 animate-fade-up">
            <div className="banking-card mb-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-warning" />
                <p className="text-sm text-gray-500">
                  Position check on a flat, dark surface with good lighting
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div
                onClick={() => handleCapture("front")}
                className={`banking-card flex flex-col items-center justify-center py-8 cursor-pointer transition-all ${
                  frontCaptured ? "border-2 border-success" : "border-2 border-dashed border-gray-200"
                }`}
              >
                {frontCaptured ? (
                  <>
                    <CheckCircle className="w-12 h-12 text-[#1fad53] mb-2" />
                    <p className="font-medium text-[#1fad53]">Front Captured</p>
                  </>
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-gray-500mb-2" />
                    <p className="font-medium text-gray-500">Tap to capture front</p>
                  </>
                )}
              </div>

              <div
                onClick={() => handleCapture("back")}
                className={`banking-card flex flex-col items-center justify-center py-8 cursor-pointer transition-all ${
                  backCaptured ? "border-2 border-success" : "border-2 border-dashed border-gray-200"
                }`}
              >
                {backCaptured ? (
                  <>
                    <CheckCircle className="w-12 h-12 text-[#1fad53] mb-2" />
                    <p className="font-medium text-[#1fad53]">Back Captured</p>
                  </>
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-gray-500mb-2" />
                    <p className="font-medium text-gray-500">Tap to capture back</p>
                  </>
                )}
              </div>
            </div>
          </section>

          <section className="px-5 animate-fade-up stagger-2">
            <button
              onClick={() => setStep(3)}
              disabled={!frontCaptured || !backCaptured}
              className="w-full py-4 rounded-2xl gradient-primary text-[#da1b28]-foreground font-semibold disabled:opacity-50"
            >
              Submit Deposit
            </button>
          </section>
        </>
      )}

      {step === 3 && (
        <section className="px-5 animate-fade-up">
          <div className="banking-card text-center py-12">
            <div className="w-20 h-20 rounded-full bg-[#1fad53]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#1fad53]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Deposit Submitted!</h2>
            <p className="text-gray-500mb-6">
              Your deposit of ${parseFloat(amount).toFixed(2)} is being processed
            </p>
            <div className="bg-[#da1b28] rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500">Estimated availability</p>
              <p className="font-semibold text-foreground">Within 1-2 business days</p>
            </div>
            <Link
              href="/"
              className="inline-block w-full py-4 rounded-2xl bg-white border border-gray-200 font-semibold text-foreground hover:bg-[#da1b28] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </section>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Deposit;
