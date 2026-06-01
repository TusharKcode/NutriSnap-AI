# Register Flow

User
↓
Frontend Form
↓
POST /api/auth/register
↓
Password Hashing
↓
MongoDB
↓
JWT Token
↓
Frontend

--------------------------------

# Login Flow

User
↓
POST /api/auth/login
↓
Verify Password
↓
Generate JWT
↓
Return User + Token