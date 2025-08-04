# COBIT Backend API

Backend API for the COBIT Governance System Design Tool with MongoDB database.

## Features

- **RESTful API** for COBIT design management
- **MongoDB** database for data persistence
- **Express.js** server with validation
- **CORS** enabled for frontend integration
- **Environment-based configuration**

## API Endpoints

### Designs
- `GET /api/cobit` - Get all designs (summary)
- `GET /api/cobit/:id` - Get specific design
- `POST /api/cobit` - Create new design
- `PUT /api/cobit/:id` - Update existing design
- `DELETE /api/cobit/:id` - Delete design

### Health Check
- `GET /api/health` - Server health status

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/cobit-tool
   PORT=5000
   ```

3. **Start MongoDB:**
   - **Local MongoDB:** Start your local MongoDB service
   - **MongoDB Atlas:** Use the connection string from your Atlas cluster

4. **Run the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## Database Schema

### CobitDesign Model
```javascript
{
  name: String (required),
  description: String,
  context: Object,
  initialScope: Object,
  refinement: Object,
  finalDesign: Object,
  results: Object,
  createdAt: Date,
  updatedAt: Date
}
```

## Development

### Project Structure
```
backend/
├── models/
│   └── CobitDesign.js
├── routes/
│   └── cobitRoutes.js
├── server.js
├── package.json
└── README.md
```

### Adding New Features
1. Create models in `models/` directory
2. Add routes in `routes/` directory
3. Update `server.js` to include new routes
4. Test with Postman or similar tool

## Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
1. Set up environment variables
2. Install dependencies: `npm install`
3. Start server: `npm start`

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/cobit-tool` |
| `PORT` | Server port | `5000` |

## Error Handling

The API includes comprehensive error handling:
- Validation errors (400)
- Not found errors (404)
- Server errors (500)
- Detailed error messages for debugging

## Security Considerations

- Input validation using express-validator
- CORS configuration for frontend integration
- Environment variable management
- Request size limits (50MB)

## Testing

Test the API endpoints using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)

Example curl commands:
```bash
# Get all designs
curl http://localhost:5000/api/cobit

# Create new design
curl -X POST http://localhost:5000/api/cobit \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Design", "description": "Test description"}'
``` 