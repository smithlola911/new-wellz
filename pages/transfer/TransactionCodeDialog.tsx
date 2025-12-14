// TransactionCodeDialog.tsx
'use client';

import { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface TransactionCodeDialogProps {
  open: boolean;
  onConfirm: (code: string) => boolean; // Returns true if valid, false if invalid
  onCancel: () => void;
  isProcessing: boolean;
}

const TransactionCodeDialog = ({
  open,
  onConfirm,
  onCancel,
  isProcessing,
}: TransactionCodeDialogProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleCodeChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '').slice(0, 4);
    setCode(cleaned);
  };

  const handleSubmit = () => {
    if (code.length !== 4) {
      setError('Please enter a 4-digit code');
      return;
    }
    const isValid = onConfirm(code);
    if (!isValid) {
      setError('Invalid transaction code. Please try again.');
    //   setCode('');
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isProcessing) {
      onCancel();
      setCode('');
      setError('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm mx-auto bg-white">
        <DialogHeader className="text-center items-center">
          <div className="p-4 rounded-full bg-[#da1b28]/10 mb-4">
            <Lock className="w-8 h-8 text-[#da1b28]" />
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            Verify Transfer
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-2">
            Enter your 4-digit transaction code to confirm this transfer
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">
              Transaction Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder="0000"
              maxLength={4}
              inputMode="numeric"
              disabled={isProcessing}
              className={`w-full px-4 py-4 text-2xl font-bold text-center rounded-md bg-white border-2 focus:ring-1 outline-none transition-all text-foreground placeholder:text-gray-400 disabled:opacity-50 ${
                error ? 'border-[#ef4343] focus:border-[#ef4343] focus:ring-[#ef4343]' : 'border-gray-200 focus:border-[#da1b28] focus:ring-[#da1b28]'
              }`}
            />
            {error && (
              <div className="flex items-center gap-2 mt-2 text-[#ef4343]">
                <AlertCircle className="w-4 h-4" />
                <p className="text-xs font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <button
            onClick={handleSubmit}
            disabled={isProcessing || code.length !== 4}
            className="w-full py-3 rounded-2xl gradient-primary text-white font-semibold text-base transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify & Transfer
          </button>
          <button
            onClick={() => {
              onCancel();
              setCode('');
              setError('');
            }}
            disabled={isProcessing}
            className="w-full py-3 rounded-2xl bg-gray-100 text-foreground font-semibold text-base transition-colors hover:bg-gray-200 active:scale-[0.98] disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionCodeDialog;