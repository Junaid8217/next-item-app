const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let items = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium quality sound with noise cancellation technology. Perfect for music lovers and professionals.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track your fitness and stay connected with this advanced smartwatch. Features heart rate monitoring and GPS.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Laptop Stand",
    description: "Ergonomic aluminum stand for better posture and productivity. Adjustable height and angle.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    description: "Portable wireless speaker with 360-degree sound. Waterproof design perfect for outdoor activities.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    description: "Professional mechanical keyboard with RGB backlighting. Cherry MX switches for optimal typing experience.",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop"
  }
];

// Helper function to get next ID
const getNextId = () => {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
};

// Routes

// GET /items - Get all items
app.get('/items', (req, res) => {
  try {
    res.json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// GET /items/:id - Get single item by ID
app.get('/items/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// POST /items - Add new item
app.post('/items', (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    
    // Validation
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and price are required'
      });
    }
    
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number'
      });
    }
    
    // Create new item
    const newItem = {
      id: getNextId(),
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
    };
    
    items.push(newItem);
    
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: newItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   GET    /items     - Get all items`);
  console.log(`   GET    /items/:id - Get single item`);
  console.log(`   POST   /items     - Add new item`);
  console.log(`   GET    /health    - Health check`);
});

module.exports = app;