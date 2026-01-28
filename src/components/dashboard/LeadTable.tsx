'use client';

import { Lead } from '@/types';
import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

interface LeadTableProps {
  leads: Lead[];
}

type SortField = 'fullName' | 'email' | 'program' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export function LeadTable({ leads }: LeadTableProps) {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    const aVal = a[sortField] || '';
    const bVal = b[sortField] || '';
    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <p className="text-[#475569] text-lg mb-2">No leads yet</p>
        <p className="text-[#94A3B8] text-sm">Leads will appear here once visitors submit the form.</p>
      </div>
    );
  }

  const columns: { key: SortField; label: string }[] = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'program', label: 'Program' },
    { key: 'createdAt', label: 'Date' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F1F5F9]">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-3">
                  <button
                    onClick={() => handleSort(col.key)}
                    className="flex items-center gap-1 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hover:text-[#475569] transition-colors"
                  >
                    {col.label}
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedLeads.map((lead, index) => (
              <tr
                key={lead.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF5]'}
              >
                <td className="px-4 py-3 text-sm text-[#1E293B] font-medium">
                  {lead.fullName}
                </td>
                <td className="px-4 py-3 text-sm text-[#475569]">{lead.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#C9A84C]/10 text-[#C9A84C] capitalize">
                    {lead.program}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-[#94A3B8]">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
