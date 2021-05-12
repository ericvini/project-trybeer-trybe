const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const secret = 'blitz';

const login = async (email, password) => {
  const user = await User.getByEmail(email);

  if (!user) return { status: 401, msg: 'user not found' };

  if (password !== user.password) return { status: 401, msg: 'wrong password' };

  const jwtConfig = {
    expiresIn: '15d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  const { name, role } = user;
  return { status: 200, msg: { name, email, role, token } };
};

module.exports = {
  login,
};
