const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateMealSuggestions(data) {
    const model = genAI.getGenerativeModel({
        model: "gemini-3.1-flash-lite",
    });

    const prompt = `
You are a nutrition coach.

Daily Goals:
Calories: ${data.goals.calories}
Protein: ${data.goals.protein}
Carbs: ${data.goals.carbs}
Fat: ${data.goals.fat}

Current Intake:
Calories: ${data.current.calories}
Protein: ${data.current.protein}
Carbs: ${data.current.carbs}
Fat: ${data.current.fat}

Recent Meals:
${data.recentMeals.join(", ")}

Suggest:

1. Breakfast
2. Lunch
3. Dinner
4. Healthy Snack
5. Sweets

Keep response concise.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = generateMealSuggestions;
