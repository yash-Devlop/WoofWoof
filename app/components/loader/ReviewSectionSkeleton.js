import Image from "next/image";

export default function ReviewSectionSkeleton() {
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

      <div className="relative bg-white m-4 rounded-2xl py-8 md:mx-12 md:py-16">
        <div className="h-full w-full absolute inset-0 opacity-30">
          <Image
            src="/images/bgPaws1.png"
            alt="bgpaws"
            fill
            className="h-full w-full"
          />
        </div>

        <div className="px-4 md:px-12 bg-white relative z-10">
          {/* Title Skeleton */}
          <div className="flex justify-center mb-6">
            <div className="h-8 bg-gray-200 rounded w-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
            </div>
          </div>

          {/* Rating Box Skeleton */}
          <div className="bg-gray-100 p-4 rounded-xl max-w-lg mx-auto mb-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-6 h-6 bg-gray-200 rounded overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-24 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
              </div>
            </div>
          </div>

          <div className="border-t my-6 border-gray-200"></div>

          {/* Reviews Grid Skeleton */}
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-xl"
              >
                {/* User Info Skeleton */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-gray-200 rounded w-20 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full w-16 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Stars Skeleton */}
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="w-4 h-4 bg-gray-200 rounded overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                  ))}
                </div>

                {/* Review Text Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-5/6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-4/6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <div className="w-8 h-8 bg-gray-200 rounded overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
              </div>
            ))}
            <div className="w-8 h-8 bg-gray-200 rounded overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}