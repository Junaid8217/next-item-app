import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-6">🔍</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Item Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the item you&apos;re looking for.
          </p>
          <div className="space-x-4">
            <Link
              href="/items"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse All Items
            </Link>
            <Link
              href="/"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}