const UserModel = require('../models/UserModel');

const registerUser = async (name, email, password, role) => {
  const user = await UserModel.getByEmail(email);
  if (user !== undefined) return { status: 401, message: 'Já existe um usuário com esse e-mail.' };
  const newUser = await UserModel.registerUser(name, email, password, role);
  return { status: 201, message: newUser };
};

const updateUserName = async (newName, email) => {
  await UserModel.updateUserName(newName, email);
  return { status: 200, message: 'Atualização concluída com sucesso' };
};

module.exports = {
  registerUser,
  updateUserName,
};
