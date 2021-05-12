import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function OrderDetails() {
  const { sideIsActive } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState([]);
  // Referência: live lectures esquenta para Trybeer
  const { id } = useParams();

  const history = useHistory();
  useEffect(() => {
    const getUser = () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage) return history.push('/login');
    };
    getUser();
  }, [history]);

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const ordersList = await response.json();
      setOrder(ordersList);
      setIsLoading(false);
    };
    fetchOrders();
  }, [id]);
  // Referência: requisito 12 feito por Luise
  useEffect(() => {
    const sumProduct = order.reduce((totalItem, actual) => (Number(actual.price)
      * Number(actual.quantity)) + totalItem, 0);
    setTotal(sumProduct);
  }, [order]);
  const NINEAdicionaZero = 9;
  function adicionaZero(numero) {
    if (numero <= NINEAdicionaZero) return `0${numero}`;
    return numero;
  }
  const date = new Date(order[0] && order[0].sale_date);
  const day = adicionaZero(date.getUTCDate());
  const month = adicionaZero(date.getUTCMonth() + 1);
  const orderDate = `${day}/${month}`;
  // Referência:requisito 12 feito por Luise
  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      <h1 data-testid="top-title">Detalhes de Pedido</h1>
      { isLoading ? <span>Carregando...</span>
        : (
          <div className="details-container-order">
            <span data-testid="order-number">
              {`Pedido ${order[0] && order[0].sale_id} - `}
            </span>
            <span data-testid="order-date">
              {orderDate}
            </span>
            { order.map((product, index) => (
              <div key={ index } className="details-container">
                <span
                  data-testid={ `${index}-product-qtd` }
                  className="details-container-span"
                >
                  {product.quantity}
                </span>
                <span
                  data-testid={ `${index}-product-name` }
                  className="details-container-span"
                >
                  {product.name}
                </span>
                <span
                  data-testid={ `${index}-product-total-value` }
                  className="details-container-span"
                >
                  {`R$ ${(Number(product.price) * Number(product.quantity))
                    .toFixed(2).replace('.', ',')}`}
                </span>
                <span
                  data-testid={ `${index}-order-unit-price` }
                  className="details-container-span details-price"
                >
                  {`(R$ ${Number(product.price).toFixed(2).replace('.', ',')})`}
                </span>
              </div>
            ))}
            <span data-testid="order-total-value">
              {`R$ ${total.toFixed(2).replace('.', ',')}`}
            </span>
          </div>
        )}
    </div>
  );
}

export default OrderDetails;
