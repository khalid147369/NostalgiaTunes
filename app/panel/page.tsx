"use client";
import { AdminDashboard } from "@/components/admin/dashboard";
import "./panel.css";
import { useUser } from "@/hooks/auth/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function Page() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.replace("/");
    }
  }, [loading, user, router]);


  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return <><Loading/><AdminDashboard /></>;
}
