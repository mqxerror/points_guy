'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MultiSelectProps {
  label: string;
  error?: string;
  optional?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
  id?: string;
}

export function MultiSelect({
  label,
  error,
  optional,
  options,
  placeholder = 'Select programs...',
  value,
  onChange,
  id,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const removeOption = (optValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optValue));
  };

  const selectedLabels = value
    .map((v) => options.find((o) => o.value === v))
    .filter(Boolean);

  return (
    <div className="space-y-1.5" ref={containerRef}>
      <label htmlFor={selectId} className="block text-sm font-medium text-[#1E293B]">
        {label}
        {optional && <span className="text-[#94A3B8] ml-1">(optional)</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          id={selectId}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full px-4 py-3 min-h-12 rounded-md bg-[#F1F5F9] border border-transparent text-[#1E293B] transition-all duration-200 text-left flex items-center justify-between gap-2',
            'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-0 focus:border-transparent focus:bg-white',
            isOpen && 'ring-2 ring-[#C9A84C] bg-white',
            error && 'bg-[#FEF2F2] ring-2 ring-[#EF4444] focus:ring-[#EF4444]'
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          aria-expanded={isOpen}
        >
          <div className="flex flex-wrap gap-1.5 flex-1">
            {selectedLabels.length > 0 ? (
              selectedLabels.map((opt) => (
                <span
                  key={opt!.value}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium bg-[#C9A84C]/10 text-[#C9A84C]"
                >
                  {opt!.label}
                  <button
                    type="button"
                    onClick={(e) => removeOption(opt!.value, e)}
                    className="hover:text-[#A3872E] transition-colors"
                    aria-label={`Remove ${opt!.label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-[#94A3B8]">{placeholder}</span>
            )}
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-[#94A3B8] shrink-0 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-md bg-white border border-[#E2E8F0] shadow-lg overflow-hidden">
            {options.map((opt) => {
              const isSelected = value.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleOption(opt.value)}
                  className={cn(
                    'w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors',
                    isSelected
                      ? 'bg-[#C9A84C]/5 text-[#1E293B]'
                      : 'text-[#475569] hover:bg-[#F8FAFC]'
                  )}
                >
                  <div
                    className={cn(
                      'h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
                      isSelected
                        ? 'bg-[#C9A84C] border-[#C9A84C]'
                        : 'border-[#CBD5E1]'
                    )}
                  >
                    {isSelected && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {error && (
        <p id={`${selectId}-error`} className="text-sm text-[#EF4444]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
