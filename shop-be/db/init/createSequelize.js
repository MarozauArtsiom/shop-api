const { Sequelize } = require("sequelize");

function createSequelize(dbName, user, password, isProduction) {
  let sequelize;

  console.log('Creating Sequelize...')
  console.log(`dbName: ${dbName}`)
  console.log(`user: ${user}`)
  !isProduction && console.log(`password: ${password}`)

  sequelize = new Sequelize(dbName, user, password, {
    dialect: "postgres",
    logging: false,
  });

  console.log("Sequelize is created!");

  return sequelize.sync();
}

module.exports = createSequelize;
