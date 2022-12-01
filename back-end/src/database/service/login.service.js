const md5 = require("md5");
const { users } = require("../models");

const login = async (email, password) => {
  const user = await users.findOne({
    where: { email, password }});
    console.log(user);
  return user;
};

module.exports = { login };
