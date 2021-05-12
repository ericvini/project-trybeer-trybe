import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyContext from '../context/Context';

function SideBarAdmin() {
  const { setEmail, setPassword } = useContext(MyContext);
  const history = useHistory();

  const handleClick = () => {
    setEmail('');
    setPassword('');
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div className="side-menu-container-admin">
      <h1 className="pageAdmin-title">TryBeer</h1>
      <nav className="side-menu-link">
        <Link
          to="/admin/orders"
          data-testid="side-menu-item-orders"
          className="sidebar-link"
        >
          Pedidos
        </Link>
        <Link
          to="/admin/profile"
          data-testid="side-menu-item-profile"
          className="sidebar-link"
        >
          Perfil
        </Link>
      </nav>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        className="sidebar-logout"
        onClick={ () => handleClick() }
      >
        Sair
      </button>
    </div>
  );
}

export default SideBarAdmin;
