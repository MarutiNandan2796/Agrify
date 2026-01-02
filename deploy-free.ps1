# Quick Deploy Script - Push to GitHub for Render Deployment

Write-Host "🚀 Agrify - Free Deployment Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed" -ForegroundColor Red
    Write-Host "   Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "This script will prepare your code for deployment on Render.com (FREE)" -ForegroundColor Yellow
Write-Host ""

# Check if already a git repository
if (Test-Path ".git") {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
    $reinit = Read-Host "Reinitialize? This will remove git history (y/N)"
    if ($reinit -eq 'y' -or $reinit -eq 'Y') {
        Remove-Item -Recurse -Force .git
        git init
        Write-Host "✅ Git repository reinitialized" -ForegroundColor Green
    }
} else {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Step 1: Create .gitignore" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Cyan

# Create comprehensive .gitignore if not exists
if (-not (Test-Path ".gitignore")) {
    @"
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Azure (not needed for free deployment)
.azure/

# Misc
*.pem
*.key
.cache
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8
    Write-Host "✅ .gitignore created" -ForegroundColor Green
} else {
    Write-Host "✅ .gitignore already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Step 2: Stage Files" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Cyan

git add .
Write-Host "✅ Files staged" -ForegroundColor Green

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Step 3: Commit" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Cyan

$commitMessage = Read-Host "Enter commit message (default: 'Initial commit for Render deployment')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit for Render deployment"
}

git commit -m $commitMessage
Write-Host "✅ Changes committed" -ForegroundColor Green

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Step 4: GitHub Repository" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Do you already have a GitHub repository for this project?" -ForegroundColor Cyan
$hasRepo = Read-Host "(y/N)"

if ($hasRepo -eq 'y' -or $hasRepo -eq 'Y') {
    Write-Host ""
    Write-Host "Enter your GitHub repository URL:" -ForegroundColor Yellow
    Write-Host "Example: https://github.com/username/repository.git" -ForegroundColor Gray
    $repoUrl = Read-Host "Repository URL"
    
    # Check if remote already exists
    $existingRemote = git remote get-url origin 2>$null
    if ($existingRemote) {
        Write-Host "Updating existing remote..." -ForegroundColor Yellow
        git remote set-url origin $repoUrl
    } else {
        git remote add origin $repoUrl
    }
    
    Write-Host "✅ Remote repository configured" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git branch -M main
    
    try {
        git push -u origin main
        Write-Host "✅ Code pushed to GitHub!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Push failed. You may need to authenticate or check permissions" -ForegroundColor Yellow
        Write-Host "   Run manually: git push -u origin main" -ForegroundColor Gray
    }
    
} else {
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Go to: https://github.com/new" -ForegroundColor Yellow
    Write-Host "2. Create a new repository (e.g., 'agrify-soil-testing')" -ForegroundColor Yellow
    Write-Host "3. Don't initialize with README, .gitignore, or license" -ForegroundColor Yellow
    Write-Host "4. Copy the repository URL" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "5. Then run these commands:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor Gray
    Write-Host "   git branch -M main" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host ""
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "✅ Ready for Render Deployment!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Setup MongoDB Atlas (FREE):" -ForegroundColor Yellow
Write-Host "   https://www.mongodb.com/atlas" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Deploy on Render (FREE):" -ForegroundColor Yellow
Write-Host "   https://render.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Follow the guide:" -ForegroundColor Yellow
Write-Host "   See FREE_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Quick reference:" -ForegroundColor Yellow
Write-Host "   See QUICK_FREE_DEPLOY.md" -ForegroundColor Cyan
Write-Host ""

Write-Host "🎉 Total Cost: `$0.00/month" -ForegroundColor Green
Write-Host ""

# Generate JWT secret
Write-Host "💡 Need a JWT Secret? Here's one:" -ForegroundColor Yellow
$jwtSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
Write-Host "   $jwtSecret" -ForegroundColor Green
Write-Host ""
Write-Host "   (Save this - you'll need it in Render environment variables)" -ForegroundColor Gray
Write-Host ""

Write-Host "🚀 Ready to deploy! Good luck!" -ForegroundColor Cyan
