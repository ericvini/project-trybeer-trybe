const OrderService = require('../services/OrderService');

const serverError = 'server error';

const registerOrder = async (req, res) => {
  try {
  const order = req.body;
  const result = await OrderService.registerOrder(order);
  return res.status(result.status).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json(serverError);
  }  
};

const getAllOrders = async (_req, res) => {
  try {  
  const result = await OrderService.getAllOrders();
  return res.status(result.status).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: serverError });
  }  
};

const getOrderDetailsById = async (req, res) => {
  const { id } = req.params;
  try {  
  const result = await OrderService.getOrderDetailsById(id);
  return res.status(result.status).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: serverError });
  }  
};

const updateSale = async (req, res) => {
  try {
  const { saleId } = req.body;
  const updatedSale = await OrderService.updateSale(saleId);
  return res.status(200).json(updatedSale.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: serverError });
  }  
};

module.exports = {
  registerOrder,
  getAllOrders,
  getOrderDetailsById,
  updateSale,
};
