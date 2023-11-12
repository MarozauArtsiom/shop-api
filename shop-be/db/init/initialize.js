require("dotenv").config();
const createSequelize = require("./createSequelize");
const createTables = require("./tables/createTables");
const createFakeData = require("./tables/createFakeData");

async function init() {
  const fakeData = process.env.FAKE_DATA;
  const isProd = process.env.NODE_ENV === "prod";
  const databaseUrl = process.env.CONNECTION_STRING;

  console.log("Initializing database...");
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);

  try {
    const sequelize = await createSequelize(databaseUrl, isProd);

    console.log('start to Creating tables...')

    const t = await sequelize.transaction(async (transaction) => {
      console.log("Creating tables...");
      const tables = createTables(sequelize, transaction);

      try {
        await sequelize.sync({ force: true });
        console.log("Database and tables created!");
      } catch (error) {
        console.log("!!!!!!!!!");
        console.log("Failed to create database and tables:", error);
        console.log("!!!!!!!!!");
        throw error;
      }

      if (fakeData) {
        console.log("Faking data...");
        try {
          const result = await createFakeData(tables, transaction);
          console.log(`Fake is created: ${JSON.stringify(result, null, 2)}`);
          console.log("Faking is Done!");
        } catch (error) {
          console.log("!!!!!!!!!");
          console.log("Failed to fake data:", error);
          console.log("!!!!!!!!!");
          throw error;
        }
      }
    });
  } catch (error) {
    console.log("!!!!!!!!!");
    console.log("Failed to initialize database:", error);
    console.log("!!!!!!!!!");
    throw error;
  }
}

init();
