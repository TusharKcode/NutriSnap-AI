const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateMealSuggestions(data) {
    const model = genAI.getGenerativeModel({
        model: "gemini-3.1-flash-lite",
    });

    const prompt = `
You are an expert nutrition coach.

User Goals:
Calories: ${data.goals.calories}
Protein: ${data.goals.protein}
Carbs: ${data.goals.carbs}
Fat: ${data.goals.fat}

Current Intake Today:
Calories: ${data.current.calories}
Protein: ${data.current.protein}
Carbs: ${data.current.carbs}
Fat: ${data.current.fat}

Recent Foods:
${data.recentMeals.join(', ')}

Provide:

Breakfast
Lunch
Dinner
Snack
Sweet

For each recommendation:
- Food name
- Short reason

Keep response under 200 words.
Use simple formatting.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = generateMealSuggestions;
