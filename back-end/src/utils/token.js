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

module.exports = {
  createToken,
  validateToken,
};
