import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';
import Storage from '../../services/storageFunctions';

function Profile() {
  const { sideIsActive, setPageTitle } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Meu perfil');
  }, [setPageTitle]);

  const [newName, setNewName] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [user, setUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    const userStorage = Storage.getItem('user');
    if (!userStorage) return history.push('/login');
    return setUser(userStorage);
  }, [history]);

  const { name, email } = user;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/profile', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ newName, email }),
    }).then((response) => response.json())
      .then((msg) => setUpdateMsg(msg))
      .catch(((err) => console.log(err.message)));
  };

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      <form onSubmit={ handleSubmit } className="main-container">
        <label htmlFor="profile-email-input" className="email-input-label">
          Email
          <input
            id="profile-email-input"
            data-testid="profile-email-input"
            className="email-input"
            type="email"
            placeholder={ email }
            readOnly
          />
        </label>
        <label htmlFor="profile-name-input" className="name-input-label">
          Nome
          <input
            id="profile-name-input"
            data-testid="profile-name-input"
            className="name-input"
            type="text"
            placeholder={ name }
            onChange={ (e) => setNewName(e.target.value) }
          />
        </label>
        <button
          data-testid="profile-save-btn"
          className="signin-btn"
          type="submit"
          disabled={ !newName }
        >
          Salvar
        </button>
      </form>
      <span>
        {updateMsg}
      </span>
    </div>
  );
}

export default Profile;
