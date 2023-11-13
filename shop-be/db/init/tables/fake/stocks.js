const products = require("./products");

const fakeStocks = products.map((product) => {
  return {
    product_id: product.id,
    count: Math.trunc(Math.random() * 100),
  };
});

module.exports = fakeStocks;
