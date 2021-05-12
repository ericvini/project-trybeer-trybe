import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';
import OrderCard from '../../components/OrderCard';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { sideIsActive, setPageTitle } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    const getUser = () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage) return history.push('/login');
    };
    getUser();
  }, [history]);

  useEffect(() => {
    setPageTitle('Meus Pedidos');
  }, [setPageTitle]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const ordersList = await response.json();
      setOrders(ordersList);
    };
    fetchOrders();
  }, []);
  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      <div className="container-order-card">
        {orders.map((order, index) => (<OrderCard
          key={ index }
          order={ order }
          index={ index }
        />))}
      </div>

    </div>
  );
}

export default Orders;
