const mongoose = require('mongoose');

const foodEntrySchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		foodName: {
			type: String,
			required: true,
			trim: true,
		},
		imageUrl: {
			type: String,
		},
		calories: {
			type: Number,
			required: true,
		},
		protein: {
			type: Number,
			required: true,
		},
		carbs: {
			type: Number,
			required: true,
		},
		fat: {
			type: Number,
			required: true,
		},
		mealType: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('FoodEntry', foodEntrySchema);
