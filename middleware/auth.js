const jwt = require('jsonwebtoken');
const config = require('../config/config');
const sessionService = require('../domain/services/sessionService');

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');

  // Check if token is not present
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' }); 

  // Remove 'Bearer' from the token if present
  const actualToken = token.startsWith('Bearer ')
    ? token.slice(7, token.length).trimLeft()
    : token;

  try {
    // Verify token
    jwt.verify(actualToken, config.jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: err });
      }
      req.user = decoded;
      next();
    });
  } catch (ex) {
    res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};

module.exports = auth;
