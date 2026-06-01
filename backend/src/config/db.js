const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        const error = new Error('MONGODB_URI environment variable is not defined');
        console.error('[MongoDB] Connection failed:', error.message);
        throw error;
    }

    try {
        await mongoose.connect(uri);

        console.log('[MongoDB] Connected successfully');
    } catch (err) {
        console.error('[MongoDB] Connection failed:', err.message);
        throw err;
    }
};

module.exports = connectDB;
