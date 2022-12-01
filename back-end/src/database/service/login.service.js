const md5 = require('md5');
const { users } = require('../models');

const createUser = async (email, password) => {
    const crypto = md5(password);
    const user = await users.findOne({ where: { email, password: crypto } });
    return user;
};


module.exports = { createUser };
