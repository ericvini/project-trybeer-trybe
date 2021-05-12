const OrderModel = require('../models/OrderModel');
const UserModel = require('../models/UserModel');

const registerOrder = async (order) => {
  const saleDate = await OrderModel.getDate();
  const { userEmail, totalCart, address, addressNumber, status, cart } = order;
  const user = await UserModel.getByEmail(userEmail);
  const { id } = user;
  const newOrder = await OrderModel.registerOrder({
    userId: id,
    totalCart,
    address, 
    addressNumber,
    saleDate,
    status });
  
  const saleId = newOrder.id;

  cart.forEach(async (item) => {
    await OrderModel.registerSalesProducts(saleId, item.id, item.quantity);
  });

  return { status: 201, message: 'Compra realizada com sucesso!' };
};
const getAllOrders = async () => {
  const allOrders = await OrderModel.getAllOrders();
  return { status: 200, message: allOrders };
};
const getOrderDetailsById = async (orderId) => {
  const orderDetails = await OrderModel.getOrderDetailsById(orderId);
  return { status: 200, message: orderDetails };
};

const updateSale = async (saleId) => {
  const updatedStatus = await OrderModel.updateSale(saleId);
  return { status: 200, message: updatedStatus };
};

module.exports = {
  registerOrder,
  getAllOrders,
  getOrderDetailsById,
  updateSale,
};
