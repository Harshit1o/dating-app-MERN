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

    // Check if users are already matched
    if (req.user.matches.includes(matchedUser._id)) {
      return res.status(400).json({ error: 'Already matched with this user' });
    }

    // Add to matches array for both users
    req.user.matches.push(matchedUser._id);
    matchedUser.matches.push(req.user._id);
    
    await req.user.save();
    await matchedUser.save();

    res.json({ message: 'Match created successfully' });
  } catch (error) {
    console.error('Match creation error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get user matches
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('matches', '-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.matches);
  } catch (error) {
    console.error('Fetch matches error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get match details
router.get('/:matchId', auth, async (req, res) => {
  try {
    const match = await User.findById(req.params.matchId).select('-password');
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(match);
  } catch (error) {
    console.error('Fetch match details error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 