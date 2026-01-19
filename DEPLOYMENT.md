# 🚀 Deployment Guide - Next Item App

This guide will walk you through deploying both the frontend (Next.js) and backend (Express.js) of your Next Item App.

## 📋 Prerequisites

Before deploying, make sure you have:
- GitHub account
- Vercel account (for frontend)
- Railway account (for backend)
- Your project pushed to GitHub

## 🔧 Step 1: Prepare Your Project

### 1.1 Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/next-item-app.git
git branch -M main
git push -u origin main
```

### 1.2 Environment Variables Setup

Your project is already configured with environment variables:
- `.env.local` - Local development
- `.env.example` - Template for deployment

## 🖥️ Step 2: Deploy Backend (Railway)

### 2.1 Create Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Connect your GitHub account

### 2.2 Deploy Backend
1. **Click "New Project"**
2. **Select "Deploy from GitHub repo"**
3. **Choose your repository**
4. **Select the backend folder** (important!)
   - Railway should detect the `backend` folder
   - If not, set the root directory to `backend`

### 2.3 Configure Backend Environment
1. **Go to your project dashboard**
2. **Click on "Variables" tab**
3. **Add these environment variables:**
   ```
   NODE_ENV=production
   PORT=5000
   ```

### 2.4 Configure Build Settings
1. **Go to "Settings" tab**
2. **Set Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`

### 2.5 Get Backend URL
After deployment, Railway will provide a URL like:
```
https://your-app-name.railway.app
```
**Save this URL - you'll need it for the frontend!**

## 🌐 Step 3: Deploy Frontend (Vercel)

### 3.1 Create Vercel Account
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Connect your GitHub account

### 3.2 Deploy Frontend
1. **Click "New Project"**
2. **Import your GitHub repository**
3. **Configure project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** Leave empty (uses root)
   - **Build Command:** `npm run build`
   - **Output Directory:** Leave empty

### 3.3 Configure Environment Variables
1. **In the deployment settings, add:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```
   (Replace with your actual Railway backend URL)

### 3.4 Deploy
1. **Click "Deploy"**
2. **Wait for deployment to complete**
3. **Get your frontend URL** (e.g., `https://your-app.vercel.app`)

## 🔄 Step 4: Update CORS Configuration

### 4.1 Update Backend CORS
1. **Go to Railway dashboard**
2. **Click on your backend service**
3. **Go to "Variables" tab**
4. **Add environment variable:**
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```

### 4.2 Update server.js (if needed)
The backend is already configured to use environment variables for CORS.

## ✅ Step 5: Test Your Deployment

### 5.1 Test Backend
Visit your Railway URL:
```
https://your-backend-url.railway.app/health
```
You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-19T...",
  "environment": "production"
}
```

### 5.2 Test Frontend
1. **Visit your Vercel URL**
2. **Test all functionality:**
   - Browse items
   - View item details
   - Login (admin@example.com / 123456)
   - Add new items (when logged in)

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. CORS Errors
**Problem:** Frontend can't connect to backend
**Solution:** 
- Check `NEXT_PUBLIC_API_URL` in Vercel
- Verify CORS configuration in backend
- Ensure both URLs are HTTPS

#### 2. Environment Variables Not Working
**Problem:** API calls failing
**Solution:**
- Verify `NEXT_PUBLIC_API_URL` is set in Vercel
- Check Railway environment variables
- Redeploy both services

#### 3. Backend Not Starting
**Problem:** Railway deployment fails
**Solution:**
- Check build logs in Railway
- Verify `package.json` has correct start script
- Ensure all dependencies are listed

#### 4. 404 Errors on Refresh
**Problem:** Next.js routes return 404
**Solution:**
- Vercel handles this automatically for Next.js
- Check if deployment used correct framework preset

## 📱 Step 6: Custom Domain (Optional)

### 6.1 Frontend Domain (Vercel)
1. **Go to project settings**
2. **Click "Domains" tab**
3. **Add your custom domain**
4. **Follow DNS configuration instructions**

### 6.2 Backend Domain (Railway)
1. **Go to project settings**
2. **Click "Networking" tab**
3. **Add custom domain**
4. **Update frontend environment variable**

## 🔄 Step 7: Continuous Deployment

Both platforms support automatic deployment:

### Vercel (Frontend)
- **Automatic:** Deploys on every push to main branch
- **Preview:** Creates preview deployments for pull requests

### Railway (Backend)
- **Automatic:** Deploys on every push to main branch
- **Manual:** Can trigger manual deployments

## 📊 Monitoring & Logs

### Vercel Logs
1. **Go to project dashboard**
2. **Click "Functions" tab**
3. **View real-time logs**

### Railway Logs
1. **Go to project dashboard**
2. **Click "Deployments" tab**
3. **View build and runtime logs**

## 🚀 Final Checklist

- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS properly set up
- [ ] All routes working
- [ ] Authentication functional
- [ ] Items CRUD operations working
- [ ] Toast notifications appearing

## 📞 Support

If you encounter issues:

1. **Check deployment logs** in Railway/Vercel dashboards
2. **Verify environment variables** are correctly set
3. **Test API endpoints** directly in browser
4. **Check browser console** for frontend errors

## 🎉 Success!

Your Next Item App should now be live at:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.railway.app`

Both services will automatically redeploy when you push changes to GitHub!

---

**Need help?** Check the logs in your deployment dashboards or refer to the platform documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)