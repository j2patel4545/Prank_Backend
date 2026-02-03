import express from 'express';
import {
    registerUser,
    getAllUsers,
    getUserById
} from '../Controlers/UserControler.js';

const router = express.Router();

// User registration
router.post('/register', registerUser);

// Get all users
router.get('/users', getAllUsers);

// Get user by ID
router.get('/users/:id', getUserById);

export default router;
