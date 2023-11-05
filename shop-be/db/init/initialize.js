const createSequelize = require("./createSequelize");
const createTables = require("./tables/createTables");
const createFakeData = require("./tables/createFakeData");

const isProduction = process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL;
const fakeData = process.env.FAKE_DATA;

async function init() {
  console.log("Initializing database...");
  const sequelize = createSequelize(isProduction ? databaseUrl : null);

  console.log("Creating tables...");
  const tables = createTables(sequelize);

  try {
    await sequelize.sync({ force: true });
    console.log("Database and tables created!");
  } catch (error) {
    console.log("!!!!!!!!!");
    console.log("Failed to create database and tables:", error);
    console.log("!!!!!!!!!");
    return;
  }

  if (fakeData) {
    console.log("Faking data...");
    try {
      const result = await createFakeData(tables);
      console.log(`Fake is created: ${JSON.stringify(result, null, 2)}`)
      console.log("Faking is Done!");
    } catch (error) {
      console.log("!!!!!!!!!");
      console.log("Failed to fake data:", error);
      console.log("!!!!!!!!!");
      return;
    }
  }
}

init();
