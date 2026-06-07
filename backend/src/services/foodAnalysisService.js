const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(
	process.env.GEMINI_API_KEY
);

const analyzeFood = async (imagePath, mimeType) => {
	try {
		const model = genAI.getGenerativeModel({
			model: 'gemini-3.1-flash-lite',
		});

		const imageBuffer = fs.readFileSync(
			imagePath
		);

		const result =
			await model.generateContent([
				`
Analyze this food image.

Return ONLY valid JSON.

Format:

{
	"foodName": "",
	"calories": 0,
	"protein": 0,
	"carbs": 0,
	"fat": 0
}

Rules:
- Estimate values reasonably.
- No markdown.
- No explanation.
- JSON only.
`,
				{
					inlineData: {
						data: imageBuffer.toString(
							'base64'
						),
						mimeType: mimeType || 'image/jpeg',
					},
				},
			]);

		const text =
			result.response.text().trim();

		const jsonMatch = text.match(/\{[\s\S]*\}/);

		if (!jsonMatch) {
			throw new Error('No JSON returned');
		}

		return JSON.parse(jsonMatch[0]);

	} catch (error) {
		console.error(
			'[Gemini Food Analysis]',
			error
		);

		return {
			foodName: 'Unknown Food',
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
		};
	}
};

module.exports = analyzeFood;