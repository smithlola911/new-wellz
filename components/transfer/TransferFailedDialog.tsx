// TransferFailedDialog.tsx
'use client';

import { XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface TransferFailedDialogProps {
  open: boolean;
  onClose: () => void;
  reason?: string;
}

const TransferFailedDialog = ({ open, onClose, reason }: TransferFailedDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto bg-white">
        <DialogHeader className="text-center items-center">
          <div className="p-4 rounded-full bg-[#ef4343]/10 mb-4">
            <XCircle className="w-12 h-12 text-[#ef4343]" />
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">Transfer Failed</DialogTitle>
          <DialogDescription className="text-gray-500 mt-2">We couldn't complete your transfer at this time.</DialogDescription>
        </DialogHeader>

        <div className="bg-[#da1b28] rounded-md p-4 mt-4">
          <p className="text-sm font-medium text-white mb-1">Reason:</p>
          <p className="text-sm text-white">{reason}</p>
        </div>

        <button onClick={onClose} className="w-full mt-6 py-3 rounded-2xl gradient-primary text-white font-semibold text-base transition-opacity hover:opacity-90 active:scale-[0.98]">
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default TransferFailedDialog;
