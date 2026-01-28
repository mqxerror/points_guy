export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-3 border-[#C9A84C] border-t-transparent animate-spin" />
        <p className="text-[#94A3B8] text-sm">Loading...</p>
      </div>
    </div>
  );
}
