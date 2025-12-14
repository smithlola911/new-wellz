// Transfer.tsx - Main component
'use client';

import { useEffect, useState } from 'react';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { useAuthStore } from '@/store/authStore';
import TransferForm from './TransferForm';
import TransferConfirmation from './TransferConfirmation';
import TransactionCodeDialog from './TransactionCodeDialog';
import TransferFailedDialog from './TransferFailedDialog';
import { useTransferLogic } from '@/hooks/useTransferLogic';
import { useRouter } from 'next/navigation';

const Transfer = () => {
  const userAccounts = useAuthStore(state => state.accounts);
  const user = useAuthStore(state => state.user);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCodeVerification, setShowCodeVerification] = useState(false);
  const [codeVerificationProcessing, setCodeVerificationProcessing] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const _hasHydrated = useAuthStore(state => state._hasHydrated);

  const { state, handlers, validation, displayAccounts, selectedFromAccount, selectedBankInfo } = useTransferLogic(userAccounts);

  useEffect(() => {
    if (_hasHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [_hasHydrated, isAuthenticated, router]);

  if (!_hasHydrated || !isAuthenticated) {
    return null;
  }

  const handleContinue = () => {
    if (validation.hasInsufficientFunds) {
      handlers.setInsufficientFundsError(true);
      return;
    }
    handlers.setInsufficientFundsError(false);
    if (validation.isFormValid) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmTransfer = async () => {
    setShowCodeVerification(true);
  };

  const handleCodeVerification = (enteredCode: string) => {
    // Verify code matches user's transaction code
    if (enteredCode === user?.transactionCode) {
      setCodeVerificationProcessing(true);

      setTimeout(() => {
        setCodeVerificationProcessing(false);
        setShowCodeVerification(false);
        handlers.setIsProcessing(true);

        // Simulate transfer processing
        setTimeout(() => {
          handlers.setIsProcessing(false);
          handlers.setShowFailedDialog(true);
          setShowConfirmation(false);
        }, 2500);
      }, 500);

      return true;
    }
    return false;
  };

  const handleCodeVerificationCancel = () => {
    setShowCodeVerification(false);
    setCodeVerificationProcessing(false);
  };

  const transactionMsg = user?.transactionMsg || "The recipient's bank account could not be verified. Please double-check the account number and routing number, then try again.";

  if (showConfirmation) {
    return (
      <>
        <TransferConfirmation
          amount={state.amount}
          selectedFromAccount={selectedFromAccount}
          selectedBankInfo={selectedBankInfo}
          accountNumber={state.accountNumber}
          routingNumber={state.routingNumber}
          memo={state.memo}
          isProcessing={state.isProcessing}
          onConfirm={handleConfirmTransfer}
          onCancel={() => setShowConfirmation(false)}
        />
        <TransactionCodeDialog open={showCodeVerification} onConfirm={handleCodeVerification} onCancel={handleCodeVerificationCancel} isProcessing={codeVerificationProcessing} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <TransferForm state={state} handlers={handlers} validation={validation} displayAccounts={displayAccounts} selectedFromAccount={selectedFromAccount} onContinue={handleContinue} />
      <TransferFailedDialog open={state.showFailedDialog} onClose={() => handlers.setShowFailedDialog(false)} reason={transactionMsg} />
      <BottomNavigation />
    </div>
  );
};

export default Transfer;
