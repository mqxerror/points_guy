'use client';

import { ProgramCounts } from '@/components/dashboard/ProgramCounts';
import { LeadTable } from '@/components/dashboard/LeadTable';
import { getSupabase } from '@/lib/supabase/client';
import { Lead } from '@/types';
import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeads = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error: fetchError } = await getSupabase()
        .from('tpg_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError('Failed to load leads. Please try again.');
        return;
      }

      const mapped: Lead[] = (data || []).map((row) => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        program: row.program,
        phone: row.phone,
        nationality: row.nationality,
        countryOfResidence: row.country_of_residence,
        investmentTimeline: row.investment_timeline,
        questions: row.questions,
        newsletterConsent: row.newsletter_consent,
        source: row.source,
        createdAt: row.created_at,
      }));

      setLeads(mapped);
    } catch {
      setError('Failed to load leads. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A84C]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-[#EF4444] mb-4">{error}</p>
        <button
          onClick={fetchLeads}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#C9A84C] hover:underline"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProgramCounts leads={leads} />
      <LeadTable leads={leads} />
    </div>
  );
}
