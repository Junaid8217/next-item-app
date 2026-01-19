# Next Item App - Backend API

A simple Express.js REST API server for managing items data.

## Features

- ✅ RESTful API endpoints
- ✅ CORS enabled for frontend integration
- ✅ In-memory data storage
- ✅ Input validation
- ✅ Error handling
- ✅ Sample data included

## API Endpoints

### GET /items
Get all items
```
GET http://localhost:5000/items
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "Premium quality sound with noise cancellation technology.",
      "price": 299.99,
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    }
  ],
  "count": 5
}
```

### GET /items/:id
Get single item by ID
```
GET http://localhost:5000/items/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Wireless Headphones",
    "description": "Premium quality sound with noise cancellation technology.",
    "price": 299.99,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
  }
}
```

### POST /items
Add new item
```
POST http://localhost:5000/items
Content-Type: application/json

{
  "name": "New Item",
  "description": "Item description",
  "price": 99.99,
  "image": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "id": 6,
    "name": "New Item",
    "description": "Item description",
    "price": 99.99,
    "image": "https://example.com/image.jpg"
  }
}
```

### GET /health
Health check endpoint
```
GET http://localhost:5000/health
```

## Installation & Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## Sample Data

The server comes with 5 pre-loaded items:
- Wireless Headphones ($299.99)
- Smart Watch ($399.99)
- Laptop Stand ($79.99)
- Bluetooth Speaker ($149.99)
- Mechanical Keyboard ($189.99)

## Testing the API

You can test the API using:
- **Browser**: Visit `http://localhost:5000/items`
- **Postman**: Import the endpoints
- **curl**: Command line testing
- **Frontend**: Connect your Next.js app

### Example curl commands:

```bash
# Get all items
curl http://localhost:5000/items

# Get single item
curl http://localhost:5000/items/1

# Add new item
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","description":"Test description","price":50.00}'
```

## CORS Configuration

CORS is enabled for all origins. In production, you should configure it to only allow your frontend domain:

```javascript
app.use(cors({
  origin: 'http://localhost:3000' // Your Next.js app URL
}));
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Next Steps

- Add more CRUD operations (PUT, DELETE)
- Implement database integration
- Add authentication
- Add data persistence to JSON file
- Add input sanitization
- Add rate limiting