'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../utils/auth';

export default function AuthCheck({ children, requireAuth = false }) {
  const [isChecking, setIsChecking] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setUserAuthenticated(authenticated);
      setIsChecking(false);

      // If authentication is required but user is not authenticated
      if (requireAuth && !authenticated) {
        router.push('/login');
      }
    };

    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [requireAuth, router]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If auth is required but user is not authenticated, don't render children
  if (requireAuth && !userAuthenticated) {
    return null;
  }

  return children;
}