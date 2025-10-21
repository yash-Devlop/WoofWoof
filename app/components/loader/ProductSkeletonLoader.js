import Image from "next/image";

export default function ProductDetailSkeleton() {
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

      <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16 min-h-screen">
        <Image
          src="/images/bgPaws1.png"
          alt="bgpaws"
          fill
          className="h-full w-full absolute inset-0 opacity-30"
        />

        <div className="relative z-10 container mx-auto px-4 py-4 md:px-24 xl:px-20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* LEFT: Product Images Skeleton */}
            <div className="md:sticky top-10">
              {/* Main Image */}
              <div className="w-full md:h-[500px] h-[400px] bg-gray-200 rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Info Skeleton */}
            <div className="mx-auto max-w-md w-full">
              {/* Brand */}
              <div className="h-4 bg-gray-200 rounded w-24 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
              </div>

              {/* Title */}
              <div className="mt-2 h-8 bg-gray-200 rounded w-3/4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
              </div>

              {/* Reviews & Stock */}
              <div className="flex items-center gap-3 mt-3">
                <div className="h-4 bg-gray-200 rounded w-20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-center gap-3">
                <div className="h-6 bg-gray-200 rounded w-20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-16 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-32 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
              </div>

              <div className="mt-3 border border-gray-300"></div>

              {/* Colors */}
              <div className="mt-3 flex items-center gap-3">
                <div className="h-4 bg-gray-200 rounded w-16 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-7 h-7 bg-gray-200 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-3 flex items-center gap-3">
                <div className="h-4 bg-gray-200 rounded w-12 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-8 bg-gray-200 rounded overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Buttons */}
              <div className="flex items-center gap-4 mt-6 flex-wrap">
                <div className="w-32 h-10 bg-gray-200 rounded overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                <div className="w-24 h-10 bg-gray-200 rounded overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                <div className="w-28 h-10 bg-gray-200 rounded overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 border rounded p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-5/6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
              </div>

              {/* Accordion Skeleton */}
              <div className="mt-8 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-md">
                    <div className="p-4 h-14 bg-gray-50 overflow-hidden relative">
                      <div className="h-5 bg-gray-200 rounded w-32 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}