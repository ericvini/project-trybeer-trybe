import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/user/Products';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Checkout from './pages/user/Checkout';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrdersId from './pages/admin/AdminOrdersId';
import AdminProfile from './pages/admin/AdminProfile';
import OrderDetails from './pages/user/OrderDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/products" component={ Products } />
      <Route exact path="/orders" component={ Orders } />
      <Route path="/orders/:id" component={ OrderDetails } />
      <Route exact path="/profile" component={ Profile } />
      <Route path="/checkout" component={ Checkout } />
      <Route exact path="/admin/orders" component={ AdminOrders } />
      <Route path="/admin/orders/:id" component={ AdminOrdersId } />
      <Route path="/admin/profile" component={ AdminProfile } />
    </Switch>
  );
}

export default App;
