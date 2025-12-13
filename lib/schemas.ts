import { z } from "zod";

// User schema
export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  avatar: z.string().optional(),
  bankId: z.string(),
  createdAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// Bank schema
export const BankSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().optional(),
});

export type Bank = z.infer<typeof BankSchema>;

// Account schema
export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(["checking", "savings", "credit"]),
  name: z.string(),
  accountNumber: z.string(),
  balance: z.number(),
  available: z.number().optional(),
  isPrimary: z.boolean().default(false),
});

export type Account = z.infer<typeof AccountSchema>;

// Transaction schema
export const TransactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  accountId: z.string(),
  merchant: z.string(),
  category: z.string(),
  date: z.string(),
  amount: z.number(),
  isCredit: z.boolean().default(false),
  status: z.enum(["success", "failed", "canceled", "processing"]),
  icon: z.string(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

// Login schema
export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
