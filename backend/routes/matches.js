const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create a match
router.post('/:userId', auth, async (req, res) => {
  try {
    const matchedUser = await User.findById(req.params.userId);
    if (!matchedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add to matches array for both users
    if (!req.user.matches.includes(matchedUser._id)) {
      req.user.matches.push(matchedUser._id);
      matchedUser.matches.push(req.user._id);
      
      await req.user.save();
      await matchedUser.save();
    }

    res.json({ message: 'Match created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user matches
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('matches', '-password');
    res.json(user.matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 