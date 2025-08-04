# COBIT Governance System Design Tool - Full Stack Setup

This guide will help you set up the complete COBIT Governance System Design Tool with both frontend and backend components.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Express)     │◄──►│   (MongoDB)     │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd cobit-governance-system-design-tool

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally (Windows)
# Download from: https://www.mongodb.com/try/download/community

# Start MongoDB service
# Windows: MongoDB runs as a service
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string

### 3. Environment Configuration

#### Frontend (.env.local)
```bash
# Create .env.local in the root directory
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Backend (.env)
```bash
# Create .env in the backend directory
cd backend
cp env.example .env

# Edit .env file:
MONGODB_URI=mongodb://localhost:27017/cobit-tool
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cobit-tool
PORT=5000
```

### 4. Start the Application

#### Terminal 1: Backend
```bash
cd backend
npm run dev
```

#### Terminal 2: Frontend
```bash
# In the root directory
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🔧 Development Workflow

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Development
```bash
cd backend

# Start development server (with auto-restart)
npm run dev

# Start production server
npm start
```

### Database Management
```bash
# Connect to MongoDB shell
mongosh

# Switch to database
use cobit-tool

# View collections
show collections

# View documents
db.cobitdesigns.find()
```

## 📁 Project Structure

```
cobit-governance-system-design-tool/
├── frontend/                    # React application
│   ├── components/             # React components
│   ├── pages/                  # Page components
│   ├── services/               # API services
│   ├── constants/              # COBIT data and mappings
│   ├── types.ts               # TypeScript types
│   └── App.tsx                # Main app component
├── backend/                    # Express.js API
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── server.js              # Express server
│   └── package.json           # Backend dependencies
├── package.json               # Frontend dependencies
└── README.md                  # Main documentation
```

## 🎯 Features

### Frontend Features
- ✅ Multi-step COBIT design process
- ✅ AI-powered analysis and recommendations
- ✅ Interactive visualizations and charts
- ✅ Save/Load designs
- ✅ Responsive design
- ✅ Real-time calculations

### Backend Features
- ✅ RESTful API for design management
- ✅ MongoDB data persistence
- ✅ Input validation
- ✅ Error handling
- ✅ CORS support
- ✅ Environment configuration

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cobit` | Get all designs |
| GET | `/api/cobit/:id` | Get specific design |
| POST | `/api/cobit` | Create new design |
| PUT | `/api/cobit/:id` | Update design |
| DELETE | `/api/cobit/:id` | Delete design |
| GET | `/api/health` | Health check |

## 🧪 Testing

### API Testing
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test designs endpoint
curl http://localhost:5000/api/cobit

# Create test design
curl -X POST http://localhost:5000/api/cobit \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Design", "description": "Test"}'
```

### Frontend Testing
- Open browser developer tools
- Check console for errors
- Test save/load functionality
- Verify API calls in Network tab

## 🚀 Deployment

### Frontend Deployment (GitHub Pages)
```bash
# Build the application
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Backend Deployment (Heroku/Railway/Render)
1. Create account on deployment platform
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`
   - `PORT`
4. Deploy

### Environment Variables for Production
```bash
# Frontend (.env.production)
VITE_API_URL=https://your-backend-url.com

# Backend
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cobit-tool
PORT=5000
NODE_ENV=production
```

## 🔒 Security Considerations

- ✅ Input validation on backend
- ✅ CORS configuration
- ✅ Environment variable management
- ✅ Request size limits
- ⚠️ Add authentication for production
- ⚠️ Add rate limiting for production
- ⚠️ Use HTTPS in production

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start
```bash
# Check if MongoDB is running
mongosh

# Check if port 5000 is available
netstat -an | grep 5000

# Check environment variables
echo $MONGODB_URI
```

#### Frontend can't connect to backend
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check CORS configuration
# Verify API URL in frontend
```

#### Database connection issues
```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/cobit-tool"

# Check MongoDB logs
tail -f /var/log/mongodb/mongod.log
```

### Error Messages

| Error | Solution |
|-------|----------|
| `MongoDB connection error` | Check MongoDB service and connection string |
| `CORS error` | Verify backend CORS configuration |
| `Port already in use` | Change port or kill existing process |
| `Module not found` | Run `npm install` in both directories |

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for errors
4. Verify environment configuration

## 🔄 Updates and Maintenance

### Regular Maintenance
- Update dependencies: `npm update`
- Check for security vulnerabilities: `npm audit`
- Backup database regularly
- Monitor application logs

### Adding New Features
1. Create feature branch
2. Implement frontend changes
3. Implement backend changes
4. Update documentation
5. Test thoroughly
6. Create pull request 