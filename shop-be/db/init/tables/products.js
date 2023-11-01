const createProductsTable = (dynamodb, isFake) => {
  const params = {
    TableName: "products",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" }, // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" }, // String
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 5,
    },
  };

  return dynamodb.createTable(params).promise();
};

const fakeProducts = (dynamodb) => {
    return Promise.resolve();
}

module.exports = {
    createTable: createProductsTable,
    fakeData: fakeProducts,
    tableName: 'products',
}