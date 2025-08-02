import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: String },
  phone: { type: String },
  city: { type: String },
  state: { type: String },
  skills: { type: [String] },
  education: { type: String },
  resume: { type: String }, // Could be file URL or text
  role: { type: String, default: 'user' }
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
