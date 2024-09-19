import express from 'express';
import { registerUser } from '../Controlers/UserControler.js'

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);


export default router;
