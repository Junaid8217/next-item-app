export default function Loading() {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Skeleton */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
            <span className="text-gray-400">›</span>
            <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
            <span className="text-gray-400">›</span>
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
          </div>
        </nav>

        {/* Item Details Skeleton */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Skeleton */}
            <div className="relative h-96 md:h-full bg-gray-300 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 text-4xl">📷</div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-8">
              <div className="mb-6">
                {/* Title Skeleton */}
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
                
                {/* Price Skeleton */}
                <div className="h-10 bg-blue-200 rounded w-32 mb-6 animate-pulse"></div>

                {/* Description Section */}
                <div className="mb-6">
                  <div className="h-6 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="mb-8">
                  <div className="h-6 bg-gray-300 rounded w-28 mb-3 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Buttons Skeleton */}
                <div className="space-y-4">
                  <div className="h-12 bg-blue-200 rounded-lg animate-pulse"></div>
                  <div className="flex space-x-4">
                    <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button Skeleton */}
        <div className="mt-8 text-center">
          <div className="h-6 bg-gray-300 rounded w-32 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}