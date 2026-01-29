import { AlertTriangle } from 'lucide-react';

interface UrgencyBannerProps {
  message: string;
  subtext?: string;
  progress?: number;
  progressLabel?: string;
}

export function UrgencyBanner({ message, subtext, progress, progressLabel }: UrgencyBannerProps) {
  return (
    <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl p-4 md:p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-[#C9A84C] shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-[#0A1628] font-semibold text-sm">{message}</p>
          {subtext && <p className="text-[#475569] text-xs mt-1">{subtext}</p>}
          {typeof progress === 'number' && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                {progressLabel && <span className="text-[#475569]">{progressLabel}</span>}
                <span className="text-[#C9A84C] font-semibold">{progress}% allocated</span>
              </div>
              <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C9A84C] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
