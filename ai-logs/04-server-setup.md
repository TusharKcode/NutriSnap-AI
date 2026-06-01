# AI Log 04 - Server Setup

## Prompt

Create a MongoDB connection module using Mongoose.

Requirements:
- Read MONGODB_URI from environment variables
- Use async/await
- Display success message when connected
- Display error message if connection fails
- Export the connection function

Create an Express server.

Requirements:
- dotenv configuration
- express
- cors
- connectDB function
- JSON middleware
- GET / route returning:

{
  "message": "NutriSnap API Running"
}

- Listen on process.env.PORT

## Reason

Needed backend foundation before authentication development.

## Outcome

Implemented:

- Express server
- MongoDB Atlas connection
- Environment variable support
- Health check endpoint

## Key Decisions

- Used Mongoose
- Used dotenv
- Used nodemon for development

## Impact

Established backend infrastructure required for all future APIs.