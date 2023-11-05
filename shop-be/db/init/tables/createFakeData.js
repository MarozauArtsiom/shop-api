const fakeProducts = require("./fake/products");
const fakeStocks = require("./fake/stocks");

const createFakeData = async (tables) => {
  const { Product, Stock } = tables;

  const products = await Product.bulkCreate(fakeProducts);
  const stocks = await Stock.bulkCreate(fakeStocks);

  return { products, stocks };
};

module.exports = createFakeData;
