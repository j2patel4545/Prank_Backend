import User from '../Models/UserModel.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @desc   Register new user
 * @route  POST /register
 */
export const registerUser = async (req, res) => {
    const { username, partnerName, loveLuckPercentage } = req.body;

    try {
        // Check duplicate user (username + partnerName)
        const existingUser = await User.findOne({ username, partnerName });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this username and partner name already exists'
            });
        }

        const newUser = new User({
            username,
            partnerName,
            loveLuckPercentage
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error
        });
    }
};

/**
 * @desc   Get all users
 * @route  GET /users
 */
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

/**
 * @desc   Get user by ID
 * @route  GET /users/:id
 */
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get user by id error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error
        });
    }
};
