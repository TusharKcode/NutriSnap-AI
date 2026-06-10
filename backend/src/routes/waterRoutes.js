const express = require('express');

const {
    addWaterEntry,
    getTodayWater,
    deleteWaterEntry,
} = require('../controllers/waterController');

const protect =
    require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/',
    protect,
    addWaterEntry
);

router.get(
    '/today',
    protect,
    getTodayWater
);

router.delete(
    '/:id',
    protect,
    deleteWaterEntry
);

module.exports = router;