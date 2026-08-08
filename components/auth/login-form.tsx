"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useLogin } from "@/hooks/auth/useLogin";
import { AuthDTO } from "@/types";
import { useUser } from "@/hooks/auth/useUser";
import { setAccessToken } from "@/services/authToken";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [status, setStatus] = useState<string | null>(null);

  const { login, user: userData } = useUser();

  const router = useRouter();
  const loginMutation = useLogin();

  function validate() {
    const next: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;
    // TODO: wire this up to a real auth backend (e.g. Better Auth + Neon)
    setStatus(
      "Looks good! Connect a database integration to enable real sign in.",
    );
    const user: AuthDTO = {
      email: email,
      password: password,
    };
    const data = await loginMutation.mutateAsync(user);
    if (data.status === 200) {
      setAccessToken(data.data.token);
      await login();
      console.log(userData);
      router.push("/");
    } else {
      setErrors(data.data);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          className="h-11 rounded-lg"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="#" className="text-sm text-accent hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
            className="h-11 rounded-lg pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
      </div>

      {status && (
        <p
          role="status"
          className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent"
        >
          {status}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="h-12 rounded-full text-base font-semibold shadow-[0_0_24px_rgba(168,85,247,0.4)]"
      >
        <LogIn className="size-4" aria-hidden="true" />
        Sign in
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New to NostalgiaSongs?{" "}
        <Link
          style={{ color: "oklch(0.85 0.13 200)" }}
          href="/register"
          className="font-medium  hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
