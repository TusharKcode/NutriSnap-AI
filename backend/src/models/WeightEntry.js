const mongoose = require('mongoose');

const weightEntrySchema =
    new mongoose.Schema(
        {
            userId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },

            weight: {
                type: Number,
                required: true,
                min: 1,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.models.WeightEntry ||
    mongoose.model(
        'WeightEntry',
        weightEntrySchema
    );