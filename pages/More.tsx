"use client";

import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Moon,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/dashboard/BottomNavigation";
import { useAuthStore } from "@/store/authStore";

const menuSections = [
  {
    title: "Account",
    items: [
      {
        icon: User,
        label: "Profile Settings",
        description: "Manage your personal info",
        path: "/profile",
      },
      {
        icon: Bell,
        label: "Notifications",
        description: "Customize alerts & reminders",
        path: "/notifications",
      },
      {
        icon: Shield,
        label: "Security",
        description: "Password, biometrics & 2FA",
        path: "/security",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        icon: Moon,
        label: "Appearance",
        description: "Theme & display options",
        path: null,
      },
      {
        icon: Smartphone,
        label: "App Settings",
        description: "Language, region & more",
        path: null,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        icon: HelpCircle,
        label: "Help Center",
        description: "FAQs & customer support",
        path: "/help",
      },
      {
        icon: FileText,
        label: "Legal",
        description: "Terms, privacy & disclosures",
        path: null,
      },
    ],
  },
];

export default function More() {
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="px-5 pt-12 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">More</h1>
        </div>
      </header>

      {/* User Info */}
      <section className="px-5 mb-6 animate-fade-up stagger-1">
        <div className="banking-card flex items-center gap-4">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-[#da1b28]-foreground text-2xl font-bold">
            {user?.firstName?.charAt(0) || "U"}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-xs text-gray-500mt-1">
              Member since 2019
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>
      </section>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <section
          key={section.title}
          className={`px-5 mb-6 animate-fade-up stagger-${sectionIndex + 2}`}
        >
          <h2 className="text-sm font-medium text-gray-500mb-3">
            {section.title}
          </h2>
          <div className="banking-card !p-0 overflow-hidden divide-y divide-border">
            {section.items.map((item) => {
              if (item.path) {
                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    className="w-full flex items-center gap-4 p-4 hover:bg-[#da1b28]/50 transition-colors text-left"
                  >
                    <div className="p-2.5 rounded-xl bg-[#da1b28]">
                      <item.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </Link>
                );
              } else {
                return (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-4 p-4 hover:bg-[#da1b28]/50 transition-colors text-left"
                    onClick={() => {
                      /* handle button action */
                    }}
                  >
                    <div className="p-2.5 rounded-xl bg-[#da1b28]">
                      <item.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </button>
                );
              }
            })}
          </div>
        </section>
      ))}

      {/* Sign Out */}
      <section className="px-5 animate-fade-up stagger-5">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-destructive/20 text-[#ef4343] hover:bg-[#ef4343]/5 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
        <p className="text-center text-xs text-gray-500mt-4">
          App Version 3.2.1 • © 2024 Mobile Banking
        </p>
      </section>

      <BottomNavigation />
    </div>
  );
}
