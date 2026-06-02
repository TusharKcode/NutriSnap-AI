const express = require('express');
const FoodEntry = require('../models/FoodEntry');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /upload - create a new food entry (protected)
router.post('/upload', authMiddleware, async (req, res) => {
    try {
        const { userId, foodName, imageUrl, calories, protein, carbs, fat, mealType } = req.body;

        if (!userId || !foodName || calories == null || protein == null || carbs == null || fat == null) {
            return res.status(400).json({ message: 'Missing required fields: userId, foodName, calories, protein, carbs, fat' });
        }

    const entry = new FoodEntry({
        userId,
        foodName: String(foodName).trim(),
        imageUrl: imageUrl || undefined,
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        mealType: mealType ? String(mealType).trim() : undefined,
    });

    await entry.save();

    res.status(201).json({ success: true, entry });
    } catch (error) {
        console.error('[FoodRoutes] POST /upload failed:', error);
        res.status(500).json({ message: 'Server error while uploading food entry' });
    }
});

// GET /diary?userId=... - fetch food entries for a user (protected)
router.get('/diary', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'Query parameter userId is required' });
        }

    const entries = await FoodEntry.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, entries });
    } catch (error) {
        console.error('[FoodRoutes] GET /diary failed:', error);
        res.status(500).json({ message: 'Server error while fetching diary entries' });
    }
});

module.exports = router;
