# 🔧 Troubleshooting Guide

Common issues and solutions for the Next Item App deployment.

## 🚨 "Failed to add item" Error on Netlify

### Problem
When trying to add items on the deployed Netlify site, you get the error:
```
Failed to add item. Please make sure the API server is running.
```

### Root Cause
This happens because of CORS (Cross-Origin Resource Sharing) issues when making POST requests from the Netlify frontend directly to the Vercel backend. While GET requests work fine, POST requests can be blocked by browser security policies.

### Solution ✅
We've implemented a Next.js API route that acts as a proxy:

1. **Frontend** → Makes POST request to `/api/items` (same domain)
2. **Next.js API Route** → Proxies request to Vercel backend
3. **Vercel Backend** → Processes request and returns response
4. **Next.js API Route** → Returns response to frontend

### Files Changed
- `app/api/items/route.js` - New API proxy route
- `app/add-item/page.js` - Updated to use `/api/items` instead of direct backend calls

### How It Works
```javascript
// Before (direct call - CORS issues)
fetch('https://backend-theta-mocha-24.vercel.app/items', { method: 'POST' })

// After (via API route - no CORS issues)
fetch('/api/items', { method: 'POST' })
```

## 🌐 Environment Variables Not Working

### Problem
Environment variables like `NEXT_PUBLIC_API_URL` are undefined in production.

### Solution
1. **Check Netlify Dashboard**: Go to Site Settings → Environment Variables
2. **Add Variable**: `NEXT_PUBLIC_API_URL` = `https://backend-theta-mocha-24.vercel.app`
3. **Redeploy**: Trigger a new deployment after adding variables

### Verification
Add this to any component to debug:
```javascript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
```

## 🔒 Authentication Issues

### Problem
Login works locally but fails on Netlify.

### Common Causes
1. **Cookie Settings**: Ensure cookies work across domains
2. **HTTPS**: Make sure both frontend and backend use HTTPS
3. **Environment**: Check if auth logic handles production environment

### Solution
Check browser developer tools:
1. **Network Tab**: Look for failed requests
2. **Application Tab**: Check if cookies are being set
3. **Console**: Look for JavaScript errors

## 📱 Items Not Loading

### Problem
Items page shows "No items found" on Netlify but works locally.

### Debugging Steps
1. **Check Network Tab**: Are API calls being made?
2. **Check Response**: What status code is returned?
3. **Check Console**: Any JavaScript errors?

### Common Solutions
- Verify backend URL is correct
- Check if backend is deployed and running
- Ensure CORS is properly configured

## 🔍 General Debugging Steps

### 1. Check Browser Console
```javascript
// Add to any component for debugging
console.log('Environment:', process.env.NODE_ENV);
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
```

### 2. Test Backend Directly
```bash
# Test health endpoint
curl https://backend-theta-mocha-24.vercel.app/health

# Test items endpoint
curl https://backend-theta-mocha-24.vercel.app/items

# Test POST endpoint
curl -X POST https://backend-theta-mocha-24.vercel.app/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test","price":99.99}'
```

### 3. Check Netlify Build Logs
1. Go to Netlify Dashboard
2. Click on your site
3. Go to "Deploys" tab
4. Click on latest deploy
5. Check build logs for errors

### 4. Check Netlify Function Logs
1. Go to Netlify Dashboard
2. Click on "Functions" tab
3. Check logs for API route errors

## 🚀 Deployment Checklist

Before reporting issues, verify:

- [ ] Backend is deployed and accessible
- [ ] Environment variables are set in Netlify
- [ ] Latest code is pushed to GitHub
- [ ] Netlify has auto-deployed the latest changes
- [ ] Browser cache is cleared
- [ ] Testing in incognito/private mode

## 📞 Getting Help

If issues persist:

1. **Check Browser Console** for specific error messages
2. **Check Network Tab** to see failed requests
3. **Test Backend Directly** to isolate frontend vs backend issues
4. **Check Deployment Logs** in both Netlify and Vercel dashboards

## 🔄 Quick Fixes

### Clear Browser Cache
- Chrome: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or use incognito/private mode

### Force Netlify Redeploy
1. Go to Netlify Dashboard
2. Click "Trigger deploy" → "Deploy site"

### Check Environment Variables
```javascript
// Add this to any page to debug
export default function DebugPage() {
  return (
    <div>
      <h1>Debug Info</h1>
      <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
      <p>Node Env: {process.env.NODE_ENV}</p>
    </div>
  );
}
```

---

**Most issues are resolved by the API proxy route fix above!** 🎉