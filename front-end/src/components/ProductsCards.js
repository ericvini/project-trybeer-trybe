import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Context';
import Storage from '../services/storageFunctions';

function ProductsCards() {
  const history = useHistory();

  const { products } = useContext(MyContext);
  const [total, setTotal] = useState(0);

  const getQuantity = (name) => {
    if (Storage.getItem('cart')) {
      const cartItem = Storage.getItem('cart').find((item) => item.name === name);
      return cartItem === undefined ? 0 : cartItem.quantity;
    }
    return 0;
  };

  useEffect(() => {
    setTotal(Storage.getItem('totalCart') || 0);
  }, []);

  const setTotalCart = () => {
    const sumCart = Storage.getItem('cart')
      .reduce((totalItem, actual) => actual.totalItem + totalItem, 0);
    return (
      Storage.setItem('totalCart', sumCart),
      setTotal(sumCart)
    );
  };

  const addInCart = (id, name, price) => {
    if (Storage.getItem('cart')) {
      const cartItem = Storage.getItem('cart').find((item) => item.name === name);
      if (!cartItem) {
        const newCartStorage = [...Storage.getItem('cart'), {
          id,
          name,
          price,
          quantity: 1,
          totalItem: Number(price),
        }];
        return (
          Storage.setItem('cart', newCartStorage),
          setTotalCart()
        );
      }
      const newCartItem = {
        ...cartItem,
        quantity: cartItem.quantity + 1,
        totalItem: cartItem.totalItem + Number(price),
      };
      const newCartStorage = [...Storage.getItem('cart')
        .filter((item) => item.name !== name), newCartItem];
      return (
        Storage.setItem('cart', newCartStorage),
        setTotalCart()
      );
    }
    const cartItem = {
      id,
      name,
      price,
      quantity: 1,
      totalItem: Number(price),
    };
    return (
      Storage.setItem('cart', [cartItem]),
      setTotalCart()
    );
  };

  const removeFromCart = (name, price) => {
    const cartStorage = Storage.getItem('cart');
    const cartItem = cartStorage.find((item) => item.name === name);
    if (cartItem !== undefined) {
      const newQuantity = cartItem.quantity - 1;
      const newTotalItem = cartItem.totalItem - Number(price);
      const newCartItem = { ...cartItem, quantity: newQuantity, totalItem: newTotalItem };
      if (newQuantity < 1) {
        return (
          Storage.setItem('cart', cartStorage.filter((item) => item.name !== name)),
          setTotalCart()
        );
      }
      return (
        Storage.setItem('cart', [...cartStorage
          .filter((item) => item.name !== name), newCartItem]),
        setTotalCart()
      );
    }
  };

  return (
    <div className="div-container">
      {products.map((product, index) => (
        <div key={ product.id } className="div-container-card">
          <img
            src={ product.url_image.replace(/\s/g, '') }
            alt={ product.name }
            data-testid={ `${index}-product-img` }
            className="img-card"
          />
          <span data-testid={ `${index}-product-name` } className="name-card">
            { product.name }
          </span>
          <span data-testid={ `${index}-product-price` } className="price-unit-card">
            { Number(product.price)
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
          </span>
          <div className="quantity-button-span-card">
            <button
              type="button"
              data-testid={ `${index}-product-minus` }
              onClick={ () => removeFromCart(product.name, product.price) }
            >
              -
            </button>
            <span data-testid={ `${index}-product-qtd` }>
              { getQuantity(product.name) }
            </span>
            <button
              type="button"
              data-testid={ `${index}-product-plus` }
              onClick={ () => addInCart(product.id, product.name, product.price) }
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="checkout-button-container">
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={ () => history.push('/checkout') }
          disabled={ total === 0 }
          className="checkout-button"
        >
          Ver Carrinho &nbsp;
          <span data-testid="checkout-bottom-btn-value" className="checkout-button-text">
            { `R$ ${total.toFixed(2).replace('.', ',')}`}
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProductsCards;
