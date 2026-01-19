// Cookie utility functions for authentication

// Get authentication data from cookie
export function getAuthFromCookie() {
  if (typeof document === 'undefined') return null; // Server-side check
  
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
  
  if (!authCookie) return null;
  
  try {
    const authValue = authCookie.split('=')[1];
    return JSON.parse(decodeURIComponent(authValue));
  } catch (error) {
    console.error('Error parsing auth cookie:', error);
    return null;
  }
}

// Set authentication cookie
export function setAuthCookie(authData) {
  if (typeof document === 'undefined') return; // Server-side check
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // 24 hours
  
  const cookieValue = encodeURIComponent(JSON.stringify(authData));
  document.cookie = `auth=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

// Remove authentication cookie (logout)
export function removeAuthCookie() {
  if (typeof document === 'undefined') return; // Server-side check
  
  document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Check if user is authenticated
export function isAuthenticated() {
  const auth = getAuthFromCookie();
  return auth && auth.isAuthenticated === true;
}

// Get current user info
export function getCurrentUser() {
  const auth = getAuthFromCookie();
  return auth ? { email: auth.email, loginTime: auth.loginTime } : null;
}