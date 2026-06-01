# User Registration
POST /api/auth/register
Request:
{
    name, 
    email, 
    password
}

Response:
{
    message, 
    token
}

# User Login
POST /api/auth/login
Request:
{ 
    email, 
    password
}

Response:
{ 
    token,
    user
}

# Food Upload
POST /api/food/upload
Request:
multipart/form-data
image

Response:
{ 
    foodName,
    calories,
    protien,
    carbs,
    fat
}

# Dashboard
Response:
{ 
    caloriesToday,
    protienToday,
    carbsToday,
    fatToday,
    streakCount
}