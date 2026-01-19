'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-6xl text-red-400 mb-6">⚠️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We encountered an error while loading this item.
          </p>
          
          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Details:</h3>
              <p className="text-red-700 text-sm font-mono">
                {error.message || 'Unknown error occurred'}
              </p>
            </div>
          )}

          <div className="space-x-4">
            <button
              onClick={reset}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/items"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Browse All Items
            </Link>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}