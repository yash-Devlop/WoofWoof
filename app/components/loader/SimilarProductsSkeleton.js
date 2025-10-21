import Image from "next/image";

export default function SimilarProductsSkeleton({ count = 6 }) {
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

      {skeletons.map((i) => (
              <div
              key={i}
              className="min-w-[220px] max-w-[240px] bg-white rounded-xl shadow-xl relative my-4 snap-center flex-shrink-0"
            >
                {/* Discount Badge Skeleton */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="w-12 h-6 bg-gray-200 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                </div>

                {/* Wishlist Icon Skeleton */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                </div>

                {/* Cart Icon Skeleton */}
                <div className="absolute top-12 right-2 z-10">
                  <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                </div>

                {/* Product Image Skeleton */}
                <div className="w-full h-[240px] bg-gray-200 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                </div>

                {/* Product Info Skeleton */}
                <div className="mt-2 px-4 pb-4 space-y-2">
                  {/* Title */}
                  <div className="h-4 bg-gray-200 rounded w-3/4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 rounded w-16 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-12 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="h-4 bg-gray-200 rounded w-20 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                </div>
            </div>
          ))}
        </>
      );
    }