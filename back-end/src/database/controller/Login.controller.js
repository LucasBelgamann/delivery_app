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

  res.status(200).json({ ...payload, token });
};

const register = async (req, res) => {
  const { name, password, email, role } = req.body;

  const user = await service.login(email, password);

  if (user) return res.status(409).json({ message: "User already registered" });

  await service.register({ name, password, email, role });

  res.status(201).json()
};

module.exports = { login, register };
