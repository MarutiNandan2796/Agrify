# 🆓 Quick FREE Deployment - 10 Minutes

## ✅ What You Need
1. GitHub account (free)
2. Render.com account (free)
3. MongoDB Atlas account (free)

## 🚀 Quick Steps

### 1️⃣ MongoDB (2 min)
```
1. Go to: https://www.mongodb.com/atlas
2. Sign up → Create FREE M0 cluster
3. Create user: agrify_user
4. Network: Add IP 0.0.0.0/0
5. Get connection string
```

### 2️⃣ Push to GitHub (2 min)
```powershell
git init
git add .
git commit -m "Deploy ready"
git remote add origin https://github.com/YOUR_USERNAME/agrify.git
git push -u origin main
```

### 3️⃣ Deploy Backend - Render (3 min)
```
1. Go to: https://render.com
2. Sign up with GitHub
3. New Web Service → Select repo
4. Settings:
   - Root Directory: backend
   - Build: npm install
   - Start: npm start
   - Plan: FREE
5. Environment Variables:
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongo_connection_string
   JWT_SECRET=generate-random-32-char-string
   CLIENT_URL=will-update-after-frontend
6. Create Service
```

### 4️⃣ Deploy Frontend - Render (3 min)
```
1. Render → New Static Site
2. Select same repo
3. Settings:
   - Root Directory: frontend
   - Build: npm install && npm run build
   - Publish: build
   - Plan: FREE
4. Environment Variable:
   REACT_APP_API_URL=https://YOUR-BACKEND.onrender.com/api
5. Create Site
```

### 5️⃣ Update Backend CORS (1 min)
```
1. Go to backend service on Render
2. Environment → Update CLIENT_URL
3. CLIENT_URL=https://YOUR-FRONTEND.onrender.com
4. Save (auto-redeploys)
```

## ✅ Done! Your URLs:
- Frontend: `https://agrify-frontend.onrender.com`
- Backend: `https://agrify-backend.onrender.com/api`

## 🎯 Generate JWT Secret
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

## 🔧 Keep App Awake (Optional)
Use UptimeRobot.com (free) to ping your backend every 5 min

## 💰 Total Cost
**$0.00/month** 🎉

---

**Full Guide**: See [FREE_DEPLOYMENT_GUIDE.md](FREE_DEPLOYMENT_GUIDE.md)
