// Types for nested structure
export type AccountType = "checking" | "savings";
export type TransactionStatus = "success" | "failed" | "canceled" | "processing";

export interface Transaction {
  merchant: string;
  category: string;
  date: string;
  amount: number;
  status: TransactionStatus;
}

export interface Account {
  name: string;
  accountNumber: string;
  balance: number;
  isPrimary: boolean;
  type: AccountType;
  transactions: Transaction[];
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  accounts: Account[];
}