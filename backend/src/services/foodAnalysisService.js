const analyzeFood = async (imageUrl) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockFoods = [
        {
            foodName: "Chicken Rice Bowl",
            calories: 650,
            protein: 42,
            carbs: 55,
            fat: 18,
        },
        {
            foodName: "Veggie Salad",
            calories: 280,
            protein: 10,
            carbs: 22,
            fat: 14,
        },
        {
            foodName: "Cheese Pizza",
            calories: 720,
            protein: 28,
            carbs: 85,
            fat: 30,
        },
        {
            foodName: 'Sample Salad',
            calories: 350,
            protein: 12,
            carbs: 30,
            fat: 20,
        }
    ];

    return mockFoods[Math.floor(Math.random() * mockFoods.length)];
};