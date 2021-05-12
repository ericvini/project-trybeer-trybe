const LoginService = require('../services/LoginService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await LoginService.login(email, password);

    return res.status(result.status).json(result.msg);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

module.exports = {
  login,
};
