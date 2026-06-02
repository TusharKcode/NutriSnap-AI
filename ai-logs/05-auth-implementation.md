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