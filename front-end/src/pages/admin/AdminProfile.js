import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import SideBarAdmin from '../../components/SideBarAdmin';
import Storage from '../../services/storageFunctions';

function AdminProfile() {
  const [user, setUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    const userStorage = Storage.getItem('user');
    if (!userStorage) return history.push('/login');
    return setUser(userStorage);
  }, [history]);

  const { name, email } = user;

  return (
    <div className="div-container">
      <SideBarAdmin />
      <h1>Perfil</h1>
      <div className="main-container">
        <span data-testid="profile-name" className="admin-profile-span">
          {`Nome: ${name}`}
        </span>
        <span data-testid="profile-email" className="admin-profile-span">
          {`Email: ${email}`}
        </span>
      </div>
    </div>
  );
}

export default AdminProfile;
