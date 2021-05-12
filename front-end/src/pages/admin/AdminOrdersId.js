import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SideBarAdmin from '../../components/SideBarAdmin';

function AdminOrdersId() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('Pendente');
  const [hidden, setHidden] = useState(false);

  // Referência: live lectures esquenta para Trybeer
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/admin/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const sumProduct = order.reduce((totalItem, actual) => (Number(actual.price)
      * Number(actual.quantity)) + totalItem, 0);
    setTotal(sumProduct);
  }, [order]);

  const handleClick = () => {
    const saleId = order[0].sale_id;
    fetch(`http://localhost:3001/admin/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ saleId }),
    }).then((response) => response.json())
      .then((data) => {
        setStatus(data);
        setHidden(true);
      });
  };

  return (
    <div className="div-container">
      <SideBarAdmin />
      { isLoading ? <span>Carregando...</span>
        : (
          <div className="admin-container-order">
            <span data-testid="order-number" className="admin-orders-span font-style">
              {`Pedido ${order[0] && order[0].sale_id} - `}
            </span>
            <span
              data-testid="order-status"
              className={
                `${status === 'Pendente' ? 'admin-orders-span pendente'
                  : 'admin-orders-span entregue'}`
              }
            >
              {status}
            </span>
            { order.map((product, index) => (
              <div key={ index } className="admin-container-order">
                <span data-testid={ `${index}-product-qtd` }>
                  {product.quantity}
                </span>
                <span data-testid={ `${index}-product-name` }>
                  {product.name}
                </span>
                <span data-testid={ `${index}-product-total-value` }>
                  {`R$ ${(Number(product.price) * Number(product.quantity))
                    .toFixed(2).replace('.', ',')}`}
                </span>
                <span
                  data-testid={ `${index}-order-unit-price` }
                  className="details-price"
                >
                  {`(R$ ${Number(product.price).toFixed(2).replace('.', ',')})`}
                </span>
              </div>
            ))}
            <span
              data-testid="order-total-value"
              className="admin-orders-span font-style"
            >
              {`R$ ${total.toFixed(2).replace('.', ',')}`}
            </span>
            <button
              data-testid="mark-as-delivered-btn"
              type="button"
              onClick={ () => handleClick() }
              hidden={ hidden }
              className={ status === 'Pendente' && 'checkout-button' }
            >
              Marcar como entregue
            </button>
          </div>
        )}
    </div>
  );
}

export default AdminOrdersId;
