const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const { createTokens, validateToken } = require('../auth/jwt');

//Register
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      //   add extra profile features later
      // email, picture, skill level, etc.
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json('User does not exist');
    // creating jwt

    const accessToken = createTokens(user);

    res.cookie('access-token', accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });
    // Validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json('Wrong password');

    res.status(200).json({
      _id: user._id,
      username: user.username,
      token: accessToken,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user
router.get('/profile', validateToken, (req, res) => {
  res.status(200).json('profile');
});

module.exports = router;
