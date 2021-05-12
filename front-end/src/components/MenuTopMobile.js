import React, { useContext } from 'react';
import MyContext from '../context/Context';

function MenuTop() {
  const { pageTitle, sideIsActive, setSideIsActive } = useContext(MyContext);

  return (
    <div className="menu-top-container">
      <button
        className="menu-hamburger"
        type="button"
        data-testid="top-hamburguer"
        onClick={ () => setSideIsActive(!sideIsActive) }
      >
        <span className="span-menu-hamburger span-menu-1" />
        <span className="span-menu-hamburger" />
        <span className="span-menu-hamburger" />
      </button>
      <div>
        <h1 className="page-title" data-testid="top-title">{ pageTitle }</h1>
      </div>
    </div>
  );
}

export default MenuTop;
