import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';
import ProductsCards from '../../components/ProductsCards';
import Storage from '../../services/storageFunctions';

function Products() {
  const {
    sideIsActive,
    setPageTitle,
    setProducts,
  } = useContext(MyContext);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setPageTitle('TryBeer');
  }, [setPageTitle]);

  useEffect(() => {
    const userStorage = Storage.getItem('user');
    if (!userStorage) return history.push('/login');
  }, [history]);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, [setProducts]);

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      {isLoading ? <span>Carregando...</span> : <ProductsCards />}
    </div>
  );
}

export default Products;
