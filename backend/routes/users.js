const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all users (for discovery)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
      matches: { $ne: req.user._id }
    }).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Fetch user error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/:id', auth, async (req, res) => {
  // Check if user is updating their own profile
  if (req.params.id !== req.user._id.toString()) {
    return res.status(403).json({ error: 'Not authorized to update this profile' });
  }

  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'bio', 'interests', 'location', 'profilePicture'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    updates.forEach(update => {
      if (update === 'interests') {
        // Handle interests as an array
        req.user[update] = req.body[update].split(',').map(i => i.trim()).filter(i => i);
      } else {
        req.user[update] = req.body[update];
      }
    });

    await req.user.save();
    res.json(req.user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 