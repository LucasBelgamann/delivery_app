const { users } = require("../models");

const login = async (email, password) => {
  const user = await users.findOne({
    where: { email },
  });
  return user;
};

const register = async (name, email, password, role) => {
  const newUser = await users.create(name, email, password, role);
  console.log("newUser", newUser);
  return newUser;
};

const getUser = async (email) => {
  const { dataValues } = await users.findOne({ where: { email } });
  return dataValues.id;
};

const getAll = async () => {
  return await users.findAll();
};

module.exports = { login, register, getUser, getAll };
