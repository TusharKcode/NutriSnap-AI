const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        calorieGoal: {
            type: Number,
            default: 2000,
        },
        proteinGoal: {
            type: Number,
            default: 120,
        },
        carbGoal: {
            type: Number,
            default: 250,
        },
        fatGoal: {
            type: Number,
            default: 70,
        },
        waterGoal: {
            type: Number,
            default: 3000
        },
        weightGoal: {
            type: Number,
            default: 70,
        },
        streakCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
