const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Make sure userId is set correctly
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid token structure' });
    }
    
    // Find user and attach to request
    User.findById(decoded.userId)
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
      })
      .catch(err => {
        console.error('User lookup error:', err.message);
        res.status(500).json({ message: 'Server error' });
      });
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};