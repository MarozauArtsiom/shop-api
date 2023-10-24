"use strict";

const products = require('./mock.json')

const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products)
  };
};

module.exports = {
  hello: handler,
};