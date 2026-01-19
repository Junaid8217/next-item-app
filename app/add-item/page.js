'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../utils/auth';
import toast from 'react-hot-toast';

export default function AddItemPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const user = getCurrentUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Show loading toast
    const loadingToast = toast.loading('Adding item...');

    try {
      // Validate form data
      if (!formData.name || !formData.description || !formData.price) {
        toast.dismiss(loadingToast);
        toast.error('Please fill in all required fields.');
        setError('Please fill in all required fields.');
        setIsLoading(false);
        return;
      }

      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        toast.dismiss(loadingToast);
        toast.error('Please enter a valid price.');
        setError('Please enter a valid price.');
        setIsLoading(false);
        return;
      }

      // Prepare item data
      const itemData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: price,
        image: formData.image.trim() || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
      };

      // Send to API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const result = await response.json();
      
      if (result.success) {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success(`"${itemData.name}" added successfully!`, {
          duration: 3000,
          icon: '🎉',
        });
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          image: ''
        });
        
        // Redirect to items page after toast duration
        setTimeout(() => {
          router.push('/items');
        }, 2000);
      } else {
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Failed to add item');
        setError(result.message || 'Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to add item. Please make sure the API server is running.', {
        duration: 5000,
      });
      setError('Failed to add item. Please make sure the API server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Add New Item
          </h1>
          <p className="text-lg text-gray-600">
            Welcome, {user?.email}! Add a new item to the catalog.
          </p>
        </div>

        {/* Protected Route Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <div className="text-green-400 mr-3">🔒</div>
            <div>
              <h3 className="text-sm font-medium text-green-800">Protected Route</h3>
              <p className="text-sm text-green-700">
                This page is protected by middleware. Only authenticated users can access it.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Item Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Enter item name"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Enter item description"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (USD) *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image URL (optional)
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave empty to use a default image
              </p>
            </div>

            {/* Image Preview */}
            {formData.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <div className="flex">
                  <div className="text-sm text-red-700">
                    <strong>Error:</strong> {error}
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Item...
                  </div>
                ) : (
                  'Add Item'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/items')}
                disabled={isLoading}
                className="flex-1 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Form Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">💡 Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use descriptive names and detailed descriptions</li>
            <li>• Price should be in USD (e.g., 29.99)</li>
            <li>• Image URLs should be publicly accessible</li>
            <li>• All fields marked with * are required</li>
          </ul>
        </div>
      </div>
    </div>
  );
}