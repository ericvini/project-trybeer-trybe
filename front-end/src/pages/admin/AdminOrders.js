import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import SideBarAdmin from '../../components/SideBarAdmin';

function AdminOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/admin/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="div-container">
      <SideBarAdmin />
      { isLoading ? <span>Carregando...</span>
        : (
          <div>
            { orders.map((order, index) => (
              <button
                type="button"
                onClick={ () => history.push(`/admin/orders/${order.id}`) }
                key={ order.id }
                className="admin-container-order"
              >
                <span
                  data-testid={ `${index}-order-number` }
                  className="admin-orders-span font-style"
                >
                  {`Pedido ${order.id}`}
                </span>
                <span
                  data-testid={ `${index}-order-address` }
                  className="admin-orders-span"
                >
                  {`${order.delivery_address}, ${order.delivery_number}`}
                </span>
                <span
                  data-testid={ `${index}-order-total-value` }
                  className="admin-orders-span font-style"
                >
                  {`R$ ${order.total_price.replace('.', ',')}`}
                </span>
                <span
                  data-testid={ `${index}-order-status` }
                  className={
                    `${order.status === 'Pendente' ? 'admin-orders-span pendente'
                      : 'admin-orders-span entregue'}`
                  }
                >
                  {order.status}
                </span>
              </button>
            ))}
          </div>)}
    </div>
  );
}

export default AdminOrders;
