# 🚀 Quick Deployment Command Reference

## Deploy Now (Automated)
```powershell
.\deploy.ps1
```

## Prerequisites Check
```powershell
# Check if tools are installed
az --version
azd version

# If not installed:
# Azure CLI: https://aka.ms/InstallAzureCLI
# AZD: powershell -ex AllSigned -c "Invoke-RestMethod 'https://aka.ms/install-azd.ps1' | Invoke-Expression"
```

## Manual Deployment Commands
```powershell
# 1. Login
az login
azd auth login

# 2. Create environment
azd env new agrify-dev

# 3. Configure
azd env set AZURE_LOCATION eastus2
azd env set MONGODB_URI "mongodb+srv://user:pass@cluster.mongodb.net/db"
azd env set JWT_SECRET "your-secret-here"
azd env set OPENAI_API_KEY "sk-..." # optional

# 4. Deploy
azd up
```

## Post-Deployment Commands
```powershell
# View application URLs
azd show

# Check logs
azd monitor --logs

# Redeploy after changes
azd deploy

# Deploy specific service
azd deploy backend
azd deploy frontend

# Delete everything
azd down --force --purge
```

## Troubleshooting Commands
```powershell
# Check Azure account
az account show

# List subscriptions
az account list

# Set subscription
az account set --subscription "subscription-id"

# Check resource group
az group show --name rg-agrify-dev

# View container app logs (alternative)
az containerapp logs show --name ca-backend-agrify-dev --resource-group rg-agrify-dev --follow

# Check container app status
az containerapp show --name ca-backend-agrify-dev --resource-group rg-agrify-dev
```

## Files to Review Before Deployment
- [ ] `azure.yaml` - Service configuration
- [ ] `infra/main.bicep` - Infrastructure template
- [ ] `backend/Dockerfile` - Backend container
- [ ] `frontend/Dockerfile` - Frontend container

## Environment Variables Required
| Variable | Required | Example |
|----------|----------|---------|
| MONGODB_URI | ✅ Yes | `mongodb+srv://...` |
| JWT_SECRET | ✅ Yes | `random-secure-string` |
| OPENAI_API_KEY | ❌ No | `sk-...` |
| AZURE_LOCATION | ✅ Yes | `eastus2` |

## Useful Azure Portal Links
- Resource Groups: https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups
- Container Apps: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.App%2FcontainerApps
- Application Insights: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/microsoft.insights%2Fcomponents

## Cost Management
```powershell
# View current month costs
az consumption usage list --start-date 2026-01-01 --end-date 2026-01-31

# Set budget alert (via Portal recommended)
```

## Support Resources
- Deployment Guide: See `AZURE_DEPLOYMENT_GUIDE.md`
- Quick README: See `DEPLOYMENT_README.md`
- Azure Docs: https://learn.microsoft.com/azure/container-apps/
- AZD Docs: https://learn.microsoft.com/azure/developer/azure-developer-cli/
