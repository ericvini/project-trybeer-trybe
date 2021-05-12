import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import MyContext from '../context/Context';

function OrderCard(props) {
  const { setOrderDetail } = useContext(MyContext);
  const history = useHistory();
  const NINEAdicionaZero = 9;
  // const mystyle = {
  //   padding: '10px',
  //   fontFamily: 'Arial',
  // };
  function adicionaZero(numero) {
    if (numero <= NINEAdicionaZero) return `0${numero}`;
    return numero;
  }
  const { order, index } = props;
  const date = new Date(order.sale_date);
  const day = adicionaZero(date.getUTCDate());
  const month = adicionaZero(date.getUTCMonth() + 1);
  const orderDate = `${day}/${month}`;
  const { id } = order;
  const { total_price: totalPrice } = order;
  const totalPriceFormated = totalPrice.replace('.', ',');
  const orderObj = {
    id,
    totalPrice,
    index,
    orderDate,
  };

  const renderOrderDetail = () => {
    setOrderDetail(orderObj);
    history.push(`/orders/${id}`);
  };

  return (
    <button
      type="button"
      // tabIndex={ 0 }
      onClick={ () => renderOrderDetail() }
      onKeyDown={ () => renderOrderDetail() }
      // style={ mystyle }
      data-testid={ `${index}-order-card-container` }
      className="container-order-card checkout-container"
    >
      <span data-testid={ `${index}-order-number` } className="font-style">
        {`Pedido ${id}`}
      </span>
      <span data-testid={ `${index}-order-date` }>{` ${orderDate}`}</span>
      <span
        data-testid={ `${index}-order-total-value` }
      >
        {` R$ ${totalPriceFormated}`}
      </span>

    </button>
  );
}
OrderCard.propTypes = {
  index: PropTypes.number.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number,
    sale_date: PropTypes.string,
    total_price: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
