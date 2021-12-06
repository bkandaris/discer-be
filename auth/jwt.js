const { sign, verify } = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// create tokens
const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user._id },
    process.env.JWT_SECRET
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies['access-token'];
  if (!accessToken) {
    return res.status(500).json({ error: 'user not authenticated' });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
