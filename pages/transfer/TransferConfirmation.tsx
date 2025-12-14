// TransferConfirmation.tsx
'use client';

import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { Account, Bank } from '@/lib/schemas';
import BottomNavigation from '@/components/dashboard/BottomNavigation';

interface TransferConfirmationProps {
  amount: string;
  selectedFromAccount: (Account & { id: string }) | undefined;
  selectedBankInfo: Bank | undefined;
  accountNumber: string;
  routingNumber: string;
  memo: string;
  isProcessing: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const TransferConfirmation = ({
  amount,
  selectedFromAccount,
  selectedBankInfo,
  accountNumber,
  routingNumber,
  memo,
  isProcessing,
  onConfirm,
  onCancel,
}: TransferConfirmationProps) => {
  const formattedAmount = parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 });
  const maskedAccountNumber = `••••${accountNumber.slice(-4)}`;

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-5 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Confirm Transfer</h1>
        </div>
      </header>

      <AmountDisplay amount={formattedAmount} />

      <ConfirmationDetails
        selectedFromAccount={selectedFromAccount}
        selectedBankInfo={selectedBankInfo}
        accountNumber={maskedAccountNumber}
        routingNumber={routingNumber}
        memo={memo}
      />

      <EstimatedArrival />

      <ActionButtons
        isProcessing={isProcessing}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />

      <BottomNavigation />
    </div>
  );
};

const AmountDisplay = ({ amount }: { amount: string }) => (
  <section className="px-5 mb-6 animate-fade-up stagger-1">
    <div className="banking-card text-center py-8">
      <p className="text-sm text-gray-500 mb-2">You're sending</p>
      <p className="text-4xl font-bold text-foreground">${amount}</p>
    </div>
  </section>
);

const ConfirmationDetails = ({
  selectedFromAccount,
  selectedBankInfo,
  accountNumber,
  routingNumber,
  memo,
}: {
  selectedFromAccount: (Account & { id: string }) | undefined;
  selectedBankInfo: Bank | undefined;
  accountNumber: string;
  routingNumber: string;
  memo: string;
}) => (
  <section className="px-5 mb-6 animate-fade-up stagger-2">
    <div className="bg-white rounded-2xl p-5 shadow-card space-y-4">
      <DetailRow label="From">
        <div className="text-right">
          <p className="font-medium">{selectedFromAccount?.name}</p>
          <p className="text-sm text-gray-500">••••{selectedFromAccount?.accountNumber?.slice(-4)}</p>
        </div>
      </DetailRow>

      <DetailRow label="To Bank">
        <span className="font-medium">{selectedBankInfo?.name}</span>
      </DetailRow>

      <DetailRow label="Account Number">
        <span className="font-medium">{accountNumber}</span>
      </DetailRow>

      <DetailRow label="Routing Number">
        <span className="font-medium">{routingNumber}</span>
      </DetailRow>

      {memo && (
        <DetailRow label="Memo">
          <span className="font-medium">{memo}</span>
        </DetailRow>
      )}
    </div>
  </section>
);

const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
    <span className="text-gray-500">{label}</span>
    {children}
  </div>
);

const EstimatedArrival = () => (
  <section className="px-5 mb-4 animate-fade-up stagger-3">
    <div className="bg-[#da1b28]/10 rounded-2xl p-4 flex items-start gap-3">
      <div className="p-1 rounded-full bg-[#da1b28]">
        <Check className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="font-medium text-foreground">Estimated Arrival</p>
        <p className="text-sm text-gray-500">1-3 business days</p>
      </div>
    </div>
  </section>
);

const ActionButtons = ({
  isProcessing,
  onConfirm,
  onCancel,
}: {
  isProcessing: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <section className="px-5 space-y-3 animate-fade-up stagger-4">
    <button
      onClick={onConfirm}
      disabled={isProcessing}
      className="w-full py-4 cursor-pointer rounded-2xl gradient-primary text-white font-semibold text-lg transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        'Confirm & Transfer'
      )}
    </button>
    <button
      onClick={onCancel}
      disabled={isProcessing}
      className="w-full py-4 cursor-pointer rounded-2xl bg-[#da1b28]/70 text-white font-semibold text-lg transition-colors hover:bg-[#da1b28] active:scale-[0.98] disabled:opacity-50"
    >
      Cancel
    </button>
  </section>
);

export default TransferConfirmation;