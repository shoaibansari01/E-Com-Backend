const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.get('/addresses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user.addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Error fetching addresses', error: error.message });
  }
});

module.exports = router;