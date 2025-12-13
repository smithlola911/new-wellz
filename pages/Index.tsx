"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AccountsCarousel from "@/components/dashboard/AccountsCarousel";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import BottomNavigation from "@/components/dashboard/BottomNavigation";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background pb-28">
      <DashboardHeader />
      <AccountsCarousel />
      <QuickActions />
      <RecentTransactions />
      <BottomNavigation />
    </div>
  );
}
