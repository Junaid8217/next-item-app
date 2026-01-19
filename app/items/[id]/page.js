import Link from "next/link";
import { notFound } from "next/navigation";
import ItemImage from "../../components/ItemImage";

// Force dynamic server-side rendering
export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Must be set in Vercel

// Fetch single item
async function getItem(id) {
  try {
    const res = await fetch(`${API_URL}/items/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch item");
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error("Error fetching item:", error);
    return null; // Show 404 if fetch fails
  }
}

// Metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const item = await getItem(resolvedParams.id);
  if (!item) return { title: "Item Not Found", description: "Item not found." };
  return {
    title: `${item.name} - Next Item App`,
    description: item.description,
    openGraph: { title: item.name, description: item.description, images: [item.image] },
  };
}

export default async function ItemDetailsPage({ params }) {
  const resolvedParams = await params;
  const item = await getItem(resolvedParams.id);

  if (!item) notFound(); // 404 if no item

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link href="/items" className="hover:text-blue-600">Items</Link>
            <span>›</span>
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
                alt={item.name}
                className="w-full h-full object-cover"
                fallbackSrc="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
              />
            </div>

            {/* Item Info */}
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
              <div className="flex items-center mb-6">
                <span className="text-4xl font-bold text-blue-600">${item.price}</span>
                <span className="ml-3 text-sm text-gray-500">USD</span>
              </div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{item.description}</p>
              <div className="mt-8 space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link href="/items" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Items
          </Link>
        </div>
      </div>
    </div>
  );
}
