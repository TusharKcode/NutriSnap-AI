# User Goals & Profile API Documentation

## Overview

This document describes the API endpoints for managing user profiles and nutritional goals in the NutriSnap application.

### Default Goals
All new users automatically receive the following default nutritional goals:
- **Calorie Goal**: 2000 kcal/day
- **Protein Goal**: 120g/day
- **Carb Goal**: 250g/day
- **Fat Goal**: 70g/day

---

## Endpoints

### 1. Get User Profile
**Endpoint:** `GET /api/user/profile`

**Authentication:** Required (JWT Token in Authorization header)

**Description:** Retrieve the current authenticated user's profile information.

**Request:**
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "calorieGoal": 2000,
    "proteinGoal": 120,
    "carbGoal": 250,
    "fatGoal": 70,
    "streakCount": 5,
    "createdAt": "2026-06-01T10:00:00.000Z",
    "updatedAt": "2026-06-02T14:30:00.000Z"
  }
}
```

---

### 2. Get User Goals
**Endpoint:** `GET /api/user/goals`

**Authentication:** Required (JWT Token in Authorization header)

**Description:** Retrieve only the nutritional goals for the current user.

**Request:**
```bash
curl -X GET http://localhost:5000/api/user/goals \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "success": true,
  "goals": {
    "calorieGoal": 2000,
    "proteinGoal": 120,
    "carbGoal": 250,
    "fatGoal": 70
  }
}
```

---

### 3. Update User Goals
**Endpoint:** `PUT /api/user/goals`

**Authentication:** Required (JWT Token in Authorization header)

**Description:** Update one or more nutritional goals for the current user. Only provided fields will be updated.

**Request Body:**
```json
{
  "calorieGoal": 2500,
  "proteinGoal": 150,
  "carbGoal": 300,
  "fatGoal": 80
}
```

**Validation Rules:**
- All goal values must be numbers
- All goal values must be non-negative (≥ 0)
- calorieGoal: max 10,000 kcal
- proteinGoal: max 500g
- carbGoal: max 1,000g
- fatGoal: max 500g
- At least one goal field must be provided

**Request:**
```bash
curl -X PUT http://localhost:5000/api/user/goals \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "calorieGoal": 2500,
    "proteinGoal": 150,
    "carbGoal": 300,
    "fatGoal": 80
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Goals updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "calorieGoal": 2500,
    "proteinGoal": 150,
    "carbGoal": 300,
    "fatGoal": 80,
    "streakCount": 5,
    "createdAt": "2026-06-01T10:00:00.000Z",
    "updatedAt": "2026-06-02T15:45:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "calorieGoal seems too high (> 10000)"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "User not authenticated"
}
```

---

## Error Responses

### Common Error Codes

| Status Code | Scenario |
|------------|----------|
| 400 | Invalid input (negative values, missing fields, type errors) |
| 401 | Authentication failed (missing token, invalid token, expired token) |
| 500 | Server error |

### Example Error Responses

**No goals provided:**
```json
{
  "message": "At least one goal field must be provided"
}
```

**Invalid data type:**
```json
{
  "message": "calorieGoal must be a number"
}
```

**Negative value:**
```json
{
  "message": "proteinGoal must not be negative"
}
```

**Missing authentication:**
```json
{
  "message": "User not authenticated"
}
```

---

## Integration with Dashboard Goals API

After updating user goals via `PUT /api/user/goals`, the dashboard goals progress endpoint will reflect the new targets:

**Request:**
```bash
curl -X GET http://localhost:5000/api/dashboard/goals \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Response:**
```json
{
  "calories": {
    "current": 700,
    "goal": 2500,
    "progress": 28
  },
  "protein": {
    "current": 30,
    "goal": 150,
    "progress": 20
  },
  "carbs": {
    "current": 50,
    "goal": 300,
    "progress": 16.67
  },
  "fat": {
    "current": 20,
    "goal": 80,
    "progress": 25
  }
}
```

---

## Migration for Existing Users

### Running the Migration Script

If you have existing users in your database who don't have goal values, run the migration script:

```bash
# Navigate to backend directory
cd backend

# Run migration
node scripts/migrateUserGoals.js
```

**Migration Output:**
```
[Migration] Connected to database
[Migration] Found 5 users needing migration
[Migration] Updated user: user1@example.com
[Migration] Updated user: user2@example.com
[Migration] Updated user: user3@example.com
[Migration] Updated user: user4@example.com
[Migration] Updated user: user5@example.com
[Migration] Successfully migrated 5 users
[Migration] Default goals applied:
  - Calorie Goal: 2000
  - Protein Goal: 120g
  - Carb Goal: 250g
  - Fat Goal: 70g
[Migration] Database connection closed
```

---

## Complete API Flow Example

### 1. User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "securePass123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "calorieGoal": 2000,
    "proteinGoal": 120,
    "carbGoal": 250,
    "fatGoal": 70,
    "streakCount": 0
  }
}
```

### 2. Get Current Goals
```bash
curl -X GET http://localhost:5000/api/user/goals \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### 3. Update Goals
```bash
curl -X PUT http://localhost:5000/api/user/goals \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "calorieGoal": 1800,
    "proteinGoal": 140
  }'
```

### 4. Update Goals Partially
```bash
# Update only calorie goal (other goals remain unchanged)
curl -X PUT http://localhost:5000/api/user/goals \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "calorieGoal": 2200
  }'
```

### 5. Check Goal Progress
```bash
curl -X GET http://localhost:5000/api/dashboard/goals \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

---

## Schema Details

### User Model
```javascript
{
  name: String,                    // User's name
  email: String,                   // User's email (unique, lowercase)
  password: String,                // Hashed password
  calorieGoal: Number = 2000,      // Daily calorie target
  proteinGoal: Number = 120,       // Daily protein target (grams)
  carbGoal: Number = 250,          // Daily carb target (grams)
  fatGoal: Number = 70,            // Daily fat target (grams)
  streakCount: Number = 0,         // Consecutive days tracked
  createdAt: Date,                 // Account creation timestamp
  updatedAt: Date                  // Last update timestamp
}
```

---

## Best Practices

1. **Always validate goals on the frontend** before sending requests
2. **Use sensible defaults** for new users (2000 cal, 120g protein, 250g carbs, 70g fat)
3. **Allow users to customize goals** based on their diet preference (keto, bulk, etc.)
4. **Display progress visually** using the `progress` field from `/api/dashboard/goals`
5. **Cache goal values** on the frontend to reduce API calls
6. **Run migration** immediately after deploying this code if you have existing users

---

## Testing Checklist

- [ ] New user receives default goals automatically
- [ ] `GET /api/user/goals` returns correct values
- [ ] `PUT /api/user/goals` updates single goal
- [ ] `PUT /api/user/goals` updates multiple goals
- [ ] Validation rejects negative values
- [ ] Validation rejects values exceeding max limits
- [ ] `POST /api/food/upload` entries update progress
- [ ] `GET /api/dashboard/goals` shows updated progress
- [ ] Migration script works for existing users
