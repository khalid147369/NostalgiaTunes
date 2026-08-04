'use client'
import { AdminDashboard } from '@/components/admin/dashboard'
import './panel.css';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {

  const { user, loading } = useUser();
    const router = useRouter();

  useEffect(() => {
      if (!loading && (!user || user.role !== "ADMIN")) {
        
          router.replace("/");
      }
  }, [loading, user, router]);

    

    if (loading) {
        return <p>..loading</p>
    }

    if (!user || user.role!=="ADMIN") {
        return null;
    }

  return <AdminDashboard />
}