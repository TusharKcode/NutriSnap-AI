# User Goals & Profile API - Implementation Summary

## Overview
Implemented a complete user goals management system with default values, migration support, and comprehensive API endpoints.

## Changes Made

### 1. Updated User Model
**File:** `backend/src/models/User.js`

**Changes:**
- Added default values to goal fields:
  - `calorieGoal`: default 2000
  - `proteinGoal`: default 120
  - `carbGoal`: default 250
  - `fatGoal`: default 70

**Impact:**
- All new users created after this change will automatically have these default goals
- Existing users' goals remain unchanged (migration script handles this)

---

### 2. Created Migration Script
**File:** `backend/scripts/migrateUserGoals.js`

**Purpose:**
- Updates all existing users with missing or null goal fields
- Sets defaults for existing users: 2000 cal, 120g protein, 250g carbs, 70g fat
- Safe operation with detailed logging

**Usage:**
```bash
cd backend
node scripts/migrateUserGoals.js
```

**Features:**
- Finds users with missing/null goals
- Updates each user individually
- Logs progress for each user updated
- Gracefully handles already-migrated users
- Closes database connection on completion

---

### 3. Created User Controller
**File:** `backend/src/controllers/userController.js`

**Functions:**
1. `getUserProfile()` - GET /api/user/profile
   - Returns user profile with all fields except password
   
2. `getGoals()` - GET /api/user/goals
   - Returns only nutritional goals
   
3. `updateGoals()` - PUT /api/user/goals
   - Updates one or more goals
   - Validates all inputs
   - Returns updated user profile

**Validation:**
- Goals must be numbers
- Goals must be non-negative
- Reasonable upper limits enforced:
  - calorieGoal: max 10,000 kcal
  - proteinGoal: max 500g
  - carbGoal: max 1,000g
  - fatGoal: max 500g

---

### 4. Created User Routes
**File:** `backend/src/routes/userRoutes.js`

**Routes:**
- `GET /api/user/profile` - Get user profile
- `GET /api/user/goals` - Get user goals
- `PUT /api/user/goals` - Update user goals

**Features:**
- All routes require JWT authentication (protect middleware)
- Detailed route documentation in comments
- RESTful design patterns

---

### 5. Updated Server Configuration
**File:** `backend/server.js`

**Changes:**
- Added `userRoutes` import
- Registered `/api/user` endpoint

---

### 6. Updated Auth Controller
**File:** `backend/src/controllers/authController.js`

**Changes:**
- Updated `registerUser()` to use schema defaults for goals
- Kept `updateUserGoals()` for backward compatibility with PUT /api/auth/goals

---

### 7. API Documentation
**File:** `docs/api-goals-documentation.md`

**Contents:**
- Complete endpoint reference
- Request/response examples
- Validation rules
- Error handling
- Integration with dashboard API
- Migration instructions
- Complete API flow examples
- Schema details
- Best practices
- Testing checklist

---

## Complete API Reference

### New Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | /api/user/profile | ✅ | Get user profile |
| GET | /api/user/goals | ✅ | Get user goals |
| PUT | /api/user/goals | ✅ | Update user goals |

### Related Endpoints (Existing)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/dashboard/goals | Check goal progress |
| POST | /api/food/upload | Log food entries |

---

## Key Features

✅ **Default Goals**
- New users automatically get sensible defaults
- No additional setup required for new registrations

✅ **Migration Support**
- Script handles all existing users
- Safe with detailed logging
- Can be run multiple times

✅ **Input Validation**
- Type checking (must be numbers)
- Range validation (positive values)
- Reasonable upper limits
- Clear error messages

✅ **Backward Compatibility**
- PUT /api/auth/goals still works
- Existing code unaffected
- Gradual migration path

✅ **Clean Architecture**
- Separated concerns (auth vs user management)
- Dedicated controller for user operations
- Dedicated routes for user endpoints
- Comprehensive error handling

---

## Testing Instructions

### 1. Verify New User Gets Defaults
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123"
  }'

# Get their goals (should show defaults)
# Copy the token from response
curl -X GET http://localhost:5000/api/user/goals \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Update Individual Goals
```bash
curl -X PUT http://localhost:5000/api/user/goals \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"calorieGoal": 2500}'
```

### 3. Verify Dashboard Progress
```bash
curl -X GET http://localhost:5000/api/dashboard/goals \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Run Migration (for existing users)
```bash
cd backend
node scripts/migrateUserGoals.js
```

---

## File Structure

```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js          [UPDATED]
│   │   ├── dashboardController.js
│   │   ├── foodController.js
│   │   └── userController.js          [NEW]
│   ├── middleware/
│   ├── models/
│   │   └── User.js                    [UPDATED]
│   └── routes/
│       ├── authRoutes.js              [UPDATED]
│       ├── dashboardRoutes.js
│       ├── foodRoutes.js
│       └── userRoutes.js              [NEW]
├── scripts/
│   └── migrateUserGoals.js            [NEW]
├── server.js                          [UPDATED]
└── package.json
docs/
└── api-goals-documentation.md         [NEW]
```

---

## Next Steps

1. **Test the endpoints** using the provided curl commands
2. **Run the migration script** if you have existing users
3. **Update frontend** to use the new `/api/user/goals` endpoints
4. **Implement goal customization UI** for users to set their own targets
5. **Display progress** using the dashboard goals API

---

## Backward Compatibility

The old endpoint `PUT /api/auth/goals` will continue to work. The new endpoint `PUT /api/user/goals` is recommended for new development.

Both endpoints update the same user goals and have identical functionality.

---

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `400` - Bad request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `500` - Server error

See `docs/api-goals-documentation.md` for detailed error examples.
