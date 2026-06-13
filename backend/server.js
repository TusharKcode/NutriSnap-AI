require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const foodRoutes = require("./src/routes/foodRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const userRoutes = require("./src/routes/userRoutes");
const waterRoutes = require("./src/routes/waterRoutes.js");
const weightRoutes = require("./src/routes/weightRoutes");
const aiRoutes = require("./src/routes/aiRoutes");

const app = express();
const path = require("path");

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "YOUR_FRONTEND_URL"
        ],
        credentials: true
    })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.json({ message: "NutriSnap API Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/weight", weightRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

if (!PORT) {
    console.error("PORT environment variable is not defined");
    process.exit(1);
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
};

startServer();
