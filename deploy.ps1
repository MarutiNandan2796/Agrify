# Agrify Deployment Script
# Run this script to deploy your application to Azure

Write-Host "🚀 Agrify Soil Testing - Azure Deployment Script" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Azure CLI is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
try {
    $azVersion = az version --output json 2>$null | ConvertFrom-Json
    Write-Host "✅ Azure CLI version: $($azVersion.'azure-cli')" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure CLI is not installed" -ForegroundColor Red
    Write-Host "   Install from: https://aka.ms/InstallAzureCLI" -ForegroundColor Yellow
    Write-Host "   Or run: winget install -e --id Microsoft.AzureCLI" -ForegroundColor Yellow
    exit 1
}

# Check if AZD is installed
try {
    $azdVersion = azd version 2>$null
    Write-Host "✅ Azure Developer CLI installed: $azdVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure Developer CLI (azd) is not installed" -ForegroundColor Red
    Write-Host "   Installing azd now..." -ForegroundColor Yellow
    powershell -ex AllSigned -c "Invoke-RestMethod 'https://aka.ms/install-azd.ps1' | Invoke-Expression"
    Write-Host "✅ AZD installed. Please restart your terminal and run this script again." -ForegroundColor Green
    exit 0
}

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Step 1: Login to Azure" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Cyan

# Check if already logged in
$account = az account show --output json 2>$null | ConvertFrom-Json
if ($account) {
    Write-Host "✅ Already logged in as: $($account.user.name)" -ForegroundColor Green
    Write-Host "   Subscription: $($account.name)" -ForegroundColor Cyan
    $continue = Read-Host "Continue with this account? (Y/n)"
    if ($continue -eq 'n' -or $continue -eq 'N') {
        az login
    }
} else {
    Write-Host "Logging in to Azure..." -ForegroundColor Yellow
    az login
}

# Login to AZD
Write-Host ""
Write-Host "Logging in to Azure Developer CLI..." -ForegroundColor Yellow
azd auth login

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Step 2: Configure Environment" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Cyan

# Check for existing environment
$envExists = Test-Path ".azure"
if ($envExists) {
    Write-Host "⚠️  Existing .azure directory found" -ForegroundColor Yellow
    $useExisting = Read-Host "Use existing environment? (Y/n)"
    if ($useExisting -ne 'n' -and $useExisting -ne 'N') {
        Write-Host "Using existing environment..." -ForegroundColor Green
    } else {
        $envName = Read-Host "Enter new environment name (e.g., agrify-dev)"
        azd env new $envName --no-prompt
    }
} else {
    $envName = Read-Host "Enter environment name (e.g., agrify-dev)"
    azd env new $envName --no-prompt
}

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Step 3: Set Required Configuration" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Cyan

# Azure Location
Write-Host ""
Write-Host "Available regions: eastus, eastus2, westus, westus2, centralus, westeurope, northeurope" -ForegroundColor Cyan
$location = Read-Host "Enter Azure region (default: eastus2)"
if ([string]::IsNullOrWhiteSpace($location)) {
    $location = "eastus2"
}
azd env set AZURE_LOCATION $location

# MongoDB URI
Write-Host ""
Write-Host "MongoDB Configuration:" -ForegroundColor Cyan
Write-Host "Example: mongodb+srv://username:password@cluster.mongodb.net/soil-testing" -ForegroundColor Gray
$mongoUri = Read-Host "Enter MongoDB connection string (REQUIRED)"
while ([string]::IsNullOrWhiteSpace($mongoUri)) {
    Write-Host "❌ MongoDB URI is required!" -ForegroundColor Red
    $mongoUri = Read-Host "Enter MongoDB connection string"
}
azd env set MONGODB_URI $mongoUri

# JWT Secret
Write-Host ""
Write-Host "JWT Secret Configuration:" -ForegroundColor Cyan
$jwtSecret = Read-Host "Enter JWT secret (press Enter to generate random)"
if ([string]::IsNullOrWhiteSpace($jwtSecret)) {
    $jwtSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
    Write-Host "Generated JWT secret: $jwtSecret" -ForegroundColor Gray
}
azd env set JWT_SECRET $jwtSecret

# OpenAI API Key (optional)
Write-Host ""
Write-Host "OpenAI API Key (Optional - for AI recommendations):" -ForegroundColor Cyan
$openaiKey = Read-Host "Enter OpenAI API key (press Enter to skip)"
if (-not [string]::IsNullOrWhiteSpace($openaiKey)) {
    azd env set OPENAI_API_KEY $openaiKey
}

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Step 4: Preview Deployment" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Running deployment preview..." -ForegroundColor Yellow
$preview = Read-Host "Run preview first? (Y/n)"
if ($preview -ne 'n' -and $preview -ne 'N') {
    azd provision --preview
    Write-Host ""
    $continue = Read-Host "Continue with deployment? (Y/n)"
    if ($continue -eq 'n' -or $continue -eq 'N') {
        Write-Host "Deployment cancelled." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Step 5: Deploy to Azure" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "🚀 Starting deployment... This will take 10-15 minutes" -ForegroundColor Cyan
Write-Host ""

azd up --no-prompt

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Your application is now live! 🎉" -ForegroundColor Green
Write-Host ""
Write-Host "View your application:" -ForegroundColor Yellow
azd show

Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Cyan
Write-Host "  azd monitor --logs       - View application logs" -ForegroundColor Gray
Write-Host "  azd show                - Show deployment details" -ForegroundColor Gray
Write-Host "  azd deploy              - Redeploy application" -ForegroundColor Gray
Write-Host "  azd down                - Delete all resources" -ForegroundColor Gray
Write-Host ""
