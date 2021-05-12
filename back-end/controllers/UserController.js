const UserService = require('../services/UserService');

const serverError = 'server error';
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await UserService.registerUser(name, email, password, role);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: serverError });
  }
};

const updateUserName = async (req, res) => {
  try {
  const { newName, email } = req.body;
  const updatedUser = await UserService.updateUserName(newName, email);
  return res.status(200).json(updatedUser.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: serverError });
  }  
};

module.exports = {
  registerUser,
  updateUserName,
};
