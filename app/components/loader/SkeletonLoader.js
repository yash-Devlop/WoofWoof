export default function SkeletonLoader({ count = 8, isMobile = false }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite ease-in-out;
        }
      `}</style>

      {isMobile ? (
        <div className="px-2">
          <SkeletonCard />
        </div>
      ) : (
        <>
          {skeletons.map((i) => (
            <SkeletonCard key={i} />
          ))}
        </>
      )}
    </>
  );
}

function SkeletonCard() {
  return (
    <div className="relative flex flex-col">
      {/* Image skeleton */}
      <div className="relative w-full aspect-square bg-gray-200 rounded-t-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="flex flex-col gap-2 mt-4 px-2 w-full">
        {/* Title and Heart Row */}
        <div className="flex justify-between items-center gap-2">
          <div className="flex-1 min-w-0">
            <div className="h-5 bg-gray-200 rounded w-3/4 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
            </div>
          </div>
          <div className="h-7 w-7 bg-gray-200 rounded-full overflow-hidden relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
          </div>
        </div>
        
        {/* Price skeleton */}
        <div className="h-4 bg-gray-200 rounded w-2/5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}