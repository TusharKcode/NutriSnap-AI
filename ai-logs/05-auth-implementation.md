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