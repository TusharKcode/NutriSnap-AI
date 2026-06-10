const mongoose = require('mongoose');

const waterEntrySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.WaterEntry ||
    mongoose.model(
        'WaterEntry',
        waterEntrySchema
    );