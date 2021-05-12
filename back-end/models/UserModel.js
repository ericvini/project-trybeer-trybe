const connection = require('./connection');

const getByEmail = async (email) => { 
  const query = 'SELECT * FROM Trybeer.users WHERE email=?';
  const [[user]] = await connection.execute(query, [email]);
  return user;
};

const registerUser = async (name, email, password, role) => {
  const query = 'INSERT INTO Trybeer.users (name, email, password, role) VALUES (?,?,?,?)';
  const [result] = await connection.execute(query, [name, email, password, role]);
  return ({ id: result.insertId, name, email, role });
};

const updateUserName = async (newName, email) => {
  const query = 'UPDATE Trybeer.users SET name=? WHERE email=?';
  await connection.execute(query, [newName, email]);
};

module.exports = {
  getByEmail,
  registerUser,
  updateUserName,
};
