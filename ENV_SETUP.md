# Environment Variables Setup Guide

## ⚠️ IMPORTANT: Never commit the `.env` file to GitHub!

This project uses environment variables to store sensitive information like API keys, database credentials, and secrets.

## Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/soil-testing-system

# Option 2: MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/soil-testing-system?retryWrites=true&w=majority

# JWT Configuration (Change this to a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000

# Admin Configuration
ADMIN_EMAIL=admin@soiltest.com
ADMIN_PASSWORD=admin123

# Google Gemini AI Configuration (Get your key from: https://makersuite.google.com/app/apikey)
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

## How to Get API Keys

### MongoDB Atlas (Free Tier)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" and get your connection string
5. Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_CLUSTER` in the connection string

### Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key to your `.env` file

## Security Best Practices

✅ **DO:**
- Keep `.env` files in `.gitignore`
- Use `.env.example` as a template (without real values)
- Use strong, random JWT secrets
- Rotate API keys regularly
- Use different credentials for development and production

❌ **DON'T:**
- Never commit `.env` files to Git
- Never share API keys publicly
- Never use default passwords in production
- Never hardcode secrets in your code

## Checking if .env is ignored

Run this command to verify:
```bash
git status
```

You should NOT see `.env` in the untracked files list. If you do, make sure `.env` is in your `.gitignore` file.

## If You Accidentally Committed Secrets

If you accidentally pushed secrets to GitHub:

1. **Immediately revoke/rotate all exposed credentials:**
   - Change MongoDB password
   - Generate new Google API key
   - Generate new JWT secret

2. **Remove from Git history:**
   ```bash
   git filter-branch --force --index-filter "git rm --cached --ignore-unmatch backend/.env" --prune-empty --tag-name-filter cat -- --all
   git push origin --force --all
   ```

3. **Or use BFG Repo-Cleaner** (recommended):
   ```bash
   bfg --delete-files .env
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   ```

## Contact

If you have any questions about environment setup, please refer to the SETUP_GUIDE.md file.
