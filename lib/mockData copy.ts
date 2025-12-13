import { banks } from "./bankList";
import { User, Bank, Account, Transaction } from "./schemas"

// Mock Users with credentials
export const users: User[] = [
  {
    id: "user1",
    username: "sarah.johnson",
    password: "password123",
    email: "sarah.johnson@email.com",
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "(555) 123-4567",
    bankId: "1",
    createdAt: "2023-01-15",
  },
  {
    id: "user2",
    username: "mike.chen",
    password: "mike2024",
    email: "mike.chen@email.com",
    firstName: "Mike",
    lastName: "Chen",
    phone: "(555) 987-6543",
    bankId: "2",
    createdAt: "2022-08-20",
  },
  {
    id: "user3",
    username: "emily.davis",
    password: "emily123",
    email: "emily.davis@email.com",
    firstName: "Emily",
    lastName: "Davis",
    phone: "(555) 456-7890",
    bankId: "3",
    createdAt: "2023-05-10",
  },
  {
    id: "user4",
    username: "demo",
    password: "demo",
    email: "demo@bank.com",
    firstName: "Demo",
    lastName: "User",
    phone: "(555) 000-0000",
    bankId: "1",
    createdAt: "2024-01-01",
  },
];

// Mock Accounts
export const accounts: Account[] = [
  // Sarah's accounts
  {
    id: "acc1",
    userId: "user1",
    type: "checking",
    name: "Everyday Checking",
    accountNumber: "1234567890",
    balance: 8547.32,
    available: 8497.32,
    isPrimary: true,
  },
  {
    id: "acc2",
    userId: "user1",
    type: "savings",
    name: "High Yield Savings",
    accountNumber: "0987654321",
    balance: 24892.50,
    available: 24892.50,
    isPrimary: false,
  },
  {
    id: "acc3",
    userId: "user1",
    type: "credit",
    name: "Rewards Credit Card",
    accountNumber: "5555666677",
    balance: -1245.80,
    isPrimary: false,
  },
  // Mike's accounts
  {
    id: "acc4",
    userId: "user2",
    type: "checking",
    name: "Premier Checking",
    accountNumber: "2345678901",
    balance: 15230.45,
    available: 15180.45,
    isPrimary: true,
  },
  {
    id: "acc5",
    userId: "user2",
    type: "savings",
    name: "Money Market",
    accountNumber: "8765432109",
    balance: 52340.00,
    available: 52340.00,
    isPrimary: false,
  },
  // Emily's accounts
  {
    id: "acc6",
    userId: "user3",
    type: "checking",
    name: "Basic Checking",
    accountNumber: "3456789012",
    balance: 3450.67,
    available: 3400.67,
    isPrimary: true,
  },
  {
    id: "acc7",
    userId: "user3",
    type: "credit",
    name: "Cash Back Card",
    accountNumber: "6666777788",
    balance: -567.23,
    isPrimary: false,
  },
  // Demo user accounts
  {
    id: "acc8",
    userId: "user4",
    type: "checking",
    name: "Demo Checking",
    accountNumber: "9999888877",
    balance: 5000.00,
    available: 5000.00,
    isPrimary: true,
  },
  {
    id: "acc9",
    userId: "user4",
    type: "savings",
    name: "Demo Savings",
    accountNumber: "7777666655",
    balance: 10000.00,
    available: 10000.00,
    isPrimary: false,
  },
];

// Mock Transactions
export const transactions: Transaction[] = [
  // Sarah's transactions
  { id: "tx1", userId: "user1", accountId: "acc1", merchant: "Starbucks", category: "Food & Drink", date: "Today", amount: 6.45, isCredit: false, status: "success", icon: "Coffee" },
  { id: "tx2", userId: "user1", accountId: "acc1", merchant: "Payroll Deposit", category: "Income", date: "Dec 5", amount: 3250.00, isCredit: true, status: "success", icon: "Briefcase" },
  { id: "tx3", userId: "user1", accountId: "acc3", merchant: "Amazon", category: "Shopping", date: "Dec 4", amount: 89.99, isCredit: false, status: "processing", icon: "ShoppingBag" },
  { id: "tx4", userId: "user1", accountId: "acc1", merchant: "Chipotle", category: "Food & Drink", date: "Dec 4", amount: 14.32, isCredit: false, status: "success", icon: "Utensils" },
  { id: "tx5", userId: "user1", accountId: "acc1", merchant: "Shell Gas Station", category: "Transportation", date: "Dec 3", amount: 52.18, isCredit: false, status: "success", icon: "Car" },
  { id: "tx6", userId: "user1", accountId: "acc1", merchant: "Electric Company", category: "Utilities", date: "Dec 2", amount: 124.50, isCredit: false, status: "failed", icon: "Zap" },
  { id: "tx7", userId: "user1", accountId: "acc1", merchant: "Rent Payment", category: "Housing", date: "Dec 1", amount: 1850.00, isCredit: false, status: "success", icon: "Building2" },
  { id: "tx8", userId: "user1", accountId: "acc1", merchant: "Netflix", category: "Entertainment", date: "Nov 30", amount: 15.99, isCredit: false, status: "success", icon: "Tv" },
  { id: "tx9", userId: "user1", accountId: "acc2", merchant: "Interest Payment", category: "Income", date: "Nov 30", amount: 24.50, isCredit: true, status: "success", icon: "TrendingUp" },
  { id: "tx10", userId: "user1", accountId: "acc1", merchant: "Uber", category: "Transportation", date: "Nov 28", amount: 23.45, isCredit: false, status: "success", icon: "Car" },
  
  // Mike's transactions
  { id: "tx11", userId: "user2", accountId: "acc4", merchant: "Whole Foods", category: "Groceries", date: "Today", amount: 156.78, isCredit: false, status: "success", icon: "ShoppingCart" },
  { id: "tx12", userId: "user2", accountId: "acc4", merchant: "Salary Deposit", category: "Income", date: "Dec 1", amount: 5500.00, isCredit: true, status: "success", icon: "Briefcase" },
  { id: "tx13", userId: "user2", accountId: "acc4", merchant: "Apple Store", category: "Shopping", date: "Nov 29", amount: 999.00, isCredit: false, status: "success", icon: "Smartphone" },
  { id: "tx14", userId: "user2", accountId: "acc4", merchant: "Gym Membership", category: "Health", date: "Nov 28", amount: 49.99, isCredit: false, status: "success", icon: "Dumbbell" },
  { id: "tx15", userId: "user2", accountId: "acc5", merchant: "Stock Dividend", category: "Investment", date: "Nov 25", amount: 125.00, isCredit: true, status: "success", icon: "TrendingUp" },
  { id: "tx16", userId: "user2", accountId: "acc4", merchant: "Restaurant", category: "Food & Drink", date: "Nov 24", amount: 87.50, isCredit: false, status: "success", icon: "Utensils" },
  { id: "tx17", userId: "user2", accountId: "acc4", merchant: "Parking", category: "Transportation", date: "Nov 23", amount: 15.00, isCredit: false, status: "canceled", icon: "Car" },
  
  // Emily's transactions
  { id: "tx18", userId: "user3", accountId: "acc6", merchant: "Target", category: "Shopping", date: "Today", amount: 45.67, isCredit: false, status: "success", icon: "ShoppingBag" },
  { id: "tx19", userId: "user3", accountId: "acc6", merchant: "Freelance Payment", category: "Income", date: "Dec 3", amount: 1200.00, isCredit: true, status: "success", icon: "Briefcase" },
  { id: "tx20", userId: "user3", accountId: "acc7", merchant: "Spotify", category: "Entertainment", date: "Dec 1", amount: 9.99, isCredit: false, status: "success", icon: "Music" },
  { id: "tx21", userId: "user3", accountId: "acc6", merchant: "Coffee Shop", category: "Food & Drink", date: "Nov 30", amount: 4.50, isCredit: false, status: "success", icon: "Coffee" },
  { id: "tx22", userId: "user3", accountId: "acc6", merchant: "Internet Bill", category: "Utilities", date: "Nov 28", amount: 79.99, isCredit: false, status: "processing", icon: "Wifi" },
  
  // Demo user transactions
  { id: "tx23", userId: "user4", accountId: "acc8", merchant: "Welcome Bonus", category: "Income", date: "Today", amount: 100.00, isCredit: true, status: "success", icon: "Gift" },
  { id: "tx24", userId: "user4", accountId: "acc8", merchant: "Test Purchase", category: "Shopping", date: "Today", amount: 25.00, isCredit: false, status: "success", icon: "ShoppingBag" },
  { id: "tx25", userId: "user4", accountId: "acc9", merchant: "Interest", category: "Income", date: "Dec 1", amount: 5.00, isCredit: true, status: "success", icon: "TrendingUp" },
];

// Helper functions
export const getUserByCredentials = (username: string, password: string): User | undefined => {
  return users.find(
    (u) => (u.username === username || u.email === username) && u.password === password
  );
};

export const getAccountsByUserId = (userId: string): Account[] => {
  return accounts.filter((a) => a.userId === userId);
};

export const getTransactionsByUserId = (userId: string): Transaction[] => {
  return transactions.filter((t) => t.userId === userId);
};

export const getBankById = (bankId: string): Bank | undefined => {
  return banks.find((b) => b.id === bankId);
};
