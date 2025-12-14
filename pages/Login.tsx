"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Landmark, Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { LoginSchema } from "@/lib/schemas";
import { users } from "@/lib/mockData";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  const router = useRouter();
  const { login, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Validate with Zod
    const result = LoginSchema.safeParse({ username, password });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    const success = await login(username, password);
    if (success) {
      toast.success("Welcome back!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/10 via-background to-accent/10 flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
          <Landmark className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">SecureBank</h1>
        <p className="text-gray-500 mt-1">Your trusted banking partner</p>
      </header>

      {/* Login Form */}
      <main className="flex-1 px-6 pb-8">
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200/50">
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
              Sign in to your account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">
                  Username or Email
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 rounded-xl bg-white border-gray-200/50 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl bg-white border-gray-200/50 focus:border-[#da1b28] pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {validationError && (
                <p className="text-sm text-[#ef4343]">{validationError}</p>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-200 accent-primary"
                  />
                  <span className="text-gray-500">Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl gradient-primary text-white font-semibold text-lg transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              🔒 Your connection is secure and encrypted
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-4 bg-[#e7b00833] hidden rounded-xl border border-accent/30">
            <p className="text-xs font-medium text-foreground mb-2">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-xs text-gray-500">
              {users.slice(0, 3).map((user) => (
                <p key={user.id}>
                  <span className="font-mono bg-[#da1b28]/50 px-1 rounded">
                    {user.username}
                  </span>{" "}
                  /{" "}
                  <span className="font-mono bg-[#da1b28]/50 px-1 rounded">
                    {user.password}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-xs text-gray-500">
          © 2024 SecureBank. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
