const service = require("../service/login.service");
const { createToken } = require("../../utils/token");
const md5 = require("md5");

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await service.login(email, password);

  if (!user) return res.status(404).json({ message: "User not found" });
  if (!password === md5(user.dataValues.password)) {
    return res.status(404).json({ message: "invalid password" });
  }

  const payload = {
    name: user.dataValues.name,
    email: user.dataValues.email,
    password: md5(user.dataValues.password),
    role: user.dataValues.role,
  };

  const token = createToken(payload);

  res.status(201).json({ ...payload, token });
};

module.exports = { login };
