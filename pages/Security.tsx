import { ArrowLeft, Shield, Fingerprint, Smartphone, Key, Eye, EyeOff, ChevronRight, Lock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BottomNavigation from "@/components/dashboard/BottomNavigation";

const Security = () => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const devices = [
    { id: 1, name: "iPhone 15 Pro", location: "San Francisco, CA", lastActive: "Active now", current: true },
    { id: 2, name: "MacBook Pro", location: "San Francisco, CA", lastActive: "2 hours ago", current: false },
    { id: 3, name: "iPad Air", location: "Los Angeles, CA", lastActive: "3 days ago", current: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-12 pb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <Link href="/more" className="p-2 -ml-2 rounded-full hover:bg-[#da1b28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Security</h1>
        </div>
      </header>

      <section className="px-5 mb-6 animate-fade-up stagger-1">
        <div className="banking-card gradient-primary text-[#da1b28]-foreground">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">Security Score</span>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-bold">92</span>
            <span className="text-lg opacity-80">/100</span>
          </div>
          <p className="text-sm opacity-80">Your account is well protected</p>
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-2">
        <h2 className="text-sm font-medium text-gray-500mb-3">Authentication</h2>
        <div className="banking-card !p-0 overflow-hidden divide-y divide-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-[#da1b28]">
                <Fingerprint className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Biometric Login</p>
                <p className="text-sm text-gray-500">Face ID / Touch ID</p>
              </div>
            </div>
            <button
              onClick={() => setBiometricsEnabled(!biometricsEnabled)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                biometricsEnabled ? "bg-[#da1b28]" : "bg-[#da1b28]"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  biometricsEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-[#da1b28]">
                <Smartphone className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Two-Factor Auth</p>
                <p className="text-sm text-gray-500">SMS verification</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                twoFactorEnabled ? "bg-[#da1b28]" : "bg-[#da1b28]"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <button className="w-full flex items-center justify-between p-4 hover:bg-[#da1b28]/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-[#da1b28]">
                <Key className="w-5 h-5 text-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Change Password</p>
                <p className="text-sm text-gray-500">Last changed 30 days ago</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-[#da1b28]/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-[#da1b28]">
                <Lock className="w-5 h-5 text-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Change PIN</p>
                <p className="text-sm text-gray-500">4-digit transaction PIN</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </section>

      <section className="px-5 mb-6 animate-fade-up stagger-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-500">Active Devices</h2>
          <button className="text-sm text-[#da1b28] font-medium">Manage</button>
        </div>
        <div className="space-y-3">
          {devices.map((device) => (
            <div key={device.id} className="banking-card flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-[#da1b28]">
                <Smartphone className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{device.name}</p>
                  {device.current && (
                    <span className="px-2 py-0.5 rounded-full bg-[#1fad53]/10 text-[#1fad53] text-xs font-medium">
                      This device
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {device.location} • {device.lastActive}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 animate-fade-up stagger-4">
        <button className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-destructive/20 text-[#ef4343] hover:bg-[#ef4343]/5 transition-colors">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Report Suspicious Activity</span>
        </button>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Security;
