const { Sequelize } = require("sequelize");

function createSequelize(databaseUrl, isProduction) {
  let sequelize;

  console.log("Creating Sequelize...");
  !isProduction && console.log(`connection string: ${databaseUrl}`);

  const prodOption = isProd
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: false,
    ...prodOption,
  });

  console.log("Sequelize is created!");

  return sequelize.sync();
}

module.exports = createSequelize;
