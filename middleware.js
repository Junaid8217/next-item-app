import { NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/add-item'];

// Define public routes that don't require authentication
const publicRoutes = ['/', '/items', '/login', '/items/[id]'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // If it's not a protected route, allow access
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  // Get the auth cookie
  const authCookie = request.cookies.get('auth');
  
  // If no auth cookie exists, redirect to login
  if (!authCookie) {
    const loginUrl = new URL('/login', request.url);
    // Add the original URL as a query parameter for redirect after login
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  try {
    // Parse the auth cookie
    const authData = JSON.parse(authCookie.value);
    
    // Check if user is authenticated
    if (!authData.isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Check if the cookie has expired (24 hours)
    const loginTime = new Date(authData.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      // Cookie expired, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      
      // Clear the expired cookie
      response.cookies.delete('auth');
      return response;
    }
    
    // User is authenticated and cookie is valid, allow access
    return NextResponse.next();
    
  } catch (error) {
    // Invalid cookie format, redirect to login
    console.error('Invalid auth cookie:', error);
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    
    // Clear the invalid cookie
    response.cookies.delete('auth');
    return response;
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};