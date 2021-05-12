const ProductModel = require('../models/ProductModel');

const getAllProducts = async (req, res) => {
  try {
    const result = await ProductModel.getAll();
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

const getImages = async (req, res) => {
  try {
    const { filename } = req.params;
    return res.download(`images/${filename}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json('server error');
  }
};

module.exports = {
  getAllProducts,
  getImages,
};
