import Link from 'next/link';
import ItemImage from '../components/ItemImage';

// Force server-side dynamic rendering
export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Use Vercel env variable

// Fetch items from API
async function getItems() {
  try {
    const res = await fetch(`${API_URL}/items`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch items');
    }
    
    const data = await res.json();
    return data.data || data || [];
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Items
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products from our curated collection
          </p>
        </div>

        {/* Items Grid */}
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">
              Unable to load items. Please make sure the API server is running.
            </p>
            <div className="mt-6">
              <Link
                href="/items"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Retry
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Items Count */}
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                >
                  {/* Item Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <ItemImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ${item.price}
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600">
                        ${item.price}
                      </div>
                      
                      <Link
                        href={`/items/${item.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Section */}
            <div className="text-center mt-12">
              <p className="text-gray-500 mb-4">
                You&apos;ve seen all available items
              </p>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
