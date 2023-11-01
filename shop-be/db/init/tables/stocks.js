const createStocksTable = (dynamodb, isFake) => {
  const params = {
    TableName: "stocks",
    KeySchema: [
      { AttributeName: "product_id", KeyType: "HASH" }, // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: "product_id", AttributeType: "S" }, // String
      { AttributeName: "count", AttributeType: "N" }, // Number
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 5,
    },
  };

  return dynamodb.createTable(params).promise();
};

const fakeStocks = (dynamodb) => {
    return Promise.resolve();
}

module.exports = {
    createTable: createStocksTable,
    fakeData: fakeStocks,
    tableName: 'stocks',
}