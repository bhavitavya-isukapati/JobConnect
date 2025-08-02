// models/JobApplication.js
import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  jobId: String,
  jobTitle: String,
  name: String,
  email: String,
  resume: String,
  message: String,
  appliedAt: {
    type: Date,
    default: Date.now 
  }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
