import Link from 'next/link';
import { notFound } from 'next/navigation';
import ItemImage from '../../components/ItemImage';

// Fetch single item from API
async function getItem(id) {
  try {
    // Use different URL for server-side vs client-side
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5000' 
      : process.env.API_URL || 'http://localhost:5000';
    
    const res = await fetch(`${baseUrl}/items/${id}`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch item: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    // For network errors during SSR, return null to show 404
    if (error.code === 'ECONNREFUSED' || error.message.includes('fetch')) {
      return null;
    }
    // Re-throw other errors to be caught by error.js
    throw error;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const item = await getItem(resolvedParams.id);
    
    if (!item) {
      return {
        title: 'Item Not Found',
        description: 'The requested item could not be found.',
      };
    }

    return {
      title: `${item.name} - Next Item App`,
      description: item.description,
      openGraph: {
        title: item.name,
        description: item.description,
        images: [item.image],
      },
    };
  } catch (error) {
    return {
      title: 'Item Details - Next Item App',
      description: 'View item details',
    };
  }
}

export default async function ItemDetailsPage({ params }) {
  const resolvedParams = await params;
  const item = await getItem(resolvedParams.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/items" className="hover:text-blue-600 transition-colors">
              Items
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-gray-900 font-medium">{item.name}</span>
          </div>
        </nav>

        {/* Item Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Item Image */}
            <div className="relative h-96 md:h-full bg-gray-200">
              <ItemImage
                src={item.image}
                alt={`${item.name} product image`}
                className="w-full h-full object-cover"
                fallbackSrc="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
              />
              {/* Image Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-700">#{item.id}</span>
              </div>
            </div>

            {/* Item Information */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {item.name}
                </h1>
                
                <div className="flex items-center mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    ${item.price}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">USD</span>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Item Specifications */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Product Details
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-600 font-medium">Item ID:</span>
                        <span className="font-semibold text-gray-900">#{item.id}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-600 font-medium">Price:</span>
                        <span className="font-semibold text-blue-600">${item.price}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-600 font-medium">Availability:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                          In Stock
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Category:</span>
                        <span className="font-semibold text-gray-900">Electronics</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    Add to Cart
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      className="border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      aria-label={`Add ${item.name} to wishlist`}
                    >
                      💝 Wishlist
                    </button>
                    <button 
                      className="border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      aria-label={`Share ${item.name}`}
                    >
                      📤 Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/items"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Items
          </Link>
          
          <div className="text-sm text-gray-500">
            Item {item.id} of many
          </div>
        </div>

        {/* Related Items Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-gray-200">
            <div className="text-gray-400 text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Related Items Coming Soon
            </h3>
            <p className="text-gray-600">
              We&apos;re working on showing you similar products you might love.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}