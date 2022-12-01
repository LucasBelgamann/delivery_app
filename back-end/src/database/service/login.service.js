const md5 = require("md5");
const { users } = require("../models");

const login = async (email, password) => {
  const user = await users.findOne({
    where: { email, password }});
    console.log(user);
  return user;
};

const register = async (name, email, password, role) => {
  const newUser = await users.create(name, email, password, role);
  return newUser;
}

module.exports = { login, register };
