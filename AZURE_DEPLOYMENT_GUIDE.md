# 🚀 Quick Deployment Guide - Agrify Soil Testing System

## ✅ What's Been Done

All deployment files have been created and are ready to use:

### 📦 Dockerfiles Created
- ✅ [backend/Dockerfile](backend/Dockerfile) - Production-ready Node.js API
- ✅ [frontend/Dockerfile](frontend/Dockerfile) - Multi-stage React build with Nginx
- ✅ `.dockerignore` files for optimized builds

### ☁️ Azure Infrastructure Files
- ✅ [azure.yaml](azure.yaml) - Azure Developer CLI configuration
- ✅ [infra/main.bicep](infra/main.bicep) - Main infrastructure template
- ✅ [infra/main.parameters.json](infra/main.parameters.json) - Parameters configuration
- ✅ Complete set of Bicep modules in `infra/core/`

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. **Azure Account** - [Sign up for free](https://azure.microsoft.com/free/)
2. **Azure CLI** - Install from [here](https://aka.ms/InstallAzureCLI)
3. **Azure Developer CLI (azd)** - Install with PowerShell:
   ```powershell
   powershell -ex AllSigned -c "Invoke-RestMethod 'https://aka.ms/install-azd.ps1' | Invoke-Expression"
   ```
4. **MongoDB Database** - Either:
   - [MongoDB Atlas](https://www.mongodb.com/atlas) (Free tier available)
   - Azure Cosmos DB for MongoDB API
5. **OpenAI API Key** (Optional - for AI recommendations)

---

## 🚀 Deployment Steps

### Step 1: Install Required Tools

```powershell
# Install Azure CLI (if not already installed)
# Download and run: https://aka.ms/installazurecliwindows

# Install Azure Developer CLI
powershell -ex AllSigned -c "Invoke-RestMethod 'https://aka.ms/install-azd.ps1' | Invoke-Expression"

# Verify installations
az --version
azd version
```

### Step 2: Login to Azure

```powershell
# Login to Azure CLI
az login

# Login to Azure Developer CLI
azd auth login

# Set your subscription (if you have multiple)
az account set --subscription "<your-subscription-id>"
```

### Step 3: Setup MongoDB Database

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Whitelist IP address `0.0.0.0/0` (allows Azure to connect)
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

#### Option B: Azure Cosmos DB

```powershell
# Create Cosmos DB account
az cosmosdb create \
  --name agrify-cosmos-<unique-id> \
  --resource-group <your-rg> \
  --kind MongoDB \
  --server-version 4.2

# Get connection string
az cosmosdb keys list \
  --name agrify-cosmos-<unique-id> \
  --resource-group <your-rg> \
  --type connection-strings
```

### Step 4: Initialize Azure Developer Environment

```powershell
# Navigate to project root
cd "c:\Users\Maruti Nandan\Desktop\mernproject\mernproject"

# Create a new environment (generates unique name)
azd env new

# When prompted, enter a name like: agrify-dev
```

### Step 5: Configure Environment Variables

```powershell
# Set required environment variables

# Azure Configuration
azd env set AZURE_LOCATION eastus2
# Or choose another region: westus, westeurope, southeastasia, etc.

# MongoDB Connection (REQUIRED)
azd env set MONGODB_URI "mongodb+srv://username:password@cluster.mongodb.net/soil-testing"

# JWT Secret (REQUIRED - generate a secure random string)
azd env set JWT_SECRET "your-super-secure-jwt-secret-key-here"

# OpenAI API Key (OPTIONAL - for AI features)
azd env set OPENAI_API_KEY "sk-your-openai-api-key-here"
```

### Step 6: Deploy to Azure

```powershell
# Preview what will be created (optional but recommended)
azd provision --preview

# Deploy everything (infrastructure + applications)
azd up

# This command will:
# 1. Create all Azure resources (Container Apps, Registry, Monitoring, etc.)
# 2. Build Docker images for backend and frontend
# 3. Push images to Azure Container Registry
# 4. Deploy containers to Azure Container Apps
# 5. Configure networking and environment variables
```

**⏱️ Expected Time**: 10-15 minutes

### Step 7: Verify Deployment

After deployment completes, you'll see output with URLs:

```
Backend API: https://ca-backend-<env>.azurecontainerapps.io
Frontend App: https://ca-frontend-<env>.azurecontainerapps.io
```

Test the deployment:

```powershell
# Check backend health
curl https://ca-backend-<your-env>.azurecontainerapps.io/api/health

# Open frontend in browser
start https://ca-frontend-<your-env>.azurecontainerapps.io
```

---

## 🔍 Monitoring and Logs

### View Application Logs

```powershell
# View backend logs
azd monitor --logs

# Or use Azure Portal:
# 1. Go to Azure Portal (portal.azure.com)
# 2. Navigate to your resource group
# 3. Open Container App
# 4. Click "Log stream" or "Logs"
```

### View Metrics in Application Insights

1. Go to Azure Portal
2. Find Application Insights resource
3. View:
   - Live Metrics
   - Application Map
   - Performance
   - Failures

---

## 🔧 Common Issues and Solutions

### Issue 1: Azure CLI Not Found

**Solution**: Close and reopen PowerShell/Terminal after installing Azure CLI to refresh PATH.

### Issue 2: MongoDB Connection Failed

**Solution**: 
- Check your connection string format
- Ensure IP `0.0.0.0/0` is whitelisted in MongoDB Atlas
- Verify username and password are correct
- Make sure database name is included in connection string

### Issue 3: Region Quota Exceeded

**Solution**: Try a different Azure region:
```powershell
azd down --force
azd env set AZURE_LOCATION westus2
azd up
```

### Issue 4: Container App Not Starting

**Solution**: Check logs for errors:
```powershell
azd monitor --logs
```

Common causes:
- Missing environment variables
- Invalid MongoDB connection
- Port mismatch (ensure backend uses port 5000, frontend uses port 80)

---

## 🎯 Post-Deployment Configuration

### Update Frontend to Use Deployed Backend

The frontend is automatically configured to use the backend URL during deployment. No manual configuration needed!

### Setup Custom Domain (Optional)

```powershell
# Add custom domain to container app
az containerapp hostname add \
  --name ca-frontend-<env> \
  --resource-group rg-<env> \
  --hostname yourdomain.com
```

### Enable HTTPS with Custom Certificate

Container Apps automatically provide HTTPS with managed certificates. For custom domains:

1. Add domain to Container App
2. Create CNAME record pointing to Container App FQDN
3. Container App will automatically provision certificate

---

## 📊 Cost Estimation

**Expected Monthly Cost** (with basic usage):

- Container Apps (2 apps): ~$10-30/month (Consumption pricing)
- Container Registry (Basic): ~$5/month
- Log Analytics: ~$5-15/month (based on ingestion)
- Application Insights: Free tier available

**Total**: ~$20-50/month (varies with usage)

**💡 Tip**: Container Apps scale to zero when not in use, minimizing costs!

---

## 🔄 Update Deployed Application

When you make code changes:

```powershell
# Redeploy everything
azd up

# Or deploy specific service
azd deploy backend
azd deploy frontend
```

---

## 🗑️ Cleanup Resources

When you're done:

```powershell
# Delete all Azure resources
azd down --force --purge

# This will:
# - Delete the resource group
# - Remove all resources
# - Clean up environment
```

---

## 📚 Additional Resources

- [Azure Container Apps Docs](https://learn.microsoft.com/azure/container-apps/)
- [Azure Developer CLI Docs](https://learn.microsoft.com/azure/developer/azure-developer-cli/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Project Documentation](./README.md)

---

## 🆘 Need Help?

If you encounter issues:

1. Check logs: `azd monitor --logs`
2. Review Azure Portal for resource status
3. Verify all environment variables are set
4. Ensure MongoDB is accessible
5. Try redeploying: `azd down --force` then `azd up`

---

## ✅ Success Checklist

- [ ] Azure CLI installed and logged in
- [ ] Azure Developer CLI installed and logged in
- [ ] MongoDB database created and connection string obtained
- [ ] Environment variables configured with `azd env set`
- [ ] Ran `azd up` successfully
- [ ] Backend health endpoint responding
- [ ] Frontend loading in browser
- [ ] User registration works
- [ ] Soil test submission works

**Congratulations! Your Agrify Soil Testing System is now live on Azure! 🎉**
