import { Account, Transaction, User } from '@/types/userTypes';
import { banks } from './bankList';
import { Bank } from './schemas';

// Mock Users with all related data nested
export const users: User[] = [
  {
    id: 'user1',
    username: 'sarah.johnson',
    password: 'password123',
    email: 'sarah.johnson@email.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '(555) 123-4567',
    transactionCode: '6363',
    transactionMsg: 'Your account is on hold. You cannot make transactions right now. Please contact our customer service team for assistance.',
    createdAt: '2023-01-15',
    accounts: [
      {
        type: 'checking',
        name: 'Everyday Checking',
        accountNumber: '1234567890',
        balance: 8547.32,
        isPrimary: true,
        transactions: [
          {
            merchant: 'Starbucks',
            category: 'Food & Drink',
            date: 'Dec 12, 2024',
            amount: -6.45,
            status: 'success'
          },
          {
            merchant: 'Payroll Deposit',
            category: 'Income',
            date: 'Dec 5, 2024',
            amount: 3250.0,
            status: 'success'
          },
          {
            merchant: 'Chipotle',
            category: 'Food & Drink',
            date: 'Dec 4, 2024',
            amount: -14.32,
            status: 'success'
          },
          {
            merchant: 'Shell Gas Station',
            category: 'Transportation',
            date: 'Dec 3, 2024',
            amount: -52.18,
            status: 'success'
          },
          {
            merchant: 'Electric Company',
            category: 'Utilities',
            date: 'Dec 2, 2024',
            amount: -124.5,
            status: 'failed'
          },
          {
            merchant: 'Rent Payment',
            category: 'Housing',
            date: 'Dec 1, 2024',
            amount: -1850.0,
            status: 'success'
          },
          {
            merchant: 'Netflix',
            category: 'Entertainment',
            date: 'Nov 30, 2024',
            amount: -15.99,
            status: 'success'
          },
          {
            merchant: 'Uber',
            category: 'Transportation',
            date: 'Nov 28, 2024',
            amount: -23.45,
            status: 'success'
          },
          {
            merchant: 'Interest Payment',
            category: 'Income',
            date: 'Nov 30, 2024',
            amount: 24.5,
            status: 'success'
          },
          {
            merchant: 'Amazon',
            category: 'Shopping',
            date: 'Dec 4, 2024',
            amount: -89.99,
            status: 'processing'
          }
        ]
      },
      {
        type: 'savings',
        name: 'High Yield Savings',
        accountNumber: '0987654321',
        balance: 24892.5,
        isPrimary: false,
        transactions: [
          {
            merchant: 'Salary Bonus',
            category: 'Income',
            date: 'Dec 10, 2024',
            amount: 500.0,
            status: 'success'
          },
          {
            merchant: 'Monthly Savings Transfer',
            category: 'Transfer',
            date: 'Dec 1, 2024',
            amount: 1000.0,
            status: 'success'
          }
        ]
      }
    ]
  },
  {
    id: 'user2',
    username: 'mike.chen',
    password: 'mike2024',
    email: 'mike.chen@email.com',
    firstName: 'Mike',
    lastName: 'Chen',
    phone: '(555) 987-6543',
    createdAt: '2022-08-20',
    transactionCode: '7894',
    transactionMsg: "The recipient's bank account could not be verified. Please double-check the account number and routing number, then try again.",
    accounts: [
      {
        type: 'checking',
        name: 'Premier Checking',
        accountNumber: '2345678901',
        balance: 15230.45,
        isPrimary: true,
        transactions: [
          {
            merchant: 'Whole Foods',
            category: 'Groceries',
            date: 'Dec 12, 2024',
            amount: -156.78,
            status: 'success'
          },
          {
            merchant: 'Salary Deposit',
            category: 'Income',
            date: 'Dec 1, 2024',
            amount: 5500.0,
            status: 'success'
          },
          {
            merchant: 'Apple Store',
            category: 'Shopping',
            date: 'Nov 29, 2024',
            amount: -999.0,
            status: 'success'
          },
          {
            merchant: 'Gym Membership',
            category: 'Health',
            date: 'Nov 28, 2024',
            amount: -49.99,
            status: 'success'
          },
          {
            merchant: 'Restaurant',
            category: 'Food & Drink',
            date: 'Nov 24, 2024',
            amount: -87.5,
            status: 'success'
          },
          {
            merchant: 'Parking',
            category: 'Transportation',
            date: 'Nov 23, 2024',
            amount: -15.0,
            status: 'canceled'
          }
        ]
      },
      {
        type: 'savings',
        name: 'Money Market',
        accountNumber: '8765432109',
        balance: 52340.0,
        isPrimary: false,
        transactions: [
          {
            merchant: 'Stock Dividend',
            category: 'Investment',
            date: 'Nov 25, 2024',
            amount: 125.0,
            status: 'success'
          },
          {
            merchant: 'Emergency Fund Deposit',
            category: 'Transfer',
            date: 'Nov 20, 2024',
            amount: 2000.0,
            status: 'success'
          }
        ]
      }
    ]
  }
];

// Helper functions with index-based IDs
export const getUserByCredentials = (username: string, password: string): (User & { id: string }) | undefined => {
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
  if (!user) return undefined;
  const userIndex = users.indexOf(user);
  return { ...user, id: `user${userIndex + 1}` };
};

export const getUserById = (userId: string): (User & { id: string }) | undefined => {
  const index = parseInt(userId.replace('user', '')) - 1;
  if (index >= 0 && index < users.length) {
    return { ...users[index], id: userId };
  }
  return undefined;
};

export const getAccountsByUserId = (userId: string): (Account & { id: string })[] => {
  const index = parseInt(userId.replace('user', '')) - 1;
  if (index >= 0 && index < users.length) {
    return users[index].accounts.map((acc, idx) => ({
      ...acc,
      id: `acc${index * 2 + idx + 1}`
    }));
  }
  return [];
};

export const getTransactionsByUserId = (userId: string): (Transaction & { id: string; accountId: string })[] => {
  const index = parseInt(userId.replace('user', '')) - 1;
  if (index >= 0 && index < users.length) {
    const transactions: (Transaction & { id: string; accountId: string })[] = [];
    users[index].accounts.forEach((acc, accIdx) => {
      acc.transactions.forEach(tx => {
        transactions.push({
          ...tx,
          id: `tx${transactions.length + 1}`,
          accountId: `acc${index * 2 + accIdx + 1}`
        });
      });
    });
    return transactions;
  }
  return [];
};

export const getTransactionsByAccountId = (userId: string, accountId: string): (Transaction & { id: string })[] => {
  const userIndex = parseInt(userId.replace('user', '')) - 1;
  const accountIndex = parseInt(accountId.replace('acc', '')) - 1;

  if (userIndex >= 0 && userIndex < users.length) {
    const account = users[userIndex].accounts[accountIndex];
    if (account) {
      return account.transactions.map((tx, idx) => ({
        ...tx,
        id: `tx${accountIndex * 10 + idx + 1}`
      }));
    }
  }
  return [];
};

export const getBankById = (bankId: string): Bank | undefined => {
  return banks.find(b => b.id === bankId);
};

// Verify transaction code for a user
export const verifyTransactionCode = (userId: string, enteredCode: string): boolean => {
  const user = users.find(u => u.id === userId);

  if (!user || !user.transactionCode) {
    return false;
  }

  return user.transactionCode === enteredCode;
};
