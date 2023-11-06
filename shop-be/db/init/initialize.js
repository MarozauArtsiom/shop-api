require("dotenv").config();
const createSequelize = require("./createSequelize");
const createTables = require("./tables/createTables");
const createFakeData = require("./tables/createFakeData");

async function init() {
  const isProduction = process.env.NODE_ENV === "production";
  const databaseUrl = process.env.DATABASE_URL;
  const fakeData = process.env.FAKE_DATA;

  console.log("Initializing database...");
  console.log(
    `NODE_ENV:${process.env.NODE_ENV}`,
    `isProd: ${isProduction}`,
    `databaseUrl: ${databaseUrl}`
  );
  const sequelize = createSequelize(isProduction ? databaseUrl : null);

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
}

init();
