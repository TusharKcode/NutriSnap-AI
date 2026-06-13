# AI Log 02 - Database Design

## Prompt

Design a MongoDB schema for an AI-powered nutrition tracking application.

Requirements:

- User accounts
- Authentication support
- Nutrition goals
- Food diary tracking
- Water tracking
- Weight tracking
- Streak tracking
- Future analytics support

---

## Reason

A scalable database structure was required before implementing backend APIs and business logic.

The database needed to support both current MVP features and future expansion.

---

## Outcome

Designed the following collections:

### User Collection

Stores:

- Name
- Email
- Password Hash
- Nutrition Goals
- Water Goal
- Weight Goal

### FoodEntry Collection

Stores:

- User Reference
- Food Name
- Image URL
- Calories
- Protein
- Carbohydrates
- Fat
- Meal Type
- Created Date

### Water Tracking Collection

Stores:

- User Reference
- Water Intake
- Tracking Date

### Weight Tracking Collection

Stores:

- User Reference
- Weight Value
- Tracking Date

---

## Key Decisions

- MongoDB Atlas cloud database
- Mongoose ODM
- User-centric relationships
- Timestamp-based tracking
- Separate collections for scalability

---

## Future Support

Schema design supports:

- Advanced analytics
- Historical reports
- Weekly summaries
- Monthly insights
- AI recommendations

---

## Impact

Provided a stable backend foundation and enabled rapid implementation of dashboard, diary, goal tracking, and analytics features.