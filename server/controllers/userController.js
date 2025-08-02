// controllers/userController.js
import User from '../models/User.js';

// GET /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error in getUserProfile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/profile
export const updateUserProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      dob,
      city,
      state,
      skills,
      education,
      resume
    } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update only allowed fields
    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.dob = dob || user.dob;
    user.city = city || user.city;
    user.state = state || user.state;
    user.skills = skills || user.skills;
    user.education = education || user.education;
    user.resume = resume || user.resume;

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        dob: updatedUser.dob,
        city: updatedUser.city,
        state: updatedUser.state,
        skills: updatedUser.skills,
        education: updatedUser.education,
        resume: updatedUser.resume
      }
    });
  } catch (err) {
    console.error('Error in updateUserProfile:', err);
    res.status(500).json({ message: 'Error updating profile' });
  }
};
