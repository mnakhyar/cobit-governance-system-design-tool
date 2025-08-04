# COBIT Governance System Design Tool

A React-based application for designing and analyzing COBIT governance systems with AI assistance.

## 🌟 Features

- **Multi-step design process** for COBIT governance systems
- **Interactive visualizations** and charts using Recharts
- **Real-time calculations** and assessments
- **Save/Load functionality** with MongoDB backend
- **Print/Export** capabilities for reports
- **Responsive design** for all devices
- **Error handling** with user-friendly messages

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Components    │  │   Pages         │  │   Services  │ │
│  │   (UI Elements) │  │   (Routes)      │  │   (Logic)   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Express.js    │  │   REST API      │  │   MongoDB   │ │
│  │   (Server)      │  │   (Endpoints)   │  │   (Database)│ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Deployment Options

### **Option 1: Local Development**

**Prerequisites:** Node.js 18+

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   ```bash
   # Create .env.local file
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Access:** http://localhost:5173

### **Option 2: GitHub Pages (Cloud)**

**For public access via internet**

1. **Deploy automatically:**
   ```bash
   git add .
   git commit -m "Update"
   git push origin main
   # GitHub Actions will auto-deploy
   ```

2. **Manual deploy:**
   ```bash
   npm run deploy
   ```

3. **Access:** https://mnakhyar.github.io/cobit-governance-system-design-tool

### **Option 3: Local Network Server** ⭐ **Recommended for Internal Use**

**For deployment on internal network server**

#### **Quick Start:**

**Windows:**
```bash
deploy-local.bat
```

**Linux/Mac:**
```bash
chmod +x deploy-local.sh
./deploy-local.sh
```

**Manual:**
```bash
docker-compose -f docker-compose.local.yml up --build -d
```

#### **Network Access:**
- **Frontend:** http://YOUR_SERVER_IP:8080
- **Backend API:** http://YOUR_SERVER_IP:5000/api/cobit
- **Health Check:** http://YOUR_SERVER_IP:8080/health

#### **Example Network URLs:**
```
Server IP: 192.168.1.100
Network Access:
- Frontend: http://192.168.1.100:8080
- API: http://192.168.1.100:5000/api/cobit
- MongoDB: mongodb://192.168.1.100:27017
```

### **Option 4: Production Server**

**For enterprise deployment**

#### **System Requirements:**
- **OS:** Ubuntu 20.04+ / CentOS 8+ / Windows Server 2019+
- **RAM:** 4GB minimum (8GB recommended)
- **Storage:** 10GB free space
- **Network:** Static IP address

#### **Installation Steps:**

1. **Install Docker:**
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   # CentOS/RHEL
   sudo yum install -y docker
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

2. **Clone Repository:**
   ```bash
   git clone https://github.com/mnakhyar/cobit-governance-system-design-tool.git
   cd cobit-governance-system-design-tool
   ```

3. **Configure Network:**
   ```bash
   # Update IP address in configuration
   sed -i "s/YOUR_LOCAL_IP/YOUR_SERVER_IP/g" docker-compose.local.yml
   ```

4. **Deploy:**
   ```bash
   docker-compose -f docker-compose.local.yml up --build -d
   ```

5. **Configure Firewall:**
   ```bash
   # Ubuntu UFW
   sudo ufw allow 8080
   sudo ufw allow 5000
   sudo ufw allow 27017
   
   # CentOS Firewalld
   sudo firewall-cmd --permanent --add-port=8080/tcp
   sudo firewall-cmd --permanent --add-port=5000/tcp
   sudo firewall-cmd --permanent --add-port=27017/tcp
   sudo firewall-cmd --reload
   ```

#### **Production Configuration:**

**Environment Variables:**
```bash
# Create .env file
NODE_ENV=production
MONGODB_URI=mongodb://admin:password123@mongodb:27017/cobit-tool?authSource=admin
PORT=5000
VITE_API_URL=http://YOUR_SERVER_IP:5000
```

**SSL Certificate (Optional):**
```bash
# Install Certbot
sudo apt install certbot

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com

# Update nginx.conf with SSL configuration
```

**Monitoring:**
```bash
# Check service status
docker-compose -f docker-compose.local.yml ps

# View logs
docker-compose -f docker-compose.local.yml logs -f

# Monitor resources
docker stats
```

## 📋 Prerequisites

### **For Local Development:**
- ✅ Node.js 18+
- ✅ npm or yarn
- ✅ Git

### **For Network Deployment:**
- ✅ Docker 20.10+
- ✅ Docker Compose 2.0+
- ✅ 4GB RAM minimum
- ✅ Static IP address
- ✅ Firewall access

### **For Production:**
- ✅ Ubuntu 20.04+ / CentOS 8+ / Windows Server 2019+
- ✅ 8GB RAM recommended
- ✅ 20GB storage
- ✅ SSL certificate (optional)
- ✅ Domain name (optional)

## 🔧 Configuration

### **Port Configuration:**

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 8080 | Web interface |
| Backend | 5000 | API endpoints |
| MongoDB | 27017 | Database |
| Nginx | 80 | Reverse proxy |

### **Environment Variables:**

```bash
# Frontend (.env.local)
GEMINI_API_KEY=your_api_key_here
VITE_API_URL=http://YOUR_SERVER_IP:5000

# Backend (.env)
NODE_ENV=production
MONGODB_URI=mongodb://admin:password123@mongodb:27017/cobit-tool?authSource=admin
PORT=5000
```

## 🔍 Troubleshooting

### **Common Issues:**

1. **Port Already in Use:**
   ```bash
   # Check what's using the port
   netstat -ano | findstr :8080
   
   # Kill process (Windows)
   taskkill /PID <PID> /F
   
   # Kill process (Linux)
   sudo kill -9 <PID>
   ```

2. **Docker Issues:**
   ```bash
   # Restart Docker
   sudo systemctl restart docker
   
   # Clean up containers
   docker-compose -f docker-compose.local.yml down
   docker system prune -f
   ```

3. **Network Connectivity:**
   ```bash
   # Test connectivity
   ping YOUR_SERVER_IP
   
   # Test port access
   telnet YOUR_SERVER_IP 8080
   ```

### **Service Status:**
```bash
# Check all services
docker-compose -f docker-compose.local.yml ps

# Check logs
docker-compose -f docker-compose.local.yml logs

# Check specific service
docker-compose -f docker-compose.local.yml logs frontend
```

## 📊 Performance Optimization

### **Resource Allocation:**
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

### **Caching Configuration:**
```nginx
# nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔒 Security Considerations

### **Network Security:**
- **Local Network Only:** Don't expose to internet
- **Firewall Rules:** Restrict access to local network
- **VPN:** Use VPN for remote access if needed

### **Application Security:**
- **HTTPS:** Consider SSL certificate for production
- **Authentication:** Add user authentication if needed
- **Input Validation:** All inputs are validated

### **Data Security:**
- **Backup:** Regular database backups
- **Encryption:** Consider encrypting sensitive data
- **Access Control:** Limit database access

## 📈 Monitoring

### **Health Checks:**
```bash
# Frontend health
curl http://YOUR_SERVER_IP:8080/health

# Backend health
curl http://YOUR_SERVER_IP:5000/api/health

# Database health
docker exec cobit-mongodb-local mongosh --eval "db.adminCommand('ping')"
```

### **Log Monitoring:**
```bash
# View all logs
docker-compose -f docker-compose.local.yml logs -f

# View specific service logs
docker-compose -f docker-compose.local.yml logs -f frontend
docker-compose -f docker-compose.local.yml logs -f backend
```

## 🔄 Maintenance

### **Regular Updates:**
```bash
# Pull latest changes
git pull origin main

# Rebuild containers
docker-compose -f docker-compose.local.yml up --build -d
```

### **Database Backup:**
```bash
# Create backup
docker exec cobit-mongodb-local mongodump --out /backup

# Restore backup
docker exec cobit-mongodb-local mongorestore /backup
```

### **Cleanup:**
```bash
# Stop services
docker-compose -f docker-compose.local.yml down

# Remove volumes (WARNING: Data loss)
docker-compose -f docker-compose.local.yml down -v

# Clean up Docker
docker system prune -f
```

## 🎯 Benefits by Deployment Type

### **Local Network Deployment:**
- ✅ **Low Latency:** Direct network access
- ✅ **High Bandwidth:** Local network speeds
- ✅ **No Internet Dependency:** Works offline
- ✅ **Data Control:** Complete data ownership
- ✅ **Cost Effective:** No cloud costs
- ✅ **Full Control:** Complete system control

### **GitHub Pages Deployment:**
- ✅ **Easy Setup:** One-click deployment
- ✅ **Free Hosting:** No server costs
- ✅ **Global Access:** Available worldwide
- ✅ **Automatic Updates:** CI/CD pipeline

### **Production Server:**
- ✅ **Enterprise Ready:** Professional setup
- ✅ **Scalable:** Handle multiple users
- ✅ **Secure:** Full security control
- ✅ **Customizable:** Complete customization

## 📞 Support

### **Getting Help:**
- **Check logs:** `docker-compose -f docker-compose.local.yml logs`
- **Restart services:** `docker-compose -f docker-compose.local.yml restart`
- **Rebuild:** `docker-compose -f docker-compose.local.yml up --build -d`

### **Documentation:**
- **Local Network Deployment:** [LOCAL-NETWORK-DEPLOYMENT.md](./LOCAL-NETWORK-DEPLOYMENT.md)
- **Docker Setup:** [DOCKER-SETUP.md](./DOCKER-SETUP.md)
- **Backend Setup:** [SETUP.md](./SETUP.md)

## 🛠️ Technologies Used

### **Frontend:**
- React 19.1.1
- TypeScript 5.8.2
- Vite 6.2.0
- React Router DOM 7.7.1
- Recharts 3.1.0
- Tailwind CSS

### **Backend:**
- Node.js
- Express.js
- MongoDB 7.0
- Mongoose ODM
- CORS

### **Infrastructure:**
- Docker
- Docker Compose
- Nginx
- GitHub Actions

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**COBIT Governance System Design Tool** - Empowering organizations with intelligent governance system design and analysis.
