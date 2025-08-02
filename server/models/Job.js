import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  requirements: [String],
  responsibilities: [String],
  preferredQualifications: [String],
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', jobSchema);
export default Job; // <-- Add this line
