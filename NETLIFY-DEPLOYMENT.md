# 🚀 Netlify Deployment Guide

This guide will help you deploy your Next.js frontend to Netlify.

## ✅ Prerequisites

- [x] Backend deployed to Vercel: `https://backend-theta-mocha-24.vercel.app`
- [x] GitHub repository with your code
- [x] Netlify account (free tier is sufficient)

## 📋 Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Netlify deployment with production environment"
git push origin main
```

### 2. Connect to Netlify

1. Go to [Netlify](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose "GitHub" as your Git provider
4. Select your repository: `next-item-app`
5. Configure build settings:
   - **Base directory**: Leave empty (root)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### 3. Environment Variables

In Netlify dashboard, go to:
**Site settings** → **Environment variables** → **Add variable**

Add this environment variable:
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://backend-theta-mocha-24.vercel.app`

### 4. Deploy Settings

Netlify will automatically detect it's a Next.js project and use the appropriate build settings.

The `netlify.toml` file in your project root will handle:
- Build configuration
- Environment variables
- Next.js plugin integration
- Redirects for SPA routing

### 5. Deploy

Click "Deploy site" and wait for the build to complete.

## 🔧 Configuration Files

### netlify.toml
```toml
[build]
  publish = ".next"
  command = "npm run build"

[build.environment]
  NEXT_PUBLIC_API_URL = "https://backend-theta-mocha-24.vercel.app"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### .env.production
```env
NEXT_PUBLIC_API_URL=https://backend-theta-mocha-24.vercel.app
```

## 🧪 Testing After Deployment

Once deployed, test these features:

1. **Homepage**: Should load without errors
2. **Items page**: Should display items from your Vercel backend
3. **Item details**: Should show individual item details
4. **Login**: Should work with credentials (admin@example.com / 123456)
5. **Add item**: Should work when logged in
6. **Toast notifications**: Should appear for actions

## 🔍 Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### API Requests Fail
- Check browser console for CORS errors
- Verify backend URL is correct
- Test backend endpoints directly

### Pages Don't Load
- Check if redirects are working
- Verify Next.js plugin is installed
- Check for JavaScript errors in console

## 📱 Post-Deployment

After successful deployment:

1. **Update CORS**: Once you have your Netlify URL, update the backend CORS settings
2. **Custom Domain**: Configure a custom domain if desired
3. **SSL**: Netlify provides free SSL certificates
4. **Performance**: Monitor site performance and optimize if needed

## 🎉 Success Criteria

Your deployment is successful when:

- ✅ Site loads at your Netlify URL
- ✅ All pages are accessible
- ✅ API calls work correctly
- ✅ Authentication functions properly
- ✅ No console errors
- ✅ Mobile responsive design works

## 📞 Support Resources

- [Netlify Next.js Documentation](https://docs.netlify.com/frameworks/next-js/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Netlify Support](https://docs.netlify.com/)

---

**Ready to deploy!** 🚀

Your Next.js app is configured and ready for Netlify deployment.