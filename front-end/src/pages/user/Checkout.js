import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';
import Storage from '../../services/storageFunctions';

function Checkout() {
  const {
    sideIsActive,
    setPageTitle,
  } = useContext(MyContext);

  const [userEmail, setUserEmail] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [checkoutMsg, setCheckoutMsg] = useState('');
  const [total, setTotal] = useState(0);

  const history = useHistory();

  useEffect(() => {
    setPageTitle('Finalizar Pedido');
  }, [setPageTitle]);

  useEffect(() => {
    const userStorage = Storage.getItem('user');
    if (!userStorage) return history.push('/login');
    setUserEmail(userStorage.email);
  }, [history]);

  useEffect(() => {
    setTotal(Storage.getItem('totalCart') || 0);
  }, []);

  const handleDelete = ({ target }) => {
    const cartStorage = Storage.getItem('cart');
    const newCartStorage = cartStorage.filter((item) => item.name !== target.value);
    Storage.setItem('cart', newCartStorage);
    const sumCart = Storage.getItem('cart')
      .reduce((totalItem, actual) => actual.totalItem + totalItem, 0);
    Storage.setItem('totalCart', sumCart);
    setTotal(sumCart);
  };

  const TWOSECONDS = 2000;

  const finished = () => history.push('/products');

  const handleCheckout = () => {
    fetch('http://localhost:3001/checkout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        totalCart: Storage.getItem('totalCart'),
        address,
        addressNumber,
        status: 'Pendente',
        cart: Storage.getItem('cart'),
      }),
    }).then((response) => response.json())
      .then((msg) => {
        console.log(msg);
        setCheckoutMsg(msg);
        if (msg.includes('sucesso')) {
          setTimeout(finished, TWOSECONDS);
        }
      })
      .catch(((err) => console.log(err.message)));
  };

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }

      <div className="checkout-container">
        <h2>Produtos</h2>

        { total === 0 && <h2>Não há produtos no carrinho</h2> }

        <ul>
          { total > 0 && Storage.getItem('cart').map((product, index) => (
            <li key={ index }>
              <span
                data-testid={ `${index}-product-qtd-input` }
                className="checkout-quantity"
              >
                {product.quantity}
              </span>
              <span data-testid={ `${index}-product-name` } className="checkout-name">
                {product.name}
              </span>
              <span
                data-testid={ `${index}-product-total-value` }
                className="checkout-value"
              >
                { Number(product.totalItem)
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
              </span>
              <span
                data-testid={ `${index}-product-unit-price` }
                className="checkout-unit-price"
              >
                {`(${Number(product.price)
                  .toLocaleString('pt-BR', {
                    style: 'currency', currency: 'BRL' })} un)`}
              </span>
              <button
                type="button"
                data-testid={ `${index}-removal-button` }
                value={ product.name }
                onClick={ (e) => handleDelete(e) }
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <h3 data-testid="order-total-value">
          {`Total: R$ ${total.toFixed(2).replace('.', ',')}`}
        </h3>
        <h2>Endereço</h2>
        <form className="form-container">
          <label htmlFor="checkout-street-input">
            Rua:
            <input
              id="checkout-street-input"
              data-testid="checkout-street-input"
              type="text"
              onChange={ (e) => setAddress(e.target.value) }
              className="checkout-form-input"
            />
          </label>
          <label htmlFor="checkout-house-number-input" className="checkout-form-label">
            Número da casa:
            <input
              id="checkout-house-number-input"
              data-testid="checkout-house-number-input"
              type="text"
              onChange={ (e) => setAddressNumber(e.target.value) }
              className="checkout-form-input"
            />
          </label>
        </form>
        <button
          type="button"
          data-testid="checkout-finish-btn"
          disabled={ !address || !addressNumber || !total }
          onClick={ handleCheckout }
          className="checkout-finish-button"
        >
          Finalizar Pedido
        </button>
      </div>
      <span>
        {checkoutMsg}
      </span>
    </div>
  );
}

export default Checkout;
