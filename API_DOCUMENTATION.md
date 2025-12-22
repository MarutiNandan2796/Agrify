# Soil Testing and Fertilizer Recommendation System - API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📌 Authentication Endpoints

### 1. Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "location": "Punjab, India",
  "farmSize": 10,
  "role": "farmer"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "farmer"
  }
}
```

---

### 2. Login
Authenticate existing user.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "farmer",
    "location": "Punjab, India"
  }
}
```

---

### 3. Get Current User
Get logged-in user profile.

**Endpoint:** `GET /auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "farmer",
    "phone": "1234567890",
    "location": "Punjab, India",
    "farmSize": 10
  }
}
```

---

## 🧪 Soil Test Endpoints

### 4. Submit Soil Test
Submit new soil test data for analysis.

**Endpoint:** `POST /soil-test`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "farmerName": "John Doe",
  "location": "Punjab, India",
  "pH": 6.5,
  "nitrogen": 250,
  "phosphorus": 30,
  "potassium": 200,
  "moisture": 55,
  "soilType": "Loamy",
  "cropType": "Wheat",
  "season": "Rabi",
  "notes": "First test of the season"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Soil test submitted and analyzed successfully",
  "soilTest": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f191e810c19729de860ea",
    "farmerName": "John Doe",
    "location": "Punjab, India",
    "pH": 6.5,
    "nitrogen": 250,
    "phosphorus": 30,
    "potassium": 200,
    "moisture": 55,
    "soilType": "Loamy",
    "cropType": "Wheat",
    "status": "analyzed",
    "testDate": "2025-01-15T10:30:00.000Z"
  },
  "recommendation": {
    "_id": "507f1f77bcf86cd799439012",
    "soilHealthScore": 75,
    "healthStatus": "Good",
    "primaryFertilizer": {
      "name": "Balanced NPK (12-32-16)",
      "quantity": "100-125 kg per acre",
      "applicationMethod": "Apply at sowing for balanced nutrition"
    }
  }
}
```

---

### 5. Get All Soil Tests
Retrieve all soil tests for the logged-in user.

**Endpoint:** `GET /soil-test`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (pending, analyzed, completed)

**Response (200):**
```json
{
  "success": true,
  "soilTests": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "farmerName": "John Doe",
      "location": "Punjab, India",
      "cropType": "Wheat",
      "soilType": "Loamy",
      "pH": 6.5,
      "status": "analyzed",
      "testDate": "2025-01-15T10:30:00.000Z"
    }
  ],
  "totalPages": 1,
  "currentPage": 1,
  "totalTests": 5
}
```

---

### 6. Get Soil Test by ID
Get detailed information about a specific soil test.

**Endpoint:** `GET /soil-test/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "soilTest": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f191e810c19729de860ea",
    "farmerName": "John Doe",
    "location": "Punjab, India",
    "pH": 6.5,
    "nitrogen": 250,
    "phosphorus": 30,
    "potassium": 200,
    "moisture": 55,
    "soilType": "Loamy",
    "cropType": "Wheat",
    "season": "Rabi",
    "status": "analyzed",
    "testDate": "2025-01-15T10:30:00.000Z"
  },
  "recommendation": {
    "_id": "507f1f77bcf86cd799439012",
    "soilHealthScore": 75,
    "healthStatus": "Good",
    "primaryFertilizer": {...},
    "secondaryFertilizers": [...],
    "organicOptions": [...],
    "deficientNutrients": [...],
    "bestPractices": [...],
    "estimatedCostPerAcre": 3500
  }
}
```

---

### 7. Delete Soil Test
Delete a soil test record.

**Endpoint:** `DELETE /soil-test/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Soil test deleted successfully"
}
```

---

## 💡 Recommendation Endpoints

### 8. Get All Recommendations
Get all fertilizer recommendations.

**Endpoint:** `GET /recommendations`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200):**
```json
{
  "success": true,
  "recommendations": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "soilTestId": {
        "_id": "507f1f77bcf86cd799439011",
        "cropType": "Wheat",
        "soilType": "Loamy",
        "pH": 6.5,
        "testDate": "2025-01-15T10:30:00.000Z"
      },
      "soilHealthScore": 75,
      "healthStatus": "Good",
      "estimatedCostPerAcre": 3500,
      "generatedDate": "2025-01-15T10:30:00.000Z"
    }
  ],
  "totalPages": 1,
  "currentPage": 1,
  "totalRecommendations": 5
}
```

---

### 9. Get Statistics
Get recommendation statistics overview.

**Endpoint:** `GET /recommendations/stats/overview`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalRecommendations": 15,
    "averageHealthScore": 72,
    "healthDistribution": {
      "Excellent": 3,
      "Good": 8,
      "Fair": 3,
      "Poor": 1
    },
    "commonDeficiencies": [
      {
        "nutrient": "Nitrogen (N)",
        "count": 8
      }
    ],
    "averageCostPerAcre": 3200
  }
}
```

---

## 👨‍💼 Admin Endpoints

### 10. Admin Dashboard
Get comprehensive system statistics (Admin only).

**Endpoint:** `GET /admin/dashboard`

**Headers:** `Authorization: Bearer <admin_token>`

**Response (200):**
```json
{
  "success": true,
  "dashboard": {
    "totalFarmers": 250,
    "totalTests": 1543,
    "totalRecommendations": 1543,
    "avgHealthScore": 68,
    "recentTests": [...],
    "testsByStatus": [
      {"_id": "analyzed", "count": 1400},
      {"_id": "pending", "count": 143}
    ],
    "soilTypeDistribution": [...],
    "cropDistribution": [...],
    "healthDistribution": [...]
  }
}
```

---

### 11. Get All Farmers
Retrieve list of all farmers (Admin only).

**Endpoint:** `GET /admin/farmers`

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200):**
```json
{
  "success": true,
  "farmers": [
    {
      "_id": "507f191e810c19729de860ea",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "location": "Punjab, India",
      "farmSize": 10,
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "totalPages": 10,
  "currentPage": 1,
  "totalFarmers": 250
}
```

---

## 📊 Soil Types Supported

- Clay
- Sandy
- Loamy
- Silty
- Peaty
- Chalky
- Red
- Black

## 🌾 Crop Types Supported

- Rice
- Wheat
- Maize
- Cotton
- Sugarcane
- Potato
- Tomato
- Onion
- Soybean
- Pulses
- Vegetables
- Fruits
- Tea
- Coffee
- Other

## 📅 Seasons

- Kharif (Monsoon season)
- Rabi (Winter season)
- Zaid (Summer season)
- Year-round

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "msg": "pH must be between 0 and 14",
      "param": "pH"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Soil test not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": "Error details..."
}
```

---

## 📝 Notes

1. All dates are in ISO 8601 format
2. Numeric values for soil parameters:
   - pH: 0-14
   - Nitrogen: kg/ha (typically 0-500)
   - Phosphorus: kg/ha (typically 0-100)
   - Potassium: kg/ha (typically 0-500)
   - Moisture: 0-100%
3. JWT tokens expire after 7 days
4. Pagination default: 10 items per page

---

## 🔗 Postman Collection

Import this collection to test the API:
[Download Postman Collection](./postman_collection.json)

---

**Last Updated:** January 2025
