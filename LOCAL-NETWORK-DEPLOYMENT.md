# 🌐 Local Network Deployment Guide

## **Overview**

Deploy COBIT Governance System Design Tool di jaringan lokal Anda untuk akses dari komputer lain dalam network yang sama.

## **🏗️ Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    LOCAL NETWORK                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Computer 1    │  │   Computer 2    │  │   Computer  │ │
│  │   (192.168.1.5) │  │   (192.168.1.6) │  │   (192.168. │ │
│  │   Browser       │  │   Browser       │  │   1.7)      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    HOST COMPUTER                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Nginx         │  │   React App     │  │   MongoDB   │ │
│  │   Port 8080     │  │   Port 80       │  │   Port 27017│ │
│  │   (Frontend)    │  │   (Static)      │  │   (Database)│ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│  ┌─────────────────┐                                       │
│  │   Express.js    │                                       │
│  │   Port 5000     │                                       │
│  │   (Backend API) │                                       │
│  └─────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

## **🚀 Quick Start**

### **Option 1: Windows (Recommended)**

```bash
# Run deployment script
deploy-local.bat
```

### **Option 2: Linux/Mac**

```bash
# Make script executable
chmod +x deploy-local.sh

# Run deployment script
./deploy-local.sh
```

### **Option 3: Manual Docker Compose**

```bash
# Build and start services
docker-compose -f docker-compose.local.yml up --build -d

# Check status
docker-compose -f docker-compose.local.yml ps
```

## **📋 Prerequisites**

### **1. System Requirements**
- **OS**: Windows 10/11, Linux, macOS
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: 2GB free space
- **Network**: Local network access

### **2. Software Requirements**
- **Docker**: Version 20.10+
- **Docker Compose**: Version 2.0+
- **Git**: For cloning repository

### **3. Network Requirements**
- **Local Network**: All computers in same network
- **Firewall**: Allow ports 80, 5000, 8080, 27017
- **Router**: No special configuration needed

## **🔧 Configuration**

### **1. Network Configuration**

#### **Find Your Local IP:**
```bash
# Windows
ipconfig

# Linux/Mac
ifconfig
# or
hostname -I
```

#### **Update Configuration:**
```yaml
# docker-compose.local.yml
environment:
  - VITE_API_URL=http://YOUR_LOCAL_IP:5000
```

### **2. Port Configuration**

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 8080 | Web interface |
| Backend | 5000 | API endpoints |
| MongoDB | 27017 | Database |
| Nginx | 80 | Reverse proxy |

### **3. Security Configuration**

#### **Firewall Rules:**
```bash
# Windows Firewall
netsh advfirewall firewall add rule name="COBIT Frontend" dir=in action=allow protocol=TCP localport=8080
netsh advfirewall firewall add rule name="COBIT Backend" dir=in action=allow protocol=TCP localport=5000
netsh advfirewall firewall add rule name="COBIT MongoDB" dir=in action=allow protocol=TCP localport=27017

# Linux UFW
sudo ufw allow 8080
sudo ufw allow 5000
sudo ufw allow 27017
```

## **🌐 Access URLs**

### **From Host Computer:**
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000/api/cobit
- **Health Check**: http://localhost:8080/health

### **From Network Computers:**
- **Frontend**: http://YOUR_LOCAL_IP:8080
- **Backend API**: http://YOUR_LOCAL_IP:5000/api/cobit
- **Health Check**: http://YOUR_LOCAL_IP:8080/health

### **Example Network Access:**
```
Host IP: 192.168.1.100
Network Access:
- Frontend: http://192.168.1.100:8080
- API: http://192.168.1.100:5000/api/cobit
- MongoDB: mongodb://192.168.1.100:27017
```

## **🔍 Troubleshooting**

### **1. Port Already in Use**
```bash
# Check what's using the port
netstat -ano | findstr :8080

# Kill process (Windows)
taskkill /PID <PID> /F

# Kill process (Linux)
sudo kill -9 <PID>
```

### **2. Docker Issues**
```bash
# Restart Docker
sudo systemctl restart docker

# Clean up containers
docker-compose -f docker-compose.local.yml down
docker system prune -f
```

### **3. Network Connectivity**
```bash
# Test connectivity
ping YOUR_LOCAL_IP

# Test port access
telnet YOUR_LOCAL_IP 8080
```

### **4. Service Status**
```bash
# Check all services
docker-compose -f docker-compose.local.yml ps

# Check logs
docker-compose -f docker-compose.local.yml logs

# Check specific service
docker-compose -f docker-compose.local.yml logs frontend
```

## **📊 Performance Optimization**

### **1. Resource Allocation**
```yaml
# docker-compose.local.yml
services:
  frontend:
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
```

### **2. Caching Configuration**
```nginx
# nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### **3. Database Optimization**
```javascript
// MongoDB connection options
mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

## **🔒 Security Considerations**

### **1. Network Security**
- **Local Network Only**: Don't expose to internet
- **Firewall Rules**: Restrict access to local network
- **VPN**: Use VPN for remote access if needed

### **2. Application Security**
- **HTTPS**: Consider SSL certificate for production
- **Authentication**: Add user authentication if needed
- **Input Validation**: All inputs are validated

### **3. Data Security**
- **Backup**: Regular database backups
- **Encryption**: Consider encrypting sensitive data
- **Access Control**: Limit database access

## **📈 Monitoring**

### **1. Health Checks**
```bash
# Frontend health
curl http://YOUR_LOCAL_IP:8080/health

# Backend health
curl http://YOUR_LOCAL_IP:5000/api/health

# Database health
docker exec cobit-mongodb-local mongosh --eval "db.adminCommand('ping')"
```

### **2. Log Monitoring**
```bash
# View all logs
docker-compose -f docker-compose.local.yml logs -f

# View specific service logs
docker-compose -f docker-compose.local.yml logs -f frontend
docker-compose -f docker-compose.local.yml logs -f backend
```

### **3. Resource Monitoring**
```bash
# Check resource usage
docker stats

# Check disk usage
docker system df
```

## **🔄 Maintenance**

### **1. Regular Updates**
```bash
# Pull latest changes
git pull origin main

# Rebuild containers
docker-compose -f docker-compose.local.yml up --build -d
```

### **2. Database Backup**
```bash
# Create backup
docker exec cobit-mongodb-local mongodump --out /backup

# Restore backup
docker exec cobit-mongodb-local mongorestore /backup
```

### **3. Cleanup**
```bash
# Stop services
docker-compose -f docker-compose.local.yml down

# Remove volumes (WARNING: Data loss)
docker-compose -f docker-compose.local.yml down -v

# Clean up Docker
docker system prune -f
```

## **🎯 Benefits of Local Network Deployment**

### **1. Performance**
- ✅ **Low Latency**: Direct network access
- ✅ **High Bandwidth**: Local network speeds
- ✅ **No Internet Dependency**: Works offline

### **2. Security**
- ✅ **Network Isolation**: No internet exposure
- ✅ **Data Control**: Complete data ownership
- ✅ **Access Control**: Network-level security

### **3. Cost**
- ✅ **No Cloud Costs**: Free local deployment
- ✅ **No Bandwidth Costs**: Local network usage
- ✅ **No Subscription Fees**: One-time setup

### **4. Control**
- ✅ **Full Control**: Complete system control
- ✅ **Customization**: Easy to modify
- ✅ **Integration**: Easy to integrate with local systems

## **📞 Support**

### **Common Issues:**
1. **Port conflicts**: Change ports in docker-compose.local.yml
2. **Network access**: Check firewall settings
3. **Performance**: Allocate more resources
4. **Data loss**: Regular backups

### **Getting Help:**
- Check logs: `docker-compose -f docker-compose.local.yml logs`
- Restart services: `docker-compose -f docker-compose.local.yml restart`
- Rebuild: `docker-compose -f docker-compose.local.yml up --build -d`

**Aplikasi COBIT Governance System Design Tool siap untuk deployment di jaringan lokal Anda!** 