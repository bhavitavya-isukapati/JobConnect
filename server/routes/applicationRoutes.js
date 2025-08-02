import express from 'express';
import { submitApplication, getAllApplications } from '../controllers/applicationController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Import authMiddleware

const router = express.Router();

// Submit new job application
router.post('/', authMiddleware, submitApplication); // Protect route with authMiddleware

// Get all job applications (you can add admin role check if needed)
router.get('/', authMiddleware, getAllApplications); // Protect route with authMiddleware

export default router;
