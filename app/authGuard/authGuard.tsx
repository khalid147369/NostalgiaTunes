"use client";

import { useUser } from "@/hooks/auth/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [loading, user]);

  if (loading) return <p>Cargando...</p>;

  if (!user) return null;

  return <>{children}</>;
}
