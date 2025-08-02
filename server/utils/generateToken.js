import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role, // include role for route protection
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export default generateToken;
