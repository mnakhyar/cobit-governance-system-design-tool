# COBIT Governance System Design Tool - Docker Setup

Setup lengkap aplikasi COBIT dengan Docker, MongoDB Compass, dan backend API.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   MongoDB       │
│   (React)       │◄──►│   (Express)     │◄──►│   (Docker)      │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

- **Docker Desktop** - https://www.docker.com/products/docker-desktop
- **MongoDB Compass** - https://www.mongodb.com/products/compass
- **Git** (optional)

## 🚀 Quick Start

### **Step 1: Clone Repository**
```bash
git clone <your-repo-url>
cd cobit-governance-system-design-tool
```

### **Step 2: Set Environment Variables**
Buat file `.env` di root directory:
```bash
# Frontend Environment
GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_URL=http://localhost:5000
```

### **Step 3: Start Application**
```bash
# Windows
start-app.bat

# Linux/Mac
./start-app.sh
```

### **Step 4: Access Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB Compass**: mongodb://admin:password123@localhost:27017

## 🔧 MongoDB Compass Setup

### **Connection String untuk MongoDB Compass:**
```
mongodb://admin:password123@localhost:27017/cobit-tool?authSource=admin
```

### **Steps di MongoDB Compass:**
1. Buka MongoDB Compass
2. Klik "New Connection"
3. Paste connection string di atas
4. Klik "Connect"
5. Pilih database `cobit-tool`
6. Lihat collection `cobitdesigns`

## 📊 Database Schema

### **Collection: cobitdesigns**
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  context: {
    organizationType: String,
    industry: String,
    size: String,
    regulatoryRequirements: [String],
    businessObjectives: [String],
    riskTolerance: String
  },
  initialScope: {
    selectedDomains: [String],
    priorityAreas: [String],
    scopeNotes: String
  },
  refinement: {
    detailedProcesses: [{
      domain: String,
      process: String,
      priority: String,
      notes: String
    }],
    resourceAllocation: {
      budget: String,
      timeline: String,
      teamSize: String
    }
  },
  finalDesign: {
    governanceStructure: {
      roles: [String],
      responsibilities: [String],
      reportingLines: [String]
    },
    implementationPlan: {
      phases: [{
        name: String,
        duration: String,
        deliverables: [String]
      }],
      milestones: [String],
      successMetrics: [String]
    },
    riskMitigation: [{
      risk: String,
      mitigation: String,
      owner: String
    }]
  },
  results: {
    overallScore: Number,
    domainScores: [{
      domain: String,
      score: Number
    }],
    recommendations: [String],
    nextSteps: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Features

### **Frontend Features:**
- ✅ **Multi-step COBIT Design Process** (10 Design Factors)
- ✅ **AI-powered Analysis** dengan Gemini API
- ✅ **Interactive Visualizations** dan charts
- ✅ **Save/Load Designs** dengan nama dan deskripsi
- ✅ **Responsive Design** untuk semua device
- ✅ **Real-time Calculations** dan assessments

### **Backend Features:**
- ✅ **RESTful API** untuk design management
- ✅ **MongoDB Data Persistence** dengan indexing
- ✅ **Input Validation** dan error handling
- ✅ **CORS Support** untuk frontend integration
- ✅ **Environment Configuration**

### **Database Features:**
- ✅ **MongoDB 7.0** dengan authentication
- ✅ **Automatic Indexing** untuk performance
- ✅ **Sample Data** untuk testing
- ✅ **Data Persistence** dengan Docker volumes

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/cobit` | Get all designs |
| GET | `/api/cobit/:id` | Get specific design |
| POST | `/api/cobit` | Create new design |
| PUT | `/api/cobit/:id` | Update design |
| DELETE | `/api/cobit/:id` | Delete design |

## 🐳 Docker Commands

### **Start Application:**
```bash
docker-compose up --build -d
```

### **View Logs:**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### **Stop Application:**
```bash
docker-compose down
```

### **Restart Application:**
```bash
docker-compose restart
```

### **View Running Containers:**
```bash
docker ps
```

### **Access Container Shell:**
```bash
# Backend
docker exec -it cobit-backend sh

# MongoDB
docker exec -it cobit-mongodb mongosh

# Frontend
docker exec -it cobit-frontend sh
```

## 🧪 Testing

### **API Testing:**
```bash
# Health check
curl http://localhost:5000/api/health

# Get all designs
curl http://localhost:5000/api/cobit

# Create test design
curl -X POST http://localhost:5000/api/cobit \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Design", "description": "Test"}'
```

### **Database Testing:**
```bash
# Connect to MongoDB
docker exec -it cobit-mongodb mongosh

# Switch to database
use cobit-tool

# View collections
show collections

# View documents
db.cobitdesigns.find()
```

## 🔒 Security

### **MongoDB Security:**
- ✅ **Authentication** enabled
- ✅ **Username/Password** protection
- ✅ **Network isolation** dengan Docker networks
- ✅ **Data persistence** dengan volumes

### **Application Security:**
- ✅ **Input validation** pada backend
- ✅ **CORS configuration** untuk frontend
- ✅ **Environment variables** management
- ✅ **Request size limits** (50MB)

## 🐛 Troubleshooting

### **Common Issues:**

#### **Docker not running:**
```bash
# Start Docker Desktop
# Check Docker status
docker --version
```

#### **Port conflicts:**
```bash
# Check what's using the ports
netstat -an | findstr :3000
netstat -an | findstr :5000
netstat -an | findstr :27017
```

#### **MongoDB connection issues:**
```bash
# Check MongoDB container
docker logs cobit-mongodb

# Test connection
docker exec cobit-mongodb mongosh --eval "db.runCommand('ping')"
```

#### **Backend not responding:**
```bash
# Check backend logs
docker logs cobit-backend

# Test API
curl http://localhost:5000/api/health
```

### **Error Messages:**

| Error | Solution |
|-------|----------|
| `Docker not found` | Install Docker Desktop |
| `Port already in use` | Stop conflicting services |
| `MongoDB connection failed` | Check container logs |
| `CORS error` | Verify backend is running |

## 📞 Support

Untuk masalah dan pertanyaan:
1. Check troubleshooting section
2. Review Docker logs: `docker-compose logs`
3. Check browser console untuk errors
4. Verify environment configuration

## 🔄 Development Workflow

### **Local Development:**
```bash
# Start with Docker
docker-compose up -d

# View logs
docker-compose logs -f

# Make changes to code
# Containers will auto-reload

# Stop when done
docker-compose down
```

### **Adding New Features:**
1. Modify frontend code in `src/`
2. Modify backend code in `backend/`
3. Test with Docker Compose
4. Commit changes to Git

## 📈 Performance

### **Optimizations:**
- ✅ **Docker layer caching** untuk faster builds
- ✅ **MongoDB indexing** untuk faster queries
- ✅ **Volume mounting** untuk development
- ✅ **Health checks** untuk monitoring

### **Monitoring:**
```bash
# View resource usage
docker stats

# View container logs
docker-compose logs -f

# Check MongoDB performance
docker exec cobit-mongodb mongosh --eval "db.stats()"
``` 