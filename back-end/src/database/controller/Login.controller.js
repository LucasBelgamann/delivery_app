const service = require("../service/login.service");
const jwt = require('jsonwebtoken');

require("dotenv").config();

const { JWT_SECRET } = process.env || "secret";

const createUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await service.createUser(email, password);
  if (!user)
    return res.status(404).json({ message: "User already registered" });

  const payload = {
    email,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });

  res.status(201).json({ token });
};

module.exports = { createUser };