"use client";
import {
  ArrowLeft,
  Camera,
  Mail,
  Phone,
  Shield,
  LogOut,
} from "lucide-react";
import BottomNavigation from "@/components/dashboard/BottomNavigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-5 pb-6 animate-fade-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/more"
              className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          </div>
        </div>
      </header>

      <section className="px-5 mb-6 animate-fade-up stagger-1">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-white text-3xl font-bold">
              {getInitials(user.firstName, user.lastName)}
            </div>
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-lg border border-gray-200">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-2">
        <h2 className="text-sm font-medium text-gray-500 mb-3">
          Personal Information
        </h2>
        <div className="banking-card p-0! overflow-hidden divide-y divide-border">
          <div className="flex items-center gap-4 p-4">
            <div className="p-2.5 rounded-xl bg-[#da1b28]">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-foreground">{user.email}</p>
            </div>
            <Shield className="w-4 h-4 text-[#1fad53]" />
          </div>
          <div className="flex items-center gap-4 p-4">
            <div className="p-2.5 rounded-xl bg-[#da1b28]">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-foreground">{user.phone}</p>
            </div>
            <Shield className="w-4 h-4 text-[#1fad53]" />
          </div>
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-3">
        <h2 className="text-sm font-medium text-gray-500 mb-3">
          Account Details
        </h2>
        <div className="banking-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Username</span>
            <span className="font-medium text-foreground">{user.username}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Member Since</span>
            <span className="font-medium text-foreground">
              {formatDate(user.createdAt)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Account Status</span>
            <span className="px-2 py-1 rounded-full bg-[#1fad53]/10 text-[#1fad53] text-sm font-medium">
              Active
            </span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full cursor-pointer mt-5 flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#ef4343] text-white transition-colors hover:bg-[#ef4343]/90"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Profile;