const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.get('/products', ProductController.getAllProducts);
router.get('/images/:filename', ProductController.getImages);

module.exports = router;
