import { AlertTriangle } from 'lucide-react';

interface UrgencyBannerProps {
  message: string;
  subtext?: string;
}

export function UrgencyBanner({ message, subtext }: UrgencyBannerProps) {
  return (
    <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl p-4 md:p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-[#C9A84C] shrink-0 mt-0.5" />
        <div>
          <p className="text-[#0A1628] font-semibold text-sm">{message}</p>
          {subtext && <p className="text-[#475569] text-xs mt-1">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}
