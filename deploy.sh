#!/bin/bash

# Next Item App Deployment Helper Script
echo "🚀 Next Item App - Deployment Helper"
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Initializing..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
else
    echo "✅ Git repository found"
fi

# Check for environment files
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local not found. Creating from example..."
    cp .env.example .env.local
    echo "📝 Please update .env.local with your API URL"
else
    echo "✅ Environment file found"
fi

# Build and test locally
echo "🔨 Building project locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
    
    # Add and commit changes
    echo "📦 Adding changes to git..."
    git add .
    
    echo "💾 Committing changes..."
    git commit -m "Fix Suspense boundary issue for production deployment

- Add export const dynamic = 'force-dynamic' to login page
- Add proper window checks for browser-only code
- Ensure proper SSR handling for useSearchParams
- Fix Vercel deployment build errors"
    
    echo "🚀 Pushing to GitHub..."
    git push origin main
    
    echo "✅ Code pushed successfully!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo ""
echo "📋 Deployment Status:"
echo "===================="
echo "✅ Code pushed to GitHub"
echo "🔄 Vercel will auto-deploy from GitHub"
echo "🔄 Check Vercel dashboard for deployment status"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Deployment process completed!"