// routes/userRoutes.js
import express from 'express';
import { updateProfile, getProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile); // ✅ ADD THIS LINE

export default router;
