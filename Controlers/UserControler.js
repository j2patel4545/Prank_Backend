import User from '../Models/UserModel.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Registration Controller
export const registerUser = async (req, res) => {
    const { username, partnerName, loveLuckPercentage } = req.body; // Add loveLuckPercentage to destructuring

    try {
        // Check if a user with the same username and partnerName already exists
        const existingUser = await User.findOne({ username, partnerName });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this username and partner name already exists' });
        }

        // Create and save new user with loveLuckPercentage
        const newUser = new User({
            username,
            partnerName,
            loveLuckPercentage  // Save loveLuckPercentage
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: users.length,
            data: users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error
        });
    }
};

