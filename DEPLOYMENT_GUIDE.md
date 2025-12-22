# 🚀 Deployment Guide - Soil Testing System

This guide provides step-by-step instructions for deploying the Soil Testing and Fertilizer Recommendation System to various platforms.

---

## 📋 Table of Contents

1. [Local Deployment](#local-deployment)
2. [Docker Deployment](#docker-deployment)
3. [Heroku Deployment](#heroku-deployment)
4. [AWS Deployment](#aws-deployment)
5. [DigitalOcean Deployment](#digitalocean-deployment)
6. [MongoDB Atlas Setup](#mongodb-atlas-setup)
7. [Environment Variables](#environment-variables)
8. [SSL Configuration](#ssl-configuration)

---

## 🏠 Local Deployment

### Prerequisites
- Node.js v14+
- MongoDB v4.4+
- Git

### Step-by-Step Guide

1. **Install MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb

   # macOS
   brew tap mongodb/brew
   brew install mongodb-community

   # Windows
   # Download from https://www.mongodb.com/try/download/community
   ```

2. **Start MongoDB**
   ```bash
   # Ubuntu/Debian/macOS
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```

3. **Clone and Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

5. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

---

## 🐳 Docker Deployment

### Prerequisites
- Docker
- Docker Compose

### Quick Start

1. **Build and Run**
   ```bash
   # From project root
   docker-compose up -d
   ```

2. **Check Status**
   ```bash
   docker-compose ps
   ```

3. **View Logs**
   ```bash
   docker-compose logs -f
   ```

4. **Stop Services**
   ```bash
   docker-compose down
   ```

### Production Docker Setup

1. **Create Environment File**
   ```bash
   cp .env.example .env
   ```

2. **Update docker-compose.yml for Production**
   ```yaml
   environment:
     - NODE_ENV=production
     - MONGODB_URI=mongodb://mongodb:27017/soil-testing-system
     - JWT_SECRET=${JWT_SECRET}
   ```

3. **Build and Deploy**
   ```bash
   docker-compose -f docker-compose.yml up -d --build
   ```

---

## 🟣 Heroku Deployment

### Backend Deployment

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create soil-testing-backend
   ```

4. **Add MongoDB**
   ```bash
   heroku addons:create mongolab:sandbox
   # or use MongoDB Atlas (recommended)
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set NODE_ENV=production
   heroku config:set CLIENT_URL=https://your-frontend.netlify.app
   ```

6. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

7. **Open Application**
   ```bash
   heroku open
   ```

### Frontend Deployment (Netlify)

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Configure Environment Variables**
   - Go to Netlify Dashboard
   - Site Settings > Build & Deploy > Environment
   - Add: `REACT_APP_API_URL=https://your-backend.herokuapp.com/api`

---

## ☁️ AWS Deployment

### EC2 Setup for Backend

1. **Launch EC2 Instance**
   - AMI: Ubuntu Server 20.04 LTS
   - Instance Type: t2.micro (free tier)
   - Security Group: Allow ports 22, 80, 443, 5000

2. **Connect to EC2**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install MongoDB
   wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   sudo systemctl start mongod
   sudo systemctl enable mongod

   # Install PM2
   sudo npm install -g pm2
   ```

4. **Clone and Setup Application**
   ```bash
   git clone <your-repo>
   cd mernproject/backend
   npm install
   ```

5. **Configure Environment**
   ```bash
   nano .env
   # Add your environment variables
   ```

6. **Start with PM2**
   ```bash
   pm2 start server.js --name soil-testing-backend
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx Reverse Proxy**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/soil-testing
   ```

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/soil-testing /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### S3 + CloudFront for Frontend

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Create S3 Bucket**
   - Go to AWS S3 Console
   - Create bucket with unique name
   - Enable static website hosting
   - Set bucket policy for public read access

3. **Upload Build**
   ```bash
   aws s3 sync build/ s3://your-bucket-name
   ```

4. **Setup CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure SSL certificate
   - Set custom domain (optional)

---

## 🌊 DigitalOcean Deployment

### Droplet Setup

1. **Create Droplet**
   - Choose Ubuntu 20.04
   - Select plan (Basic $5/month)
   - Add SSH key

2. **Initial Setup**
   ```bash
   ssh root@your-droplet-ip
   
   # Create user
   adduser deploy
   usermod -aG sudo deploy
   
   # Switch to deploy user
   su - deploy
   ```

3. **Install Dependencies**
   ```bash
   # Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # MongoDB
   sudo apt-get install -y mongodb

   # PM2
   sudo npm install -g pm2
   ```

4. **Deploy Application**
   ```bash
   git clone <your-repo>
   cd mernproject/backend
   npm install
   cp .env.example .env
   nano .env  # Configure
   pm2 start server.js
   ```

5. **Setup Domain**
   - Point domain A record to Droplet IP
   - Configure Nginx as reverse proxy
   - Setup SSL with Let's Encrypt

---

## 🍃 MongoDB Atlas Setup

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Click "Create Cluster"

3. **Configure Access**
   - Database Access: Create user with password
   - Network Access: Add IP (0.0.0.0/0 for development)

4. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

5. **Update Environment**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soil-testing-system?retryWrites=true&w=majority
   ```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRE=7d

# Frontend URL
CLIENT_URL=https://your-frontend-domain.com

# Admin (optional)
ADMIN_EMAIL=admin@soiltest.com
ADMIN_PASSWORD=secure_admin_password
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

---

## 🔒 SSL Configuration

### Let's Encrypt (Certbot)

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain Certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Auto-Renewal**
   ```bash
   sudo certbot renew --dry-run
   ```

### Nginx SSL Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## ✅ Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connected and accessible
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] CORS settings updated
- [ ] Error logging configured
- [ ] Backup strategy implemented
- [ ] Monitoring setup (optional)
- [ ] Load testing completed
- [ ] Security headers configured
- [ ] Rate limiting enabled (production)

---

## 🔍 Monitoring & Logs

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
pm2 status
```

### Application Logs
```bash
# Backend logs
tail -f logs/app.log

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🆘 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   sudo lsof -i :5000
   sudo kill -9 <PID>
   ```

2. **MongoDB Connection Failed**
   - Check MongoDB service: `sudo systemctl status mongod`
   - Verify connection string
   - Check network access in MongoDB Atlas

3. **CORS Errors**
   - Update CLIENT_URL in backend .env
   - Restart backend server

4. **Build Errors**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## 📞 Support

For deployment issues:
- Check logs first
- Review environment variables
- Consult platform documentation
- Create GitHub issue if needed

---

**Last Updated:** January 2025
