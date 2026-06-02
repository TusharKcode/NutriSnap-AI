require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'NutriSnap API Running' });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

if (!PORT) {
    console.error('PORT environment variable is not defined');
    process.exit(1);
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    }
};

startServer();
