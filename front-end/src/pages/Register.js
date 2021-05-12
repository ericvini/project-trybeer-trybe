import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import MyContext from '../context/Context';

function Register() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    role,
    setRole } = useContext(MyContext);

  const [errorEmail, setErrorEmail] = useState(false);

  const history = useHistory();
  const UNAUTHORIZED = 401;

  const userExistsMsg = 'Já existe um usuário com esse e-mail.';
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    }).then((response) => (response.json()))
      .then((data) => {
        if (data.status === UNAUTHORIZED) return setErrorEmail(true);
        return localStorage.setItem('user', JSON.stringify(data.message));
      })
      .then(() => {
        const userStorage = JSON.parse(localStorage.getItem('user'));
        if (userStorage.role === 'client') {
          history.push('/products');
        } else {
          history.push('/admin/orders');
        }
      });
  };

  const minName = 12;
  const validateName = () => {
    const regexName = /^[a-z\s]+$/i;
    return name && name.length >= minName && regexName.test(name);
  };

  const validateEmail = () => {
    const regexEmail = /[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i;
    return email && regexEmail.test(email);
  };

  const minPassword = 6;
  const validatePassword = () => password && password.length >= minPassword;

  const isDisabled = () => !validateName() || !validateEmail() || !validatePassword();

  return (
    <form onSubmit={ handleSubmit } className="main-container">
      <label htmlFor="signup-name" className="name-input-label">
        Nome
        <input
          id="signup-name"
          data-testid="signup-name"
          type="text"
          onChange={ (e) => setName(e.target.value) }
          className="name-input"
        />
      </label>
      <label htmlFor="signup-email" className="email-input-label">
        Email
        <input
          id="signup-email"
          data-testid="signup-email"
          type="email"
          onChange={ (e) => setEmail(e.target.value) }
          className="email-input"
        />
      </label>
      <label htmlFor="signup-password" className="password-input-label">
        Senha
        <input
          id="signup-password"
          data-testid="signup-password"
          type="password"
          onChange={ (e) => setPassword(e.target.value) }
          className="password-input"
        />
      </label>
      <label htmlFor="signup-seller" className="seller-input-label">
        Quero vender
        <input
          id="signup-seller"
          data-testid="signup-seller"
          type="checkbox"
          className="seller-input"
          onChange={ (e) => setRole(e.target.checked === true
            ? 'administrator' : 'client') }
        />
      </label>
      <button
        data-testid="signup-btn"
        type="submit"
        disabled={ isDisabled() }
        className="signin-btn"
      >
        Cadastrar
      </button>
      { errorEmail && <span>{userExistsMsg}</span> }
    </form>
  );
}

export default Register;
