const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader;

        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        if (!process.env.JWT_SECRET) {
            console.error('[Auth] JWT_SECRET is not defined');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }

        console.error('[Auth] authMiddleware failed:', error.message);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;
