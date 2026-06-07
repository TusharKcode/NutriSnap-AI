const express = require('express');
const { uploadFood, getDiary, analyzeFoodImage } = require('../controllers/foodController');
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

module.exports = router;
