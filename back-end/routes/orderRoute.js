const express = require('express');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

router.post('/checkout', OrderController.registerOrder);
router.get('/orders', OrderController.getAllOrders);
router.get('/orders/:id', OrderController.getOrderDetailsById);
router.get('/admin/orders', OrderController.getAllOrders);
router.get('/admin/orders/:id', OrderController.getOrderDetailsById);
router.put('/admin/orders/:id', OrderController.updateSale);

module.exports = router;
