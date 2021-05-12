const connection = require('./connection');

const registerOrder = async ({ userId, totalCart, address, addressNumber, saleDate, status }) => {
  const query = `INSERT INTO Trybeer.sales (user_id, total_price,delivery_address,
    delivery_number,sale_date,status) VALUES (?,?,?,?,?,?)`;
  const [result] = await connection
    .execute(query, [userId, totalCart, address, addressNumber, saleDate, status]);
  return ({ id: result.insertId, userId, totalCart, address, addressNumber, saleDate, status });
};

const registerSalesProducts = async (saleId, productId, quantity) => {
  const query = `INSERT INTO Trybeer.sales_products (sale_id, product_id,
    quantity) VALUES (?,?,?)`;
  await connection.execute(query, [saleId, productId, quantity]);
};

const getOrderByUserId = async (userId) => { 
  const [[order]] = await connection
    .execute('SELECT * FROM Trybeer.sales WHERE user_id=?', [userId]);
  return order;
};

const getDate = async () => {
  const [[saleDate]] = await connection.execute('SELECT now() AS saleDate');
  return saleDate.saleDate;
};
const getOrderDetailsById = async (orderId) => {
  const [ordersDetails] = await connection
    .execute(`SELECT products.name,products.price,sales_products.quantity
    , sales_products.sale_id, sales.status, sales.sale_date
    FROM  sales
    INNER JOIN sales_products ON sales.id = sales_products.sale_id
    INNER JOIN products ON sales_products.product_id = products.id
    where sale_id = ?;`,
    [orderId]);
  return ordersDetails;
};

const getAllOrders = async () => {
  const [sales] = await connection
    .execute('SELECT * FROM Trybeer.sales');
  return sales;
};

const updateSale = async (saleId) => {
  const delivered = 'Entregue';
  const query = 'UPDATE Trybeer.sales SET status=? WHERE id=?';
  await connection.execute(query, [delivered, saleId]);
  const updatedSale = await getOrderDetailsById(saleId);
  return updatedSale[0].status;
};

module.exports = {
  registerOrder,
  getAllOrders,
  getOrderDetailsById,
  getOrderByUserId,
  getDate,
  registerSalesProducts,
  updateSale,
};
