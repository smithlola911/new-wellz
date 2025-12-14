import { z } from "zod";

// Transaction schema
export const TransactionSchema = z.object({
  merchant: z.string(),
  category: z.string(),
  date: z.string(),
  amount: z.number(),
  status: z.enum(["success", "failed", "canceled", "processing"]),
});

export type Transaction = z.infer<typeof TransactionSchema>;

// Account schema
export const AccountSchema = z.object({
  name: z.string(),
  accountNumber: z.string(),
  balance: z.number(),
  isPrimary: z.boolean().default(false),
  type: z.enum(["checking", "savings"]),
  transactions: z.array(TransactionSchema),
});

export type Account = z.infer<typeof AccountSchema>;

// User schema
export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  transactionCode: z.string(),
  transactionMsg: z.string(),
  createdAt: z.string(),
  accounts: z.array(AccountSchema),
});

export type User = z.infer<typeof UserSchema>;

// Bank schema
export const BankSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Bank = z.infer<typeof BankSchema>;

// Login schema
export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;