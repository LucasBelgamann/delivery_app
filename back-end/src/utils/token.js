require('dotenv/config');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const createToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  return token;
};

const validateToken = (token) => {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
};

const authenticateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === '') {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const payload = validateToken(authorization);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createToken,
  validateToken,
  authenticateToken,
};
