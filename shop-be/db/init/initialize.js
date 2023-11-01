const AWS = require("aws-sdk");
const tables = require("./tables");

const databaseUrl = process.env.DATABASE_URL || "http://localhost:8000";
const region = process.env.region || "local";
const isFake = !!process.env.NEED_FAKE_DATA;

// Configure the AWS SDK to connect to the local DynamoDB instance
AWS.config.update({
  region: region,
  endpoint: databaseUrl,
});

// Create a new DynamoDB service object
const dynamodb = new AWS.DynamoDB();

const tableActions = Object.keys(tables).map(async (tableKey) => {
  const table = tables[tableKey];
  try {
    await table.createTable(dynamodb, isFake);
  } catch (error) {
    console.log(
      `[Create Table: "${table.tableName}"] Error in "${region}" region`
    );
    console.log(`at host: ${databaseUrl}`);
    console.log(`at: ${new Date()}`);
    console.log(error);

    // throw error to stop the process
    throw error;
  }
  try {
    await table.fakeData(dynamodb);
  } catch (error) {
    console.log(
      `[Error fake data: "${table.tableName}"] Error in "${region}" region`
    );
    console.log(`at host: ${databaseUrl}`);
    console.log(`at: ${new Date()}`);
    console.log(error);

    // throw error to stop the process
    throw error;
  }
});

Promise.all(tableActions)
  .then(() => {
    console.log("!!!!!!!!!!!!!!!!!!!!");
    console.log(`All tables created in ${region} region`);
    console.log(`at host: ${databaseUrl}`);
    console.log(`at: ${new Date()}`);
    console.log("!!!!!!!!!!!!!!!!!!!!");
  })
  .catch((error) => {
    console.log("!!!!!!!!!!!!!!!!!!!!");
    console.log(`Error while create Tables in ${region} region`);
    console.log(`at host: ${databaseUrl}`);
    console.log(`at: ${new Date()}`);
    console.log(error);
    console.log("!!!!!!!!!!!!!!!!!!!!");
  });
