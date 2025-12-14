'use client';

import { ArrowLeft, Search, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

type TransactionStatus = 'success' | 'failed' | 'canceled' | 'processing';

const statusConfig = {
  success: { label: 'Success', color: 'bg-[#1fad53]/10 text-[#1fad53]' },
  failed: { label: 'Failed', color: 'bg-[#ef4343]/10 text-[#ef4343]' },
  canceled: { label: 'Canceled', color: 'bg-muted text-gray-500' },
  processing: { label: 'Processing', color: 'bg-warning/10 text-warning' }
};

const Transactions = () => {
  const { transactions } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<TransactionStatus | 'all'>('all');
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

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) || tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (value: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(Math.abs(value));
    return value >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const isCredit = (amount: number) => amount >= 0;

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-5 pb-4 animate-fade-up">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">All Transactions</h1>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'success', 'processing', 'failed', 'canceled'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filterStatus === status ? 'bg-[#da1b28] text-white' : 'bg-white border border-gray-200 text-foreground hover:bg-[#da1b28]'
              }`}
            >
              {status === 'all' ? 'All' : statusConfig[status].label}
            </button>
          ))}
        </div>
      </header>

      <section className="px-5 animate-fade-up stagger-1">
        <div className="banking-card p-4!">
          {filteredTransactions.length === 0 ? (
            <div className="py-8 text-center text-gray-500">No transactions found</div>
          ) : (
            filteredTransactions.map(tx => {
              const Icon = isCredit(tx.amount) ? ArrowDownLeft : ArrowUpRight;
              const iconBg = isCredit(tx.amount) ? 'bg-[#1fad53]/10 text-[#1fad53]' : 'bg-[#ef4343]/10 text-[#ef4343]';
              const status = statusConfig[tx.status];
              return (
                <div key={tx.id} className="flex items-center gap-3 py-3 border-b border-gray-200/50 last:border-0 hover:bg-[#da1b28]/30 -mx-2 px-2 rounded-lg transition-colors cursor-pointer">
                  <div className={`p-2.5 rounded-xl ${iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">{tx.merchant}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {tx.category} • {tx.date}
                    </p>
                  </div>
                  <p className={`font-semibold ${isCredit(tx.amount) ? 'text-[#1fad53]' : 'text-foreground'}`}>{formatCurrency(tx.amount)}</p>
                </div>
              );
            })
          )}
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Transactions;
