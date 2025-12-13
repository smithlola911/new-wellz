import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Account, Transaction, Bank } from "@/lib/schemas";
import {
  getUserByCredentials,
  getAccountsByUserId,
  getTransactionsByUserId,
  getBankById,
} from "@/lib/mockData";

interface AuthState {
  user: User | null;
  bank: Bank | null;
  accounts: Account[];
  transactions: Transaction[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      bank: null,
      accounts: [],
      transactions: [],
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const user = getUserByCredentials(username, password);
        
        if (user) {
          const userAccounts = getAccountsByUserId(user.id);
          const userTransactions = getTransactionsByUserId(user.id);
          const userBank = getBankById(user.bankId);
          
          set({
            user,
            bank: userBank || null,
            accounts: userAccounts,
            transactions: userTransactions,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return true;
        } else {
          set({
            isLoading: false,
            error: "Invalid username or password",
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          bank: null,
          accounts: [],
          transactions: [],
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        bank: state.bank,
        accounts: state.accounts,
        transactions: state.transactions,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
