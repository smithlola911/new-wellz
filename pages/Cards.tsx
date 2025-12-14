'use client';

import { ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Cards() {
  const { accounts } = useAuthStore();
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const _hasHydrated = useAuthStore(state => state._hasHydrated);

  useEffect(() => {
    if (_hasHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [_hasHydrated, isAuthenticated, router]);

  if (!_hasHydrated || !isAuthenticated) {
    return null;
  }

  // Get checking account balance
  const checkingAccount = accounts.find(acc => acc.type === 'checking');
  const checkingBalance = checkingAccount?.balance || 0;

  const cards = [
    {
      id: 1,
      name: 'Everyday Checking',
      type: 'Debit',
      number: '4111 2222 3333 4444',
      expiry: '12/26',
      balance: checkingBalance,
      color: 'bg-foreground',
      default: true
    }
    // {
    //   id: 2,
    //   name: 'Active Cash Card',
    //   type: 'Credit',
    //   number: '5555 6666 7777 8888',
    //   expiry: '09/27',
    //   balance: 1245.8,
    //   limit: 5000,
    //   color: 'gradient-primary',
    //   default: false
    // }
  ];

  const formatCardNumber = (num: string) => {
    return '•••• •••• •••• ' + num.slice(-4);
  };

  return (
    <div className="min-h-screen bg-background pb-52">
      {/* Header */}
      <header className="px-5 pt-5 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">My Cards</h1>
        </div>
      </header>

      {/* Cards List */}
      <section className="px-5 space-y-4 animate-fade-up stagger-1">
        {cards.map(card => (
          <div key={card.id} className={`relative rounded-3xl p-6 ${card.default ? 'text-white bg-[#da1b28]' : 'bg-white text-black'} overflow-hidden`}>
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-wider opacity-80">{card.type}</p>
                <p className="font-semibold">{card.name}</p>
              </div>
              <CreditCard className="w-8 h-8 opacity-80" />
            </div>

            <p className="text-xl font-mono tracking-widest mb-6">{formatCardNumber(card.number)}</p>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs opacity-80">Expires</p>
                <p className="font-medium">{card.expiry}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-80">{card.type === 'Credit' ? 'Balance' : 'Available'}</p>
                <p className="font-semibold text-lg">
                  $
                  {card.balance.toLocaleString('en-US', {
                    minimumFractionDigits: 2
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Add New Card */}
      {/* <section className="px-5 animate-fade-up stagger-3">
        <button className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#da1b28]/5 transition-all">
          <Plus className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-500">Add New Card</span>
        </button>
      </section> */}

      <BottomNavigation />
    </div>
  );
}
