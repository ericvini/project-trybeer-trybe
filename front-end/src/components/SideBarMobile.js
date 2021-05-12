import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyContext from '../context/Context';

function SideBarMobile() {
  const { setEmail, setPassword } = useContext(MyContext);
  const history = useHistory();

  const handleClick = () => {
    setEmail('');
    setPassword('');
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div className="side-menu-container">
      <div className="side-menu-link">
        <Link
          to="/products"
          data-testid="side-menu-item-products"
          className="sidebar-link"
        >
          Produtos
        </Link>
        <Link
          to="/orders"
          data-testid="side-menu-item-my-orders"
          className="sidebar-link"
        >
          Meus Pedidos
        </Link>
        <Link
          to="/profile"
          data-testid="side-menu-item-my-profile"
          className="sidebar-link"
        >
          Meu Perfil
        </Link>
      </div>
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

export default SideBarMobile;
