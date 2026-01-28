'use client';

import { LoginForm } from '@/components/dashboard/LoginForm';
import { getSupabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await getSupabase().auth.getSession();
    setIsAuthenticated(!!session);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A84C]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#132240] pt-20">
        <LoginForm onSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#0A1628]">Lead Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#0A1628] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
