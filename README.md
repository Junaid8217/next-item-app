# Next Item App

A modern, full-stack web application for managing items with authentication, built using Next.js 16 and Express.js. Features a responsive design, protected routes, and real-time toast notifications.

## 🚀 Project Overview

Next Item App is a comprehensive item management system that demonstrates modern web development practices with Next.js App Router, Express.js backend, and cookie-based authentication. Users can browse items, view detailed information, and authenticated users can add new items to the catalog.

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Hot Toast** - Lightweight toast notifications
- **JavaScript** - No TypeScript for simplicity

### Backend
- **Express.js** - Node.js web framework
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-restart
- **In-memory storage** - Simple data persistence

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Git** - Version control

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git** (for cloning)

## 🔧 Setup & Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd next-item-app
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

## 🚀 Running the Application

### Start the Express Backend

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

**Available API Endpoints:**
- `GET /items` - Get all items
- `GET /items/:id` - Get single item
- `POST /items` - Add new item
- `GET /health` - Health check

### Start the Next.js Frontend

In a new terminal window:

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

**Important:** Both servers must be running simultaneously for full functionality.

## 📍 Route Summary

### Public Routes
- **`/`** - Landing page with 7 sections (Hero, Features, Categories, etc.)
- **`/items`** - Browse all items in card layout
- **`/items/[id]`** - View individual item details
- **`/login`** - Authentication page

### Protected Routes
- **`/add-item`** - Add new items (requires authentication)

### Special Files
- **`middleware.js`** - Route protection and authentication
- **`not-found.js`** - Custom 404 pages
- **`loading.js`** - Loading states
- **`error.js`** - Error boundaries

## ✨ Implemented Features

### 🎨 User Interface
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Modern UI** - Clean Tailwind CSS styling
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error pages
- **Toast Notifications** - Success/error feedback

### 🔐 Authentication System
- **Cookie-based Auth** - Secure session management
- **Route Protection** - Middleware-based access control
- **Login/Logout** - Complete authentication flow
- **Auto-redirect** - Return to intended page after login

### 📱 Item Management
- **Browse Items** - Card-based item listing
- **Item Details** - Comprehensive item information
- **Add Items** - Form-based item creation (protected)
- **Image Support** - URL-based image handling with fallbacks
- **API Integration** - Full CRUD operations

### 🛡️ Security Features
- **Input Validation** - Client and server-side validation
- **CORS Protection** - Secure cross-origin requests
- **Cookie Security** - HttpOnly and SameSite settings
- **Error Boundaries** - Graceful error handling

## 🔐 Authentication Explanation

### How Authentication Works

1. **Login Process:**
   - User enters credentials on `/login`
   - Frontend validates against hardcoded credentials
   - On success, creates authentication cookie
   - Redirects to intended page or `/items`

2. **Cookie Management:**
   - **Storage:** Browser cookies with 24-hour expiration
   - **Format:** JSON object with user info and timestamp
   - **Security:** SameSite=Lax, path=/ settings

3. **Route Protection:**
   - **Middleware:** `middleware.js` intercepts requests
   - **Check:** Validates cookie existence and expiration
   - **Action:** Allows access or redirects to login

4. **Session Handling:**
   - **Persistence:** Survives browser refresh
   - **Expiration:** Auto-logout after 24 hours
   - **Cleanup:** Removes invalid/expired cookies

### Demo Credentials

```
Email: admin@example.com
Password: 123456
```

### Protected Routes

Routes requiring authentication:
- `/add-item` - Add new items to catalog

Public routes (no authentication required):
- `/` - Home page
- `/items` - Browse items
- `/items/[id]` - Item details
- `/login` - Authentication

## 🗂️ Project Structure

```
next-item-app/
├── app/                          # Next.js App Router
│   ├── components/               # Reusable components
│   │   ├── Navbar.js            # Navigation with auth state
│   │   ├── Footer.js            # Site footer
│   │   ├── ItemImage.js         # Image with fallback
│   │   ├── ToastProvider.js     # Toast configuration
│   │   └── AuthCheck.js         # Auth wrapper component
│   ├── utils/                   # Utility functions
│   │   └── auth.js              # Authentication helpers
│   ├── items/                   # Items routes
│   │   ├── page.js              # Items listing
│   │   └── [id]/                # Dynamic item routes
│   │       ├── page.js          # Item details
│   │       ├── loading.js       # Loading state
│   │       ├── error.js         # Error boundary
│   │       └── not-found.js     # 404 page
│   ├── add-item/                # Protected route
│   │   └── page.js              # Add item form
│   ├── login/                   # Authentication
│   │   └── page.js              # Login form
│   ├── layout.js                # Root layout
│   ├── page.js                  # Home page
│   └── globals.css              # Global styles
├── backend/                     # Express.js API
│   ├── server.js                # API server
│   ├── package.json             # Backend dependencies
│   └── README.md                # Backend documentation
├── middleware.js                # Route protection
├── package.json                 # Frontend dependencies
└── README.md                    # This file
```

## 🎯 Key Features Breakdown

### Landing Page (7 Sections)
1. **Hero** - Main call-to-action with gradient background
2. **Features** - Key application features with icons
3. **Categories** - Popular item categories
4. **How It Works** - 3-step process explanation
5. **Popular Items** - Featured items showcase
6. **Testimonials** - User reviews and ratings
7. **Call to Action** - Final conversion section

### Item Management
- **Card Layout** - Responsive grid with hover effects
- **Image Handling** - Automatic fallbacks for broken images
- **Price Display** - Formatted currency display
- **Detailed Views** - Comprehensive item information
- **Form Validation** - Client-side input validation

### User Experience
- **Toast Notifications** - Real-time feedback
- **Loading States** - Skeleton loaders and spinners
- **Error Recovery** - Retry mechanisms and clear messaging
- **Responsive Design** - Mobile-first approach
- **Accessibility** - ARIA labels and semantic HTML

## 🔄 Development Workflow

### Making Changes

1. **Frontend changes:** Edit files in `/app` directory
2. **Backend changes:** Edit files in `/backend` directory
3. **Both servers auto-reload** on file changes

### Adding New Routes

1. Create new directory in `/app`
2. Add `page.js` for the route component
3. Optional: Add `loading.js`, `error.js`, `not-found.js`
4. Update navigation in `Navbar.js` if needed

### Database Integration

Currently uses in-memory storage. To add a database:

1. Install database driver (e.g., `mongoose`, `pg`)
2. Update `/backend/server.js` with database connection
3. Replace in-memory `items` array with database queries
4. Add environment variables for database configuration

## 🚀 Deployment

### Quick Deployment Guide

This project is ready for deployment on modern platforms:

**Backend (Railway):**
1. Connect GitHub repository to Railway
2. Set root directory to `backend`
3. Add environment variables: `NODE_ENV=production`
4. Deploy automatically

**Frontend (Vercel):**
1. Connect GitHub repository to Vercel
2. Set framework preset to Next.js
3. Add environment variable: `NEXT_PUBLIC_API_URL=your-backend-url`
4. Deploy automatically

### Detailed Instructions

For complete step-by-step deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Environment Variables

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000  # Local development
# NEXT_PUBLIC_API_URL=https://your-backend.railway.app  # Production
```

**Backend:**
```bash
NODE_ENV=production
PORT=5000
```

### Deployment Platforms

**Recommended:**
- **Frontend:** Vercel (optimized for Next.js)
- **Backend:** Railway (simple Node.js deployment)

**Alternatives:**
- **Frontend:** Netlify, AWS Amplify
- **Backend:** Heroku, DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **React Hot Toast** - For the lightweight toast notifications
- **Unsplash** - For the placeholder images

---

**Built with ❤️ using Next.js 16 and Express.js**