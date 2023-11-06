const fakeProducts = require("./fake/products");
const fakeStocks = require("./fake/stocks");

const createFakeData = async (tables, transaction) => {
  const { Product, Stock } = tables;

  const products = await Product.bulkCreate(fakeProducts, { transaction });
  const stocks = await Stock.bulkCreate(fakeStocks, { transaction });

  return { products, stocks };
};

module.exports = createFakeData;
