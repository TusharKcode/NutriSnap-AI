const express =
    require('express');

const {
    addWeightEntry,
    getWeightHistory,
    deleteWeightEntry,
} = require(
    '../controllers/weightController'
);

const protect =
    require('../middleware/authMiddleware');

const router =
    express.Router();

router.post(
    '/',
    protect,
    addWeightEntry
);

router.get(
    '/',
    protect,
    getWeightHistory
);

router.delete(
    '/:id',
    protect,
    deleteWeightEntry
);

module.exports = router;