// app/dashboard/layout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { data: user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login"); 
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <AuthProvider user={user}>
      <div className="bg-gray-100 text-gray-900 min-h-screen">
        <Navbar />
        <main className="container mx-auto p-6">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
  
  
 
}
