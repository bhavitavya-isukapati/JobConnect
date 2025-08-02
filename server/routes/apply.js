import express from 'express';
import multer from 'multer';
import { submitApplication } from '../controllers/applicationController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Import authMiddleware

const router = express.Router();

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure 'uploads/' directory exists in your backend root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Apply for a job route (protected by authMiddleware)
router.post('/', authMiddleware, upload.single('resume'), submitApplication); 

export default router;
