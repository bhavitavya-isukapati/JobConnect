import express from 'express';
import {
  addJob,
  getJobs,
  getJobById,
  deleteJobById,
} from '../controllers/jobController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Import authMiddleware

const router = express.Router();

// Add a new job (admin route, protected by authMiddleware)
router.post('/', authMiddleware, addJob); 

// Get all jobs (public route, doesn't need authMiddleware)
router.get('/', getJobs); 

// Get a specific job by ID (public route)
router.get('/:id', getJobById); 

// Delete a job by ID (admin route, protected by authMiddleware)
router.delete('/:id', authMiddleware, deleteJobById); 

export default router;
