# 🌱 Soil Testing and Fertilizer Recommendation System

A comprehensive MERN stack application that helps farmers analyze soil health and receive personalized fertilizer recommendations to improve crop yield.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## ✨ Features

### Farmer Features
- 🔐 **User Authentication** - Secure JWT-based authentication
- 📊 **Soil Testing** - Submit soil parameters (pH, N, P, K, moisture)
- 💡 **Smart Recommendations** - AI-powered fertilizer recommendations
- 📈 **Dashboard** - View soil health scores and statistics
- 📝 **Test History** - Track all soil tests and recommendations
- 🌿 **Organic Options** - Get organic fertilizer alternatives

### Admin Features
- 👥 **User Management** - View and manage all farmers
- 📊 **Analytics Dashboard** - System-wide statistics and insights
- 🧪 **Test Monitoring** - View all soil tests and recommendations
- 📈 **Data Visualization** - Charts and graphs for soil health trends

### System Features
- 🔬 **Comprehensive Soil Analysis** - pH, NPK, moisture levels
- 🌾 **Crop-Specific Recommendations** - Tailored to 15+ crop types
- 🏞️ **Multiple Soil Types** - Support for 8 soil classifications
- 📅 **Application Schedule** - Detailed fertilizer application timeline
- 💰 **Cost Estimation** - Estimated costs per acre
- ⚠️ **Warning System** - Alerts for critical soil conditions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📁 Project Structure

```
mernproject/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── SoilTest.js
│   │   └── Recommendation.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── soilTest.js
│   │   ├── recommendation.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── recommendationEngine.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Landing.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── SoilTestForm.js
    │   │   ├── TestHistory.js
    │   │   ├── TestDetails.js
    │   │   └── AdminDashboard.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .gitignore
    ├── package.json
    └── tailwind.config.js
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd mernproject
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `backend` directory:
```bash
cd backend
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/soil-testing-system
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/soil-testing-system

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on: http://localhost:3000

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "location": "City, State",
  "farmSize": 10
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Soil Test Endpoints

#### Submit Soil Test
```http
POST /api/soil-test
Authorization: Bearer <token>
Content-Type: application/json

{
  "farmerName": "John Doe",
  "location": "City, State",
  "pH": 6.5,
  "nitrogen": 250,
  "phosphorus": 30,
  "potassium": 200,
  "moisture": 55,
  "soilType": "Loamy",
  "cropType": "Rice",
  "season": "Kharif",
  "notes": "Optional notes"
}
```

#### Get All Tests
```http
GET /api/soil-test?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Test by ID
```http
GET /api/soil-test/:id
Authorization: Bearer <token>
```

#### Delete Test
```http
DELETE /api/soil-test/:id
Authorization: Bearer <token>
```

### Recommendation Endpoints

#### Get All Recommendations
```http
GET /api/recommendations
Authorization: Bearer <token>
```

#### Get Recommendation by ID
```http
GET /api/recommendations/:id
Authorization: Bearer <token>
```

### Admin Endpoints

#### Get Dashboard Stats
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>
```

#### Get All Farmers
```http
GET /api/admin/farmers?page=1&limit=20
Authorization: Bearer <admin-token>
```

## 🐳 Deployment

### Docker Deployment

#### Backend Dockerfile
Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

#### Frontend Dockerfile
Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
Create `docker-compose.yml` in the root directory:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: soil-testing-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: soil-testing-system

  backend:
    build: ./backend
    container_name: soil-testing-backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/soil-testing-system
      - JWT_SECRET=your_secret_key
      - CLIENT_URL=http://localhost:3000
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    container_name: soil-testing-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

Run with Docker Compose:
```bash
docker-compose up -d
```

### Cloud Deployment

#### Heroku Deployment

**Backend:**
```bash
cd backend
heroku create soil-testing-backend
heroku addons:create mongolab:sandbox
git push heroku main
```

**Frontend (Netlify/Vercel):**
```bash
cd frontend
npm run build
# Deploy the build folder to Netlify or Vercel
```

#### AWS/DigitalOcean

1. Set up MongoDB Atlas for database
2. Deploy backend to EC2/Droplet
3. Deploy frontend to S3/CloudFront or Nginx
4. Configure environment variables
5. Set up SSL certificates

## 🎨 Sample Data

### Test User Credentials

**Farmer Account:**
- Email: farmer@test.com
- Password: password123

**Admin Account:**
- Email: admin@test.com
- Password: admin123

### Sample Soil Test Data
```json
{
  "farmerName": "John Doe",
  "location": "Punjab, India",
  "pH": 6.8,
  "nitrogen": 220,
  "phosphorus": 35,
  "potassium": 180,
  "moisture": 60,
  "soilType": "Loamy",
  "cropType": "Wheat",
  "season": "Rabi"
}
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🔒 Security Considerations

- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt (10 salt rounds)
- Input validation on all API endpoints
- CORS configured for specific origins
- MongoDB injection prevention through Mongoose
- Rate limiting recommended for production

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Errors
- Ensure CLIENT_URL in backend .env matches your frontend URL
- Check that credentials are set to true in CORS config

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributors

- Your Name - Initial work

## 🙏 Acknowledgments

- MongoDB for the database
- React community for excellent documentation
- Tailwind CSS for beautiful styling
- All the farmers who inspired this project

## 📧 Contact

For questions or support, please contact:
- Email: support@soiltesting.com
- GitHub: [Your GitHub Profile]

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] ML-based recommendations using TensorFlow
- [ ] Weather integration
- [ ] Multi-language support
- [ ] IoT sensor integration
- [ ] PDF report generation
- [ ] SMS notifications
- [ ] Payment integration for premium features

---

Made with ❤️ for farmers worldwide
