'use client';

import { Timeline } from '@/components/ui/aceternity/timeline';
import { Clock } from 'lucide-react';

interface Step {
  step: number;
  title: string;
  description: string;
  duration: string;
}

interface PortugalTimelineProps {
  steps: Step[];
}

export function PortugalTimeline({ steps }: PortugalTimelineProps) {
  const timelineData = steps.map((s) => ({
    title: s.title,
    content: (
      <div>
        <h3 className="font-semibold text-[#0A1628]">{s.title}</h3>
        <p className="text-[#475569] text-sm mt-1">{s.description}</p>
        <span className="inline-flex items-center gap-1 text-xs text-[#94A3B8] mt-1.5">
          <Clock className="h-3 w-3" /> {s.duration}
        </span>
      </div>
    ),
  }));

  return (
    <div className="max-w-3xl mx-auto">
      <Timeline data={timelineData} lineColor="#C9A84C" />
    </div>
  );
}
