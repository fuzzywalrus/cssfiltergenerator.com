export default function FilterListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="glass-card rounded-xl p-5 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-slate-600 rounded"></div>
              <div className="w-24 h-4 bg-slate-600 rounded"></div>
            </div>
            <div className="w-16 h-8 bg-slate-600 rounded-full"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-slate-600 rounded"></div>
            <div className="w-20 h-10 bg-slate-600 rounded-lg"></div>
          </div>
          <div className="mt-3 h-1 bg-slate-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}