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
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo ""
echo "📋 Deployment Checklist:"
echo "========================"
echo "1. [ ] Push code to GitHub"
echo "2. [ ] Deploy backend to Railway"
echo "3. [ ] Deploy frontend to Vercel"
echo "4. [ ] Configure environment variables"
echo "5. [ ] Test deployed application"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Ready for deployment!"