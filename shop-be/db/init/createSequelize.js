const { Sequelize } = require('sequelize');

 function createSequelize (databaseUrl) {
    let sequelize;

    if (databaseUrl) {
      // Use AWS RDS for production
      sequelize = new Sequelize(databaseUrl, {
        dialect: 'postgres',
        logging: false,
      });
    } else {
      // Use SQLite for development
      console.log(`storage: ${process.env.HOME}/database.sqlite`)
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: `${process.env.HOME}/database.sqlite`,
        logging: false,
      });
    }

    return sequelize;
}

module.exports = createSequelize;