'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-semibold text-[#0A1628] mb-3">Something went wrong</h2>
        <p className="text-[#475569] mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#C9A84C] text-[#0A1628] font-semibold hover:bg-[#D4B85E] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
