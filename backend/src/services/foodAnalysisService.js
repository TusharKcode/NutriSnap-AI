const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(
	process.env.GEMINI_API_KEY
);

const analyzeFood = async (imagePath) => {
	try {
		console.log('Analyzing:', imagePath);

		return {
			foodName: '',
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
		};
	} catch (error) {
		console.error(
			'[Gemini Analysis Error]',
			error
		);

		throw error;
	}
};

module.exports = analyzeFood;