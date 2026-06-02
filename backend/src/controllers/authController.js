const bcrypt = require('bcryptjs');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        await user.save();

        const token = generateToken(user._id);
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            token,
            user: userResponse,
        });
    } catch (error) {
        console.error('[Auth] registerUser failed:', error);
        res.status(500).json({ message: 'Server error while registering user' });
    }
};

module.exports = { registerUser };
