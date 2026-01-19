'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAuthCookie, isAuthenticated } from '../utils/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get redirect URL from query params
  const redirectUrl = searchParams.get('redirect') || '/items';

  // Hardcoded credentials
  const VALID_EMAIL = 'admin@example.com';
  const VALID_PASSWORD = '123456';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push(redirectUrl);
    }
  }, [router, redirectUrl]);

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
    const loadingToast = toast.loading('Signing in...');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      if (formData.email === VALID_EMAIL && formData.password === VALID_PASSWORD) {
        // Success: Set authentication cookie
        const authData = {
          email: formData.email,
          isAuthenticated: true,
          loginTime: new Date().toISOString()
        };

        setAuthCookie(authData);

        // Dispatch custom event to update navbar
        window.dispatchEvent(new Event('authChange'));

        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success(`Welcome back, ${formData.email}!`, {
          duration: 3000,
        });

        // Redirect to the original URL or items page
        setTimeout(() => {
          router.push(redirectUrl);
        }, 1000);
      } else {
        // Failure: Show error message
        toast.dismiss(loadingToast);
        toast.error('Invalid email or password. Please try again.', {
          duration: 4000,
        });
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Login failed. Please try again.', {
        duration: 4000,
      });
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Use the demo credentials to access the app
            </p>
            {redirectUrl !== '/items' && (
              <p className="mt-2 text-center text-sm text-blue-600">
                You need to login to access the requested page
              </p>
            )}
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
            <div className="text-sm text-blue-700">
              <p><strong>Email:</strong> admin@example.com</p>
              <p><strong>Password:</strong> 123456</p>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

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

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <span className="font-medium text-blue-600">
                  Use the demo credentials above
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}