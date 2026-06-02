const analyzeFood = async (imageUrl) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        foodName: "Sample Salad",
        calories: 350,
        protein: 12,
        carbs: 30,
        fat: 20
    };
};
module.exports = analyzeFood;