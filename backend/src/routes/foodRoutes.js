const express = require('express');
const { uploadFood, getDiary } = require('../controllers/foodController');
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

module.exports = router;
