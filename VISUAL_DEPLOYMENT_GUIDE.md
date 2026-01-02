# 🎯 FREE DEPLOYMENT - VISUAL GUIDE

```
┌─────────────────────────────────────────────────────────────┐
│                    AGRIFY DEPLOYMENT                         │
│                   100% FREE FOREVER                          │
└─────────────────────────────────────────────────────────────┘

STEP 1: MongoDB (2 minutes)
┌────────────────────────────────────────┐
│  https://mongodb.com/atlas            │
│  ↓ Sign up (FREE)                     │
│  ↓ Create M0 cluster                  │
│  ↓ Create user                        │
│  ↓ Whitelist 0.0.0.0/0                │
│  ↓ Get connection string              │
│  ✓ DONE!                              │
└────────────────────────────────────────┘
Connection String Example:
mongodb+srv://user:pass@cluster.mongodb.net/agrify


STEP 2: Push to GitHub (2 minutes)
┌────────────────────────────────────────┐
│  Run: .\deploy-free.ps1               │
│  OR manually:                         │
│  ↓ git init                           │
│  ↓ git add .                          │
│  ↓ git commit -m "Deploy"             │
│  ↓ git remote add origin URL          │
│  ↓ git push -u origin main            │
│  ✓ DONE!                              │
└────────────────────────────────────────┘


STEP 3: Deploy Backend on Render (3 minutes)
┌────────────────────────────────────────────────────────┐
│  https://render.com                                   │
│  ↓ Sign up with GitHub                                │
│  ↓ New Web Service → Select repo                      │
│                                                        │
│  Settings:                                            │
│    Name: agrify-backend                               │
│    Root Directory: backend                            │
│    Build: npm install                                 │
│    Start: npm start                                   │
│    Plan: FREE ⭐                                       │
│                                                        │
│  Environment Variables:                               │
│    NODE_ENV=production                                │
│    PORT=5000                                          │
│    MONGODB_URI=<your_connection_string>               │
│    JWT_SECRET=<random_32_chars>                       │
│    CLIENT_URL=<will_update_later>                     │
│                                                        │
│  ↓ Create Web Service                                 │
│  ⏳ Wait 2-3 minutes...                               │
│  ✓ Backend URL: https://agrify-backend.onrender.com  │
└────────────────────────────────────────────────────────┘


STEP 4: Deploy Frontend on Render (3 minutes)
┌────────────────────────────────────────────────────────┐
│  https://render.com                                   │
│  ↓ New Static Site → Select same repo                │
│                                                        │
│  Settings:                                            │
│    Name: agrify-frontend                              │
│    Root Directory: frontend                           │
│    Build: npm install && npm run build                │
│    Publish: build                                     │
│    Plan: FREE ⭐                                       │
│                                                        │
│  Environment Variables:                               │
│    REACT_APP_API_URL=https://agrify-backend.onrender.com/api │
│                                                        │
│  ↓ Create Static Site                                 │
│  ⏳ Wait 2-3 minutes...                               │
│  ✓ Frontend URL: https://agrify-frontend.onrender.com│
└────────────────────────────────────────────────────────┘


STEP 5: Update CORS (1 minute)
┌────────────────────────────────────────┐
│  Go to backend service                │
│  ↓ Environment tab                    │
│  ↓ Update CLIENT_URL:                 │
│    https://agrify-frontend.onrender.com│
│  ↓ Save Changes                       │
│  ⏳ Auto-redeploys (~1 min)           │
│  ✓ DONE!                              │
└────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                    ✅ DEPLOYMENT COMPLETE!                   │
│                                                              │
│  Frontend: https://agrify-frontend.onrender.com             │
│  Backend:  https://agrify-backend.onrender.com/api          │
│                                                              │
│  Total Time: 10 minutes                                     │
│  Monthly Cost: $0.00                                        │
│  Credit Card: Not Required                                  │
└─────────────────────────────────────────────────────────────┘


OPTIONAL: Keep App Awake (2 minutes)
┌────────────────────────────────────────┐
│  https://uptimerobot.com              │
│  ↓ Sign up (FREE)                     │
│  ↓ Add Monitor                        │
│    Type: HTTP(s)                      │
│    URL: <backend>/api/health          │
│    Interval: 5 minutes                │
│  ↓ Create Monitor                     │
│  ✓ App never sleeps!                  │
└────────────────────────────────────────┘


TESTING YOUR DEPLOYMENT
┌────────────────────────────────────────┐
│  ✓ Visit frontend URL                 │
│  ✓ Register new account                │
│  ✓ Login                               │
│  ✓ Submit soil test                    │
│  ✓ View recommendations                │
│  ✓ Check responsive design             │
│  ✓ Test all features                   │
└────────────────────────────────────────┘


FUTURE UPDATES
┌────────────────────────────────────────┐
│  Make code changes                    │
│  ↓ git add .                          │
│  ↓ git commit -m "Update"             │
│  ↓ git push                           │
│  ↓ Render auto-deploys! 🎉           │
└────────────────────────────────────────┘


TROUBLESHOOTING
┌────────────────────────────────────────────────────────┐
│  Issue: Backend won't start                          │
│  Fix: Check logs in Render dashboard                 │
│       Verify MongoDB connection string                │
│       Ensure all environment variables are set        │
│                                                        │
│  Issue: Frontend can't reach backend                 │
│  Fix: Update REACT_APP_API_URL                       │
│       Update CLIENT_URL in backend                    │
│       Check CORS configuration                        │
│                                                        │
│  Issue: App is slow/sleeping                         │
│  Fix: Setup UptimeRobot (see above)                  │
│       Or upgrade to Render Starter ($7/mo)           │
└────────────────────────────────────────────────────────┘


COST BREAKDOWN
┌────────────────────────────────────────┐
│  Backend (Render):        $0/month    │
│  Frontend (Render):       $0/month    │
│  MongoDB Atlas (M0):      $0/month    │
│  SSL Certificates:        $0/month    │
│  UptimeRobot:            $0/month    │
│  ────────────────────────────────     │
│  TOTAL:                  $0/month 🎉  │
└────────────────────────────────────────┘


HELPFUL LINKS
┌────────────────────────────────────────────────────────┐
│  MongoDB Atlas:   https://mongodb.com/atlas           │
│  Render:          https://render.com                  │
│  UptimeRobot:     https://uptimerobot.com             │
│  Documentation:   See FREE_DEPLOYMENT_GUIDE.md        │
│  Quick Guide:     See QUICK_FREE_DEPLOY.md            │
└────────────────────────────────────────────────────────┘


NEED JWT SECRET?
Run this in PowerShell:
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})

Example Output: aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU


YOUR DEPLOYMENT CHECKLIST
┌────────────────────────────────────────┐
│  [ ] MongoDB cluster created           │
│  [ ] GitHub repo created & pushed      │
│  [ ] Backend deployed on Render        │
│  [ ] Frontend deployed on Render       │
│  [ ] Environment variables set         │
│  [ ] CORS updated                      │
│  [ ] App tested and working            │
│  [ ] UptimeRobot configured (optional) │
└────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                    🚀 READY TO DEPLOY!                       │
│                                                              │
│  Run: .\deploy-free.ps1                                     │
│  Or follow: FREE_DEPLOYMENT_GUIDE.md                        │
│                                                              │
│  Questions? Check the guides in your project folder!        │
└─────────────────────────────────────────────────────────────┘
```

## 📂 Files Reference

| File | Purpose |
|------|---------|
| **FREE_DEPLOYMENT_GUIDE.md** | Complete step-by-step instructions |
| **QUICK_FREE_DEPLOY.md** | Quick reference (1 page) |
| **FREE_DEPLOYMENT_SUMMARY.md** | Overview and comparison |
| **deploy-free.ps1** | Automated GitHub push script |
| **render.yaml** | Render configuration |
| **VISUAL_DEPLOYMENT_GUIDE.md** | This file (visual walkthrough) |

---

**Total Deployment Time: 10 minutes**
**Total Monthly Cost: $0.00**
**Difficulty Level: Easy**

**Let's deploy! 🚀**
