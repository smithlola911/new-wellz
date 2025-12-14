// TransferForm.tsx
'use client';

import { ArrowLeft, Building2, Landmark, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Account } from '@/lib/schemas';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { banks } from '@/lib/bankList';

interface TransferFormProps {
  state: {
    amount: string;
    accountNumber: string;
    routingNumber: string;
    memo: string;
    fromAccount: string;
    selectedBank: string;
    insufficientFundsError: boolean;
  };
  handlers: {
    setAmount: (val: string) => void;
    setFromAccount: (val: string) => void;
    setSelectedBank: (val: string) => void;
    setAccountNumber: (val: string) => void;
    setRoutingNumber: (val: string) => void;
    setMemo: (val: string) => void;
    setInsufficientFundsError: (val: boolean) => void;
  };
  validation: {
    isFormValid: boolean;
    hasInsufficientFunds: boolean;
  };
  selectedFromAccount: (Account & { id: string }) | undefined;
  displayAccounts?: (Account & { id: string })[];
  onContinue: () => void;
}

const TransferForm = ({
  state,
  handlers,
  validation,
  selectedFromAccount,
  displayAccounts = [],
  onContinue,
}: TransferFormProps) => {
  return (
    <>
      <header className="px-5 pt-5 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Bank Transfer</h1>
        </div>
      </header>

      <AmountInput
        amount={state.amount}
        hasError={validation.hasInsufficientFunds}
        availableBalance={selectedFromAccount?.balance}
        onChange={(val) => {
          handlers.setAmount(val);
          handlers.setInsufficientFundsError(false);
        }}
      />

      <FromAccountSection
        accounts={displayAccounts}
        selectedAccountId={state.fromAccount}
        onSelect={(id) => {
          handlers.setFromAccount(id);
          handlers.setInsufficientFundsError(false);
        }}
      />

      <RecipientDetailsSection
        selectedBank={state.selectedBank}
        accountNumber={state.accountNumber}
        routingNumber={state.routingNumber}
        memo={state.memo}
        onBankChange={handlers.setSelectedBank}
        onAccountNumberChange={handlers.setAccountNumber}
        onRoutingNumberChange={handlers.setRoutingNumber}
        onMemoChange={handlers.setMemo}
      />

      <section className="px-5 animate-fade-up stagger-5">
        <button
          onClick={onContinue}
          disabled={!validation.isFormValid}
          className="w-full py-4 rounded-2xl text-white gradient-primary font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          Continue
        </button>
      </section>
    </>
  );
};

const AmountInput = ({
  amount,
  hasError,
  availableBalance,
  onChange,
}: {
  amount: string;
  hasError: boolean;
  availableBalance?: number;
  onChange: (val: string) => void;
}) => (
  <section className="px-5 mb-6 animate-fade-up stagger-2">
    <div className={`banking-card text-center py-8 ${hasError ? 'border-2 border-destructive' : ''}`}>
      <p className="text-sm text-gray-500 mb-2">Enter Amount</p>
      <div className="flex items-center justify-center gap-1">
        <span className={`text-4xl font-bold ${hasError ? 'text-[#ef4343]' : 'text-foreground'}`}>
          $
        </span>
        <input
          type="text"
          value={amount}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className={`text-4xl font-bold bg-transparent outline-none w-40 text-center placeholder:text-gray-500/50 ${
            hasError ? 'text-[#ef4343]' : 'text-foreground'
          }`}
        />
      </div>
      {hasError && (
        <div className="flex items-center justify-center gap-2 mt-3 text-[#ef4343]">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm font-medium">
            Insufficient balance. Available: ${availableBalance?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      )}
    </div>
  </section>
);

const FromAccountSection = ({
  accounts,
  selectedAccountId,
  onSelect,
}: {
  accounts: (Account & { id: string })[];
  selectedAccountId: string;
  onSelect: (id: string) => void;
}) => (
  <section className="px-5 mb-6 animate-fade-up stagger-3">
    <h2 className="text-sm font-medium text-gray-500 mb-3">From Account</h2>
    <div className="space-y-2 mt-3">
      {accounts.map((account) => (
        <button
          key={account.id}
          onClick={() => onSelect(account.id)}
          className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${
            selectedAccountId === account.id
              ? 'bg-[#da1b28]/10 border-2 border-[#da1b28]'
              : 'bg-white shadow-card border-2 border-transparent'
          }`}
        >
          <div className="p-2.5 rounded-md bg-[#da1b28] text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">{account.name}</p>
            <p className="text-sm text-gray-500">••••{account.accountNumber.slice(-4)}</p>
          </div>
          <p className="font-semibold">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </button>
      ))}
    </div>
  </section>
);

const RecipientDetailsSection = ({
  selectedBank,
  accountNumber,
  routingNumber,
  memo,
  onBankChange,
  onAccountNumberChange,
  onRoutingNumberChange,
  onMemoChange,
}: {
  selectedBank: string;
  accountNumber: string;
  routingNumber: string;
  memo: string;
  onBankChange: (val: string) => void;
  onAccountNumberChange: (val: string) => void;
  onRoutingNumberChange: (val: string) => void;
  onMemoChange: (val: string) => void;
}) => (
  <section className="px-5 mb-6 animate-fade-up stagger-4">
    <h2 className="text-sm font-medium text-gray-500 mb-3">Recipient Details</h2>
    <div className="space-y-4 mt-3">
      <div>
        <label className="text-xs font-medium text-gray-500 mb-2 block">Select Bank</label>
        <Select value={selectedBank} onValueChange={onBankChange}>
          <SelectTrigger className="w-full py-5 rounded-md bg-white border-gray-200">
            <div className="flex items-center gap-3">
              <Landmark className="w-5 h-5 text-gray-500" />
              <SelectValue placeholder="Choose recipient's bank" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 z-50">
            {banks.map((bank) => (
              <SelectItem key={bank.id} value={bank.id} className="py-3">
                {bank.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <FormInput
        label="Account Number"
        value={accountNumber}
        onChange={onAccountNumberChange}
        placeholder="Enter account number"
      />

      <FormInput
        label="Routing Number"
        value={routingNumber}
        onChange={onRoutingNumberChange}
        placeholder="9-digit routing number"
        maxLength={9}
        helperText={routingNumber && routingNumber.length < 9 ? `${9 - routingNumber.length} digits remaining` : ''}
      />

      <FormInput
        label="Memo (Optional)"
        value={memo}
        onChange={onMemoChange}
        placeholder="What's this transfer for?"
      />
    </div>
  </section>
);

const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  maxLength?: number;
  helperText?: string;
}) => (
  <div>
    <label className="text-xs font-medium text-gray-500 mb-2 block">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full px-4 py-3.5 rounded-md bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-gray-500"
    />
    {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
  </div>
);

export default TransferForm;