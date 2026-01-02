# 🆓 FREE Deployment Guide - Agrify Soil Testing System

Deploy your MERN stack application **100% FREE** with no credit card required!

---

## 🎯 Best FREE Options

### Option 1: Render.com (Recommended) ⭐
- ✅ **100% Free** - No credit card required
- ✅ **Full stack** - Backend + Frontend
- ✅ **Auto-deploy** from GitHub
- ✅ **Free SSL** certificates
- ✅ **750 hours/month** free (always on)

### Option 2: Vercel (Frontend) + Render (Backend)
- ✅ **100% Free** for both
- ✅ **Best performance** for React apps
- ✅ **Instant deployment**

### Option 3: Railway.app
- ✅ **$5 free credit/month**
- ✅ **Easy setup**

---

## 🚀 Quick Deploy on Render (Recommended)

### Prerequisites
1. ✅ GitHub account (free)
2. ✅ MongoDB Atlas account (free)
3. ✅ Render account (free)

### Total Time: **10 minutes** ⏱️

---

## Step 1: Setup Free MongoDB Database (2 minutes)

### Create MongoDB Atlas Account

1. **Go to**: https://www.mongodb.com/atlas
2. **Sign up** for free (no credit card)
3. **Create Free Cluster**:
   - Choose **M0 FREE** tier
   - Select region closest to you
   - Click "Create Cluster"

4. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `agrify_user`
   - Password: Click "Autogenerate Secure Password" (save this!)
   - Click "Add User"

5. **Whitelist All IPs** (for Render to connect):
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - IP: `0.0.0.0/0`
   - Click "Confirm"

6. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://agrify_user:<password>@cluster0.xxxxx.mongodb.net/agrify?retryWrites=true&w=majority
   ```
   - **Replace `<password>`** with your actual password
   - **Add database name** `/agrify` before the `?`

✅ **Save your connection string** - you'll need it soon!

---

## Step 2: Push Code to GitHub (2 minutes)

```powershell
# Initialize git (if not already)
cd "c:\Users\Maruti Nandan\Desktop\mernproject\mernproject"
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create GitHub repository and push
# Go to https://github.com/new
# Create repository named "agrify-soil-testing"
# Then run:

git remote add origin https://github.com/YOUR_USERNAME/agrify-soil-testing.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend on Render (3 minutes)

1. **Go to**: https://render.com
2. **Sign up** with GitHub (free, no credit card)
3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select "agrify-soil-testing"

4. **Configure Backend**:
   - **Name**: `agrify-backend`
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable":
   
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = mongodb+srv://agrify_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/agrify
   JWT_SECRET = your-super-secret-jwt-key-minimum-32-characters
   CLIENT_URL = https://YOUR_FRONTEND_URL (we'll update this later)
   ```

   **Generate JWT Secret**:
   ```powershell
   # Run this to generate a secure secret:
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
   ```

6. **Deploy**:
   - Click "Create Web Service"
   - Wait 2-3 minutes for build
   - Your backend URL: `https://agrify-backend.onrender.com`

✅ **Test backend**: Visit `https://agrify-backend.onrender.com/api/health`

---

## Step 4: Deploy Frontend on Render (3 minutes)

### Option A: Deploy on Render (Same as Backend)

1. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Connect same GitHub repository

2. **Configure Frontend**:
   - **Name**: `agrify-frontend`
   - **Branch**: main
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

3. **Add Environment Variable**:
   ```
   REACT_APP_API_URL = https://agrify-backend.onrender.com/api
   ```

4. **Deploy**:
   - Click "Create Static Site"
   - Wait 2-3 minutes
   - Your frontend URL: `https://agrify-frontend.onrender.com`

### Option B: Deploy on Vercel (Faster, Recommended for Frontend)

1. **Go to**: https://vercel.com
2. **Sign up** with GitHub (free)
3. **Import Project**:
   - Click "Add New" → "Project"
   - Select "agrify-soil-testing"
   - Click "Import"

4. **Configure**:
   - **Root Directory**: `frontend`
   - **Framework**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. **Environment Variables**:
   ```
   REACT_APP_API_URL = https://agrify-backend.onrender.com/api
   ```

6. **Deploy**: Click "Deploy"

---

## Step 5: Update Backend CORS (1 minute)

Go back to Render backend:
1. Click on "agrify-backend" service
2. Go to "Environment"
3. Update `CLIENT_URL`:
   ```
   CLIENT_URL = https://agrify-frontend.onrender.com
   ```
   (or your Vercel URL if you used Option B)
4. Click "Save Changes"
5. Wait for automatic redeploy (~1 minute)

---

## ✅ Deployment Complete!

### Your App URLs:
- **Frontend**: `https://agrify-frontend.onrender.com`
- **Backend API**: `https://agrify-backend.onrender.com/api`

### Test Your App:
1. ✅ Visit frontend URL
2. ✅ Register a new user
3. ✅ Login
4. ✅ Submit soil test
5. ✅ View recommendations

---

## 🎨 Custom Domain (Optional - Still Free!)

### On Render:
1. Go to your site settings
2. Click "Custom Domains"
3. Add your domain (e.g., `agrify.yourdomain.com`)
4. Update DNS records as instructed
5. **Free SSL** automatically provided!

### On Vercel:
1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS
5. **Instant SSL**!

---

## 💰 Cost Breakdown

| Service | Cost | Details |
|---------|------|---------|
| **Render Backend** | FREE | 750 hrs/month (always on) |
| **Render Frontend** | FREE | Unlimited bandwidth |
| **MongoDB Atlas** | FREE | 512MB storage (M0 tier) |
| **Vercel (optional)** | FREE | 100GB bandwidth/month |
| **SSL Certificates** | FREE | Auto-provided |
| **Custom Domain** | FREE | If you own domain |

**Total Monthly Cost: $0.00** 🎉

---

## ⚡ Performance Notes

### Render Free Tier:
- May **sleep after 15 minutes** of inactivity
- First request after sleep: **~30 seconds wake-up**
- Subsequent requests: **Fast**
- To keep alive: Use a service like [UptimeRobot](https://uptimerobot.com) (free) to ping every 5 minutes

### Solutions to Keep Always Active:
1. **UptimeRobot** (Free):
   - Sign up at https://uptimerobot.com
   - Add monitor for your backend URL
   - Ping every 5 minutes
   - Keeps your app awake!

2. **Cron-job.org** (Free):
   - Sign up at https://cron-job.org
   - Create job to ping `/api/health`
   - Schedule: Every 5 minutes

---

## 🔄 Auto-Deploy from GitHub

Every time you push to GitHub, Render automatically rebuilds and deploys!

```powershell
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Render auto-deploys in 2-3 minutes!
```

---

## 📊 Monitoring (Free)

### Render Dashboard:
- View logs in real-time
- Monitor deployment status
- Track resource usage

### Access Logs:
1. Go to Render dashboard
2. Click on your service
3. Click "Logs" tab
4. See real-time application logs

---

## 🐛 Troubleshooting

### Backend Won't Start:
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set
- Check `PORT` is set to `5000` or `10000`

### Frontend Can't Connect to Backend:
- Verify `REACT_APP_API_URL` is correct
- Check CORS settings in backend
- Ensure `CLIENT_URL` matches frontend URL

### MongoDB Connection Error:
- Check if `0.0.0.0/0` is whitelisted
- Verify connection string format
- Ensure password is correct
- Check database name is included

### App Sleeps on Render:
- Use UptimeRobot to keep awake
- Or upgrade to Render paid plan ($7/month)

---

## 🚀 Alternative: Railway (Also Free!)

### Quick Deploy on Railway:

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **New Project** → "Deploy from GitHub"
4. Select your repository
5. **Add MongoDB**:
   - Click "New" → "Database" → "MongoDB"
   - Copy `MONGO_URL` environment variable
6. **Configure**:
   - Backend automatically detected
   - Add environment variables
   - Deploy!

**Free Tier**: $5 credit/month (enough for hobby projects)

---

## 📚 Comparison Table

| Platform | Backend | Frontend | Database | Cost | Wake Time |
|----------|---------|----------|----------|------|-----------|
| **Render** | ✅ Free | ✅ Free | MongoDB Atlas | $0 | 30s sleep |
| **Vercel + Render** | ✅ Free | ✅ Free | MongoDB Atlas | $0 | 30s sleep |
| **Railway** | ✅ $5/mo | ✅ $5/mo | ✅ Included | $5 credit/mo | Always on |
| **Fly.io** | ✅ Free | ✅ Free | MongoDB Atlas | $0 | Instant |

---

## 🎓 Pro Tips

1. **Keep App Awake**: Use UptimeRobot (free)
2. **Faster Frontend**: Use Vercel instead of Render for frontend
3. **Custom Domain**: Use Cloudflare (free) for DNS management
4. **CDN**: Vercel includes global CDN for free
5. **Analytics**: Add Google Analytics (free)

---

## ✨ Upgrade Options (Later)

When your app grows:
- **Render Starter**: $7/month (no sleep, 1GB RAM)
- **Railway Pro**: $20/month (better resources)
- **MongoDB M10**: $9/month (2GB storage)

But for now, **FREE is perfect**! 🎉

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Railway Docs**: https://docs.railway.app

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Connection string obtained
- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Backend service deployed on Render
- [ ] Frontend deployed on Render/Vercel
- [ ] Environment variables configured
- [ ] CORS updated with frontend URL
- [ ] App tested and working
- [ ] UptimeRobot configured (optional)

---

**Your app is now live and FREE! 🚀**

**Backend**: https://agrify-backend.onrender.com
**Frontend**: https://agrify-frontend.onrender.com

**Total cost: $0/month** 💰
