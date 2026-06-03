# AI Log 05 - Authentication Implementation

## Prompt

Create a Mongoose User model.

Requirements:
- name
- email
- password
- calorieGoal
- proteinGoal
- carbGoal
- fatGoal
- streakCount
- timestamps

## Reason

Needed a user schema before implementing authentication APIs.

## Outcome

Implemented:

- User model
- Validation rules
- Unique email constraint
- Nutrition goal fields
- Streak tracking

## Key Decisions

- Email uniqueness enforced
- Goal values stored on User document
- Mongoose timestamps enabled

## Impact

Created the core data structure required for registration, login, and personalized tracking.

## Iteration 3

### Prompt

Create a reusable JWT token generator.

Requirements:
- Use jsonwebtoken
- Accept userId
- Read JWT_SECRET from environment variables
- Expires in 30 days

### Outcome

Implemented:
- JWT utility function
- Token generation after registration
- User + Token response

### Challenges

- JWT_SECRET was missing from environment variables
- Atlas connection string required correction

### Resolution

- Added JWT_SECRET to .env
- Corrected MongoDB Atlas URI
- Restarted server after environment changes

### Impact

Completed secure token-based authentication flow.

## Iteration 4

### Prompt

Create loginUser controller.

Requirements:
- Accept email and password
- Find user by email
- Compare password using bcryptjs
- Generate JWT
- Return token and user
- Proper error handling

### Outcome

Implemented:
- Login endpoint
- Password verification
- JWT token generation
- Invalid credential handling

### Impact

Users can authenticate and receive secure access tokens for protected routes.

## Iteration 5

### Prompt

Create JWT authentication middleware.

Requirements:
- Verify token
- Protect routes
- Attach authenticated user to request

### Outcome

Implemented:
- Route protection middleware
- JWT verification
- User lookup from database

### Impact

Enabled secure access to user-specific resources.


## Frontend Integration

Integrated backend authentication APIs with React frontend.

Validated:
- Login API
- JWT persistence
- User session management
- Dashboard redirection