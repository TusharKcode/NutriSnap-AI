const express = require('express');
const { uploadFood, getDiary, analyzeFoodImage, deleteFoodEntry } = require('../controllers/foodController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

const upload = require('../middleware/uploadMiddleware');

router.post(
	'/upload',
	protect,
	upload.single('image'),
	uploadFood
);
router.get('/diary', protect, getDiary);

router.post(
    '/analyze',
    protect,
    upload.single('image'),
    analyzeFoodImage
);

router.delete(
    '/:id',
    protect,
    deleteFoodEntry
);

module.exports = router;
