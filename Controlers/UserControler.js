import User from '../Models/UserModel.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Registration Controller
export const registerUser = async (req, res) => {
    const { username, partnerName } = req.body;

    try {
        // Check if a user with the same username and partnerName already exists
        const existingUser = await User.findOne({ username, partnerName });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this username and partner name already exists' });
        }

        // Create and save new user
        const newUser = new User({
            username,
            partnerName
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
